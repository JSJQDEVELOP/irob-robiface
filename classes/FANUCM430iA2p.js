'use strict'

var {Robot} = require('./robot.js')

/**
 * @module  FANUCM430iA2p
 * @description This class provide an interface to  controller OF FANUC robot.
 * @extends robot
 * @author Nagy Péter
 * @version 1.0.0
 * @license MIT
 */

class FANUCM430iA2p extends Robot {

/**
* @description This function return datas of robot.
* @param  none
* @return {object}  response object represent process status
* and position datas
*/
  getPositionDatas () {
    var that = this
    var options = {
      host: this.settings.robot.host,
      path: this.settings.robot.uri.getPositionDatas.path,
      methode: this.settings.robot.uri.getPositionDatas.methode,
      port: this.settings.robot.uri.getPositionDatas.port
    }

    var deffered = this.q.defer()
    var httpReqParams = {options: options, data: {}}

    this.makeHttpRequest(httpReqParams).then(function (response) {
      if (response.res.status) {
        that.response.status = true
        that.response.data = that.response.data
        deffered.resolve({res: that.response})
      } else {
        that.msg('Error!')
      }
    })

    return deffered.promise
  }

/**
* @description This function start monitor process
* @param  none
* @return {response}  response object represent process status and position datas
*/
  startMonitor () {
    var that = this
    var options = {
      host: this.settings.robot.host,
      path: this.settings.robot.uri.startMonitor.path,
      methode: this.settings.robot.uri.startMonitor.methode,
      port: this.settings.robot.uri.startMonitor.port
    }

    var deffered = this.q.defer()
    var httpReqParams = {options: options, data: {}}
    this.makeHttpRequest(httpReqParams).then(function (response) {
      if (response.res.status) {
        that.response.status = true
        that.response.data = that.response.data
        deffered.resolve({res: that.response})
      } else {
        that.msg('Error!')
      }
    })

    return deffered.promise
  }

/**
* @description This function returns to the array of available programs
* @param  none
* @return {response}  response object represent process status and available programs
*/
  getPrograms () {
    var that = this
    var options = {
      host: this.settings.robot.host,
      path: this.settings.robot.uri.getPrograms.path,
      methode: this.settings.robot.uri.getPrograms.methode,
      port: this.settings.robot.uri.getPrograms.port
    }

    var deffered = this.q.defer()
    var httpReqParams = {options: options, data: {}}
    this.makeHttpRequest(httpReqParams).then(function (response) {
      var programs = response.res.data.progs
      var notRelevant = '######'
      programs = programs.map(function (element) {
        var _element = element.trim()
        if (_element.indexOf('TP') != -1) {
          return _element.substring(0, _element.indexOf('TP')).trim()
        } else {
          return notRelevant
        }
      })

      programs = programs.filter(function (value) {
        return value != notRelevant
      })

      that.response.status = true
      that.response.data = JSON.stringify(programs)
      that.msg(that.response)
      that.msg('Programs:')
      programs.forEach(function (element) {
        console.log('-', element)
      })

      deffered.resolve({res: that.response})
    })

    return deffered.promise
  }

/**
* @description This function starts the selected program
* @param  {string} program program name
* @return none
*/
  runProgram (program) {
    var that = this
    this.getPrograms().then(function (response) {
      var programs = JSON.parse(response.res.data)

      if (programs.indexOf(program) === -1) {
        that.msg('No such program!')
      } else {
        that.getPositionDatas().then(function (response) {
          if (response.res.data.status[0] != 1) {

            var param = ''
            var options = {
              host: that.settings.robot.host,
              path: that.settings.robot.uri.runProgram.path + param,
              methode: that.settings.robot.uri.runProgram.methode,
              port: that.settings.robot.uri.runProgram.port
            }

            var httpReqParams = {options: options, data: {str_task: program}}

            that.makeHttpRequest(httpReqParams).then(function (response) {
              if (response.res.status) {
                that.msg(program + ' program is running.')
              } else {
                that.msg('Error ' + program + ' program is not running!')
              }
            })
          } else {
            if (response.res.data.status[0] == 1) {
              that.msg('Error ' + program + ' program already running!')
            }
          }
        })
      }
    })
  }

/**
* @description This function reset robot controller.
* @param  none
* @return {response}  response object represent process status
*/
  resetController () {
    var that = this
    var param = ''
    var options = {
      host: this.settings.robot.host,
      path: this.settings.robot.uri.resetController.path + param,
      methode: this.settings.robot.uri.resetController.methode,
      port: this.settings.robot.uri.resetController.port
    }

    var deffered = this.q.defer()
    var httpReqParams = {options: options, data: {}}
    this.makeHttpRequest(httpReqParams).then(function (response) {
      if (response.res.status) {
        that.response.status = true
        that.response.data = that.response.data
        deffered.resolve({res: that.response})
      } else {
        that.msg('Error!')
      }
    })
    return deffered.promise
  }

/**
* @description This function abort running process.
* @param  none
* @return {response}  response object represent process status
*/
  abortProcess () {
    var that = this
    var param = ''
    var options = {
      host: this.settings.robot.host,
      path: this.settings.robot.uri.abortProcess.path + param,
      methode: this.settings.robot.uri.abortProcess.methode,
      port: this.settings.robot.uri.abortProcess.port
    }

    var deffered = this.q.defer()
    var httpReqParams = {options: options, data: {}}
    this.makeHttpRequest(httpReqParams).then(function (response) {
      if (response.res.status) {
        that.response.status = true
        that.response.data = that.response.data
        deffered.resolve({res: that.response})
      } else {
        that.msg('Error!')
      }
    })

    return deffered.promise
  }

/**
* @description This function stop motion of robot.
* @param  none
* @return {response}  response object represent process status
*/
  stopMotion () {
    var that = this
    var param = ''
    var options = {
      host: this.settings.robot.host,
      path: this.settings.robot.uri.stopMotion.path + param,
      methode: this.settings.robot.uri.stopMotion.methode,
      port: this.settings.robot.uri.stopMotion.port
    }

    var deffered = this.q.defer()
    var httpReqParams = {options: options, data: {}}
    this.makeHttpRequest(httpReqParams).then(function (response) {
      if (response.res.status) {
        that.response.status = true
        that.response.data = that.response.data
        deffered.resolve({res: that.response})
      } else {
        that.msg('Error!')
      }
    })

    return deffered.promise
  }

/**
* @description This function moves a robot to a predefined position.
* @param  none
* @return {response}  response object represent process status
*/
  moveTo (params) {
    var that = this
    var motionData = {
      str_mtn_mod: 1,
      str_coord1: 45,
      str_coord3: 90,
      str_coord5: -90,
      str_coord6: -90
    }
    if (!(Object.keys(params).length === 0 && params.constructor === Object)) {
      motionData = Object.assign(motionData, params)
    }

    var setMotionData = Object.assign(this.settings.robot.motion_data, motionData)
    var param = ''
    var options = {
      host: this.settings.robot.host,
      path: this.settings.robot.uri.moveTo.path + param,
      methode: this.settings.robot.uri.moveTo.methode,
      por: this.settings.robot.uri.moveTo.methode
    }

    var deffered = this.q.defer()
    var httpReqParams = {options: options, data: setMotionData}
    this.makeHttpRequest(httpReqParams).then(function (response) {
      if (response.res.status) {
        that.response.status = true
        that.response.data = that.response.data
        deffered.resolve({res: that.response})
      } else {
        that.msg('Error!')
      }
    })

    return deffered.promise
  }
}

module.exports.FANUCM430iA2p = FANUCM430iA2p
module.exports.createController = function (robotParams) {
  return new FANUCM430iA2p(robotParams)
}
