"use strict";
exports.__esModule = true;
var chalk = require('chalk');
function list(INPUT, ARGS, config) {
    return new Promise(function (resolve, reject) {
        var CATEGORY = ARGS.category ? ARGS.category.toLowerCase() : null;
        var TAGS = ARGS.tags ? ARGS.tags.split(',').map(function (str) { return str.trim().toLowerCase(); }) : [];
        var log = ARGS.archive ? config.utils.getLog('archive') : config.utils.getLog('active');
        var goals = log.goals;
        var whitelistProps = ['id', 'title'];
        var supplementaryProps = !ARGS.all && ARGS.show ? ARGS.show.split(',').filter(function (prop) { return whitelistProps.indexOf(prop) === -1; }) : [];
        var allGoals = Object.keys(goals).map(function (key) { return goals[key]; });
        var filteredGoals = (ARGS.category || TAGS.length)
            ? allGoals.filter(function (_a) {
                var category = _a.category, tags = _a.tags;
                var sanitizedTags = tags && tags.length ? tags.map(function (tag) { return tag.toLowerCase(); }) : [];
                return ((!!category && category.toLowerCase().includes(CATEGORY))
                    || (!!sanitizedTags.length && sanitizedTags.some(function (tag) { return TAGS.includes(tag); })));
            })
            : allGoals;
        filteredGoals.forEach(function (goal) {
            if (ARGS.all) {
                supplementaryProps = Object.keys(goal).filter(function (prop) { return whitelistProps.indexOf(prop) === -1; });
            }
            whitelistProps.concat(supplementaryProps).forEach(function (prop) {
                if (goal.hasOwnProperty(prop)) {
                    config["debugger"].log(chalk.gray(prop + ':') + " " + goal[prop]);
                }
            });
            config["debugger"].log('\n');
        });
        resolve(log);
    });
}
exports["default"] = list;
