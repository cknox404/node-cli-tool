import yargs from 'yargs';

export default function parseCliArgs(args){
    yargs.reset();
    var argv = require('yargs')
        .usage('Usage: $0 <command> [options]')
        .command('bump', 'Version bump a release')
        .example('$0 bump -t major', 'do a major bump to the current version')
        //.demand(['t'])
        .alias('t', 'type')
        .nargs('t', 1)
        .describe('t', 'Bump type')
        .alias('p', 'preid')
        .nargs('p', 1)
        .describe('p', 'Prerelease id')
        .help('h')
        .alias('h', 'help')
        .epilog('copyright 2015');
    return argv.parse(args);
}