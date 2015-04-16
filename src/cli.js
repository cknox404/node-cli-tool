import {bump} from "./version-bump.js";
import json from "../package.json";
import fsp from 'fs-promise';
import path from 'path';
import {exec} from 'child-process-promise';
import parseCliArgs from './cli-yargs.js';

export default function updateJson(args){
    var argv = parseCliArgs(args);
    var newVersion = bump(json.version, argv.t, argv.p);
    json.version = newVersion;
    
    return fsp.writeFile('package.json', JSON.stringify(json, null, 2))
        .then(() => exec('echo git add package.json'))
        .then(() => exec(`echo git commit -m "Release v${newVersion}"`))
        .then(() => exec(`echo git tag Releasev${newVersion}`))
        .then(() => exec('echo git push --tags'))
        .then(() => exec('echo npm publish'))
        .catch(err => {
            console.log(`Failed: ${err}`)
        });
}

if(process.argv.size > 2)
    updateJson(process.argv);