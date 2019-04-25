"use strict";
exports.__esModule = true;
function add(data, goalist) {
    goalist.config["debugger"].log('OVERVIEW');
    goalist.config["debugger"].log("Total: " + data.total + "\r");
    goalist.config["debugger"].log("Complete: " + data.complete + "\r");
    goalist.config["debugger"].log("Incomplete: " + data.incomplete + "\n");
    if (data.total && goalist.config["debugger"].getMode() !== 'silent') {
        goalist.config.utils.barHorizontal({
            'Complete': data.complete,
            'Incomplete': data.incomplete
        }, {
            labels: true
        });
    }
}
exports["default"] = add;
