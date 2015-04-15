import {bump} from "./version-bump.js";

var argv = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .command('bump', 'Version bump a release')
    .example('$0 bump -t major', 'do a major bump to the current version')
    .demand(['t'])
    .alias('t', 'type')
    .nargs('t', 1)
    .describe('t', 'Bump type')
    .alias('p', 'preid')
    .nargs('p', 1)
    .describe('p', 'Prerelease id')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2015')
    .argv;

import json from "../package.json";
var newVersion = bump(json.version, argv.type, argv.preid);
json.version = newVersion;
console.log(json.version);

var fsp = require('fs-promise'),
    path = require('path');

fsp.writeFile('package.json', JSON.stringify(json, null, 2))
  .then(function(){
    //return fsp.readFile(file, {encoding:'utf8'});
  })

var exec = require('child-process-promise').exec;
 
exec('git add .')
    .then(function (result) {
        var stdout = result.stdout;
        var stderr = result.stderr;
        console.log('stdout: ', stdout);
        console.log('stderr: ', stderr);
        exec('git commit -m "Release v'+newVersion+'"')
            .then(function (result) {
                var stdout = result.stdout;
                var stderr = result.stderr;
                console.log('stdout: ', stdout);
                console.log('stderr: ', stderr);
                exec('git tag -a v'+newVersion)
                    .then(function (result) {
                        var stdout = result.stdout;
                        var stderr = result.stderr;
                        console.log('stdout: ', stdout);
                        console.log('stderr: ', stderr);
                        exec('git push --tags')
                            .then(function (result) {
                                var stdout = result.stdout;
                                var stderr = result.stderr;
                                console.log('stdout: ', stdout);
                                console.log('stderr: ', stderr);
                            })
                            .fail(function (err) {
                                console.error('ERROR: ', err);
                            })
                    })
                    .fail(function (err) {
                        console.error('ERROR: ', err);
                    })
            })
            .fail(function (err) {
                console.error('ERROR: ', err);
            })
    })
    .fail(function (err) {
        console.error('ERROR: ', err);
    })

