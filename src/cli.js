//console.log('Hello World');
//console.log(getHello(process.argv[2]));
//function getHello(name){
//    return ('Hello '+name);
//}
//export {getHello};

//random tests
//import semver from "semver";
import {bump} from "./version-bump.js";
//var q = bump("0.0.0", "prerelease")
//console.log(q);
//var w = bump(q, "prerelease", "delta")
//console.log(w);
//console.log(semver.gt(w, q));

var argv = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .command('bump', 'Version bump a release')
    .example('$0 bump -v 0.0.0 -t major', 'do a major bump to the given version')
    .demand(['v','t'])
    .alias('v', 'version')
    .nargs('v', 1)
    .describe('v', 'Version number')
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
json.version = bump(json.version, argv.type, argv.preid);
console.log(json.version);

var fsp = require('fs-promise'),
    path = require('path');

fsp.writeFile('package.json', JSON.stringify(json, null, 2))
  .then(function(){
    //return fsp.readFile(file, {encoding:'utf8'});
  })

function file(){
  var args = [].slice.call(arguments);
  args.unshift('bin');
    console.log(path.join.apply(path, args));
  return path.join.apply(path, args);
}
