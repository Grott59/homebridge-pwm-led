# homebridge-pwm-led
Homebridge plugin for controlling LEDs or LED-strips over homekit.
# Why?
From my research on npm and GitHub about homebridge led controllers I couldn't find any single one simply converting the homekit interface to PWM signals.
# Reference
It uses:
* [homebridge](https://www.npmjs.com/package/homebridge) ([GitHub-link](https://github.com/nfarina/homebridge)) for the homekit interface
* [pigpio](https://www.npmjs.com/package/pigpio) ([GitHub-link](https://github.com/fivdi/pigpio)) js interface for PWM signaling
* [colorsys](https://www.npmjs.com/package/colorsys) to convert between hsv and rgb colourspace
* [David Ordnung](http://dordnung.de/raspberrypi-ledstrip/) has covered all the hardware side (there's an english translation on his site)

I was heavily inspired by [homebridge-fake-rgb](https://www.npmjs.com/package/homebridge-fake-rgb) for the code structure.
# Installation
## Prerequisites
Please refer to the npm or GitHub pages for things to do in advance (e.g. install pigpio daemon).
Maybe set up [pigpio] beforehand.
## Installation
Install as you would any other npm package(not set up yet)
## Config
In the config change the pins to your corresponding ones.
# Logging
There is some basic printing to the homebridge log from any function.
This just prints the most important values changed in the function.
# To-Do
* add working npm link 
