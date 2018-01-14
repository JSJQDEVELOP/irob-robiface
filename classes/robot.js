'use strict'
/**
 * @module  Robot
 * @description This class provide an interface to robot controller.
 * @extends robot
 * @author Nagy Péter
 * @version 1.0.0
 * @license MIT
 */

const http = require('http')
const rest = require('rest')
const q = require('q')
const querystring = require('querystring')
const url = require('url')

class Robot {
  constructor (params) {
    this.settings = Object.assign({

      robot: {
        type: 'FANUCM430iA2p',
        host: '192.168.1.101',
        description: 'THIS IS AN INDUSTRIAL ROBOT.',
        motion_data: {
          str_mtn_mod: 0,
          str_coord1: 0,
          str_coord2: 0,
          str_coord3: 0,
          str_coord4: 0,
          str_coord5: 0,
          str_coord6: 0
        },
        uri: {
          moveTo: {path: '/KAREL/webcontrol', methode: 'GET', port: '80', description: ''},
          // moveTo:{path:'/KAREL/webcontrol?str_mtn_mod=1&str_coord1=90&str_coord2=0&str_coord3=90&str_coord4=0&str_coord5=-90&str_coord6=-90',methode:'GET',port:'80',description:''}
          getPositionDatas: {path: '/KAREL/webmonitor', methode: 'GET', port: '80', description: ''},
          getRobotDetails: {path: '', methode: '', port: '', description: ''},
          getPrograms: {path: '/KAREL/webprogram', methode: 'GET', port: '80', description: ''},
          runProgram: {path: '/KAREL/webstart', methode: 'GET', port: '80', description: ''},
          resetController: {path: '/KAREL/webreset', methode: 'GET', port: '80', description: ''},
          abortProcess: {path: '/KAREL/webabort', methode: 'GET', port: '80', description: ''},
          startMonitor: {path: '/KAREL/webmonitor', methode: 'GET', port: '80', description: ''},
          stopMotion: {path: '/KAREL/webstop', methode: 'GET', port: '80', description: ''}
        }
      }
    }, params)

    this.response = {status: false, data: {}}

    this.http = http
    this.rest = rest
    this.q = q
    this.url = url
    this.querystring = querystring
  }

/**
* @description This function set modul params
* @param  {object} params params of modul
* @return none
*/
  setSettings (params) {
    this.settings = Object.assign(this.settings, params)
  }

/**
* @description This function write messages.
* @param  {string} message  messges of process
* @return none
*/
  msg (message) {
    console.log('---------------------------------------------------------------')
    console.log(message)
    console.log('---------------------------------------------------------------')
  }

/**
* @description This function based on http modul(default node modul)
* this methode make all http request.
* options,data
* @param  {string} message  messges of process
* @return none
*/
  makeHttpRequest (params) {
    var that = this
    var reqData = ''
    reqData = this.querystring.stringify(Object.assign({}, params.data))
    var options = Object.assign({
      host: '127.0.0.1',
      path: '/',
      methode: 'GET',
      port: '80'
    }, params.options)

    if (options.methode === 'GET') {
      if (!(Object.keys(params.data).length === 0 && params.data.constructor === Object)) {
        options.path = options.path + '?' + reqData
      } else {
        options.path = options.path
      }
    } else {
      options = Object.assign(options, {
        headers: {
          'Content-Type': 'Access-Control-Request-Method',
          'Content-Length': Buffer.byteLength(reqData)
        }
      })
    }

    this.msg('Send httpRequest to:' + options.host + options.path + '\nReq. data(s):' + ((reqData !== '') ? reqData : '-'))

    var deffered = this.q.defer()
    var req = this.http.request(options, (res) => {
      var responseBody = ''
      if ((res.statusCode === '204' && (['PUT', 'POST', 'GET'].indexOf(options.methode) !== -1))) {
        that.msg('Successfull!')
        that.msg(`STATUS: ${res.statusCode}`)
        that.msg(`HEADERS: ${JSON.stringify(res.headers)}`)
        that.response.status = true
        that.response.data = {}
        deffered.resolve({res: that.response})
      } else {
        res.on('data', (chunk) => {
          responseBody += chunk
        })

        res.on('end', () => {
          that.msg('Successfull!')
          that.msg(`STATUS: ${res.statusCode}`)
          that.msg(`HEADERS: ${JSON.stringify(res.headers)}`)

          res.setEncoding('utf8')

          try {
            that.response.status = true
            that.response.data = JSON.parse(responseBody)
          } catch (e) {
            that.response.status = true
            that.response.data = responseBody
          } finally {
            deffered.resolve({res: that.response})
          }
        })
      }
    })

    req.on('error', (e) => {
      that.msg(`Problem with request: ${e.message}`)
      that.response.status = false
      that.response.data = e
      deffered.resolve({res: e})
    })

// write data to request body if POST
    if (options.methode === 'POST') {
      req.write(reqData)
    }
    req.end()
    return deffered.promise
  }

/**
* @description This function returns selected detail of robot
* @param  {string} getDetail  detail of robot
* @return {object}  response object represent process status
* and robot detail
*/

  getRobotDetails (getDetail) {
    var that = this
    var robotDetails = this.settings.robot
    var details = Object.keys(robotDetails)

    if (!robotDetails.hasOwnProperty(getDetail)) {
      this.response.status = false
      this.response.data = 'Not exists!'
    } else {
      details.forEach(function (detail) {
        if (detail === getDetail) {
          switch (detail) {
            case 'type':
              that.response.data = robotDetails[detail]
              break
            case 'description':
              that.response.data = robotDetails[detail]
              break
            case 'uri':
              that.response.data = robotDetails[detail]
              break
            default:
              break
          }
        }
      })
      this.response.status = true
    }
    return that.response
  }
}

exports.Robot = Robot
