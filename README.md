# irob-robiface

## Overview
Simple command line tool (software) to control FANUC six degree of freedom robotic arms.

![Image of fanuc-webcontrol](preview.png)

**NOTE**: It is an experimental software. Do not use this in production systems!

THE SOFTWARE IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL, BUT WITHOUT ANY WARRANTY. IT IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE SOFTWARE IS WITH YOU. SHOULD THE SOFTWARE PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION.

## TOC
1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Example usage](#example-usage)
5. [Notes](#notes)
6. [Acknowledgement](#acknowledgement)
7. [Bugs, feature requests, etc](#bugs-feature-requests-etc)

## Requirements
This is written in Javascript (ECMAScript 2017 (ECMA-262)) and based on Node.js®, therefore important if you want to use it, you should have node and npm, and you should know what it is.

Furthermore, since this application is based on ABC-iRobotics/fanuc-webcontrol and uses some of its scripts.

Necessary to look at the description :
[ABC-iRobotics/fanuc-webcontrol](https://github.com/shouldjs/examples).



## Installation

## Configuration

## Example usage
Run the WEBMOTION tp program on the controller or open a browser and type: http://robotIP/md/webpanel.htm and click on the `Start` button (`Reset` may be needed)
- SET: 
  * Set the axis limits. The default values are 0, thus you have to change these to make possible any movement.
  * Move the TCP to a predefined position (Click on a button, and wait until the robot completes the movement.) **Important: SEE NOTE NO.2**
- JOG: Jogging the robot (Push and hold down a button, but only use just one at the same time!)
- CART: Move the TCP +/-xyz direction and/or rotate it in the currently selected tool coordinate system. (Push and hold down a button, but only use just one at the same time!)
- Webjoystick: http://robotIP/md/webjoystick.htm
- Webtouchpad: http://robotIP/md/webtouchpad.htm

## Notes

## API

## Acknowledgement

## Bugs, feature requests, etc
Please use the [GitHub issue tracker][].

[GitHub issue tracker]: https://github.com/ABC-iRobotics/fanuc-webcontrol/issues

## License

MIT. See LICENSE for details.