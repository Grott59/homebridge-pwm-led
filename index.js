var colorsys = require('colorsys');
var Gpio = require('pigpio').Gpio;
var Service, Characteristic;

module.exports = function (homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	homebridge.registerAccessory("homebridge-RGB-strip", "rgbStrip", LedAccessory);
};

function LedAccessory(log, config) {
	this.log = log;
	this.config = config;
	this.name = config.name;
	this.power = 0;
	this.brightness = 100;
	this.saturation = 0;
	this.hue = 0;

	this.pinRed = new Gpio(config.pinr, { mode: Gpio.OUTPUT });
	this.pinGreen = new Gpio(config.ping, { mode: Gpio.OUTPUT });
	this.pinBlue = new Gpio(config.pinb, { mode: Gpio.OUTPUT });

	this.gamma = 2.8;

	this.log("Initialized '" + this.name + "'");
}

LedAccessory.prototype.setColor = function () {
	var color = colorsys.hsv_to_rgb({
		h: this.hue,
		s: this.saturation,
		v: this.brightness
	});

	if (!this.power) {
		color.r = 0;
		color.g = 0;
		color.b = 0;
	}

	this.pinRed.pwmWrite(Math.trunc(Math.pow(color.r / 255, this.gamma) * 255 + 0.5));
	this.pinGreen.pwmWrite(Math.trunc(Math.pow(color.g / 255, this.gamma) * 255 + 0.5));
	this.pinBlue.pwmWrite(Math.trunc(Math.pow(color.b / 255, this.gamma) * 255 + 0.5));

	this.log("set color to", color.r, color.g, color.b);
};

LedAccessory.prototype.getServices = function () {
	var lightbulbService = new Service.Lightbulb(this.name);
	var bulb = this;

	lightbulbService
		.getCharacteristic(Characteristic.On)
		.on('get', function (callback) {
			callback(null, bulb.power);
		})
		.on('set', function (value, callback) {
			bulb.power = value;
			bulb.log("power to " + value);
			bulb.setColor();
			callback();
		});

	lightbulbService
		.addCharacteristic(Characteristic.Brightness)
		.on('get', function (callback) {
			callback(null, bulb.brightness);
		})
		.on('set', function (value, callback) {
			bulb.brightness = value;
			bulb.log("brightness to " + value);
			bulb.setColor();
			callback();
		});

	lightbulbService
		.addCharacteristic(Characteristic.Hue)
		.on('get', function (callback) {
			callback(null, bulb.hue);
		})
		.on('set', function (value, callback) {
			bulb.hue = value;
			bulb.log("hue to " + value);
			bulb.setColor();
			callback();
		});

	lightbulbService
		.addCharacteristic(Characteristic.Saturation)
		.on('get', function (callback) {
			callback(null, bulb.saturation);
		})
		.on('set', function (value, callback) {
			bulb.saturation = value;
			bulb.log("saturation to " + value);
			bulb.setColor();
			callback();
		});

	return [lightbulbService];
};