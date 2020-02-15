#!/usr/bin/env node

const program = require('commander')
const jsonfile = require('jsonfile')
const { version } = require('../package.json')
const NuligaCrawler = require('../lib/Crawler')

function help () {
  /* eslint-disable no-console */
  console.log()
  console.log('Examples:')
  console.log('  $ nuliga results B2+S+2019 18')
  console.log('  $ nuliga results B2+S+2019 18 -s -f B2-S-2019_G18.json')
  console.log()
  /* eslint-enable no-console */
}

program
  .version(version)

program
  .on('--help', help)

program
  .command('results <championship> <group>')
  .description('Get match schedule and standings')
  .option('-s, --save', 'save match schedule and results to file')
  .option('-f, --file <file>', 'the name of the file to save to')
  .action(async function (championship, group, options) {
    const Crawler = new NuligaCrawler({
      baseUrl: process.env.BASE_URL || 'https://baden.liga.nu/cgi-bin/WebObjects/nuLigaTENDE.woa/wa/groupPage'
    })
    const data = await Crawler.getResults({ championship, group })

    if (options.save) {
      const file = options.file || `./${championship}_${group}.json`
      jsonfile.writeFile(file, data)
    } else {
      // eslint-disable-next-line no-console
      console.log(data)
    }
  })
  .on('--help', help)

program
  .parse(process.argv)
