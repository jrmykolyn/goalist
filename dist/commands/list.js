"use strict";
exports.__esModule = true;
var chalk = require('chalk');
function list(INPUT, ARGS, utils) {
    return new Promise(function (resolve, reject) {
        var log = ARGS.archive ? utils.getLog('archive') : utils.getLog('active');
        var goals = log.goals;
        var whitelistProps = ['id', 'title'];
        var supplementaryProps = !ARGS.all && ARGS.show ? ARGS.show.split(',').filter(function (prop) { return whitelistProps.indexOf(prop) === -1; }) : [];
        Object.keys(goals).forEach(function (key) {
            var goal = goals[key];
            if (ARGS.all) {
                supplementaryProps = Object.keys(goal).filter(function (prop) { return whitelistProps.indexOf(prop) === -1; });
            }
            whitelistProps.concat(supplementaryProps).forEach(function (prop) {
                if (goal.hasOwnProperty(prop)) {
                    console.log(chalk.gray(prop + ':') + " " + goal[prop]);
                }
            });
            console.log('\n');
        });
        resolve(log);
    });
}
exports["default"] = list;
