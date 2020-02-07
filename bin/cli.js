#!/usr/bin/env node

const program = require('commander')
const jsonfile = require('jsonfile')
const crawler = require('../lib/crawler')

function help() {
  console.log();
  console.log('Examples:');
  console.log('  $ nuliga results B2+S+2019 18');
  console.log('  $ nuliga results B2+S+2019 18 -f B2-S-2019_G18.json');
  console.log();
}

program
  .version('0.0.1')

program
  .on('--help', help)

program
  .command('results <championship> <group>')
  .description('get match schedule and standings')
  .option('-s, --save', 'save match schedule and results to file')
  .option('-f, --file <file>', 'the name of the file to save to')
  .action(async function (championship, group, options) {
    const data = await crawler({ championship, group })

    if (options.save) {
      const file = options.file || `./${championship}_${group}.json`
      jsonfile.writeFile(file, data)
    } else {
      console.log(data)
    }
  })
  .on('--help', help)

program
  .parse(process.argv)
