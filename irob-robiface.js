/**
 * @module  irob-robiface
 * @author Nagy Péter
 * @version 1.0.0
 * @license MIT
 */
var program = require('commander')
const Robot = require('./classes/robot.js').Robot

var robotParams = {
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
}

var FANUCM430iA2p = require(__dirname + '/classes/FANUCM430iA2p.js').createController(robotParams)
program
.version('1.0.0')
.arguments('<cmd> [env]')
.usage('[options] <files>')
.option('-m, --request_methode <methode>', 'set methode type of httprequest', 'POST')
.option('-c, --configPath <path>', 'set config path default to ...', '.')
.option('-d, --configDetails [object]', 'set details of robot ...', robotParams)
.option('-i, --ip <ip_addrs>', 'set IP of controlled robot defaults 127.0.0.1', '127.0.0.1')

/**
* @description The result of this command : list of executable programs
* @return list of executable programs
*/
program.command('getPrograms')
.description('Executable programs.')
.action(function (param) {
  FANUCM430iA2p.getPrograms()
})

/**
* @description  This command start monitor process
*/
program.command('startMonitor')
.description('This command start monitor process..)')
.action(function (param) {
  FANUCM430iA2p.startMonitor(param).then(function (response) {
    console.log(response)
  })
})

/**
* @description  This commnad starts the selected program
* @param {string} param  program name
*/
program.command('runProgram')
.description('Run a program.  (default:webmotion)')
.action(function (param) {
  console.log(param);
  if (typeof param === 'object' || !param || param === '') {
    FANUCM430iA2p.msg('No such program!')
  } else {
    FANUCM430iA2p.runProgram(param.toUpperCase())
  }
})

/**
* @description  This commnad Reset controller
*/
program.command('resetController')
.description('Reset controller.')
.action(function () {
  FANUCM430iA2p.resetController().then(function (response) {
    console.log(response)
  })
})

/**
* @description  This commnad Abort process!
*/
program.command('abortProcess')
.description('Abort process!.')
.action(function () {
  FANUCM430iA2p.abortProcess().then(function (response) {
    console.log(response)
  })
})

/**
* @description  The result of this command : It\'s returns pos. datas of robot.
*/
program
  .command('getPositionDatas')
  .description('It\'s returns pos. datas of robot.')
  .action(function (param) {
    if (param === 'show') {
      FANUCM430iA2p.getPositionDatas().then(function (response) {
        FANUCM430iA2p.msg('Datas:\n' + JSON.stringify(response.res.data))
      })
    } else {
      FANUCM430iA2p.getPositionDatas().then(function (response) {
      })
    }
  })

/**
* @description  This command returns general informatin of robot.Forexample:type,description,uri
* @param {string} dataType
*/
program
  .command('getRobotDetails')
  .description('It\'s returns general informatin of robot.Forexample:type,description,uri')
  .action(function (dataType) {
    console.log('-------------------------------------------------------------')
    console.log('The %j of robot:%j', dataType, FANUCM430iA2p.getRobotDetails(dataType))
    console.log('-------------------------------------------------------------')
  })

/**
* @description  This command  moves the robot to a predefined position
* @param {string} param position datas
*/
program.command('moveTo')
.description('Move to predefined pose')
.action(function (param) {
  FANUCM430iA2p.moveTo(param)
})
// .on('--help', () => { console.log('') })

/**
* @description  This command stop motion
* @param {string} dataType
*/
program.command('stopMotion')
.description('Stop Motion')
.action(function (param) {
  FANUCM430iA2p.stopMotion(param)
})

program.parse(process.argv)
