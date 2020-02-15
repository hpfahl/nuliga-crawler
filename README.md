# nuliga-crawler
> Extracts championship results from https://baden.liga.nu and provides data as JSON

[![NPM Version](https://img.shields.io/npm/v/nuliga-crawler.svg)](https://www.npmjs.com/package/nuliga-crawler) [![NPM Downloads](https://img.shields.io/npm/dt/nuliga-crawler.svg)](https://www.npmjs.com/package/nuliga-crawler) [![GitHub license](https://img.shields.io/github/license/hpfahl/nuliga-crawler.svg)](https://github.com/hpfahl/nuliga-crawler/blob/master/LICENSE)

## Commands

nuliga-crawler provides a CLI with useful commands

### Setup

- Add `nuliga-crawler` as global dependency using yarn or npm

### List of commands

| Command | Description |
| --- | --- |
| `results <championship> <group>` | Get match schedule and standings |

You can use `--help` with any command to get detailed usage. Common arguments are:

`-s` or `--save`: Save match schedule and results to file

`-f <file>` or `--file <file>`: Name of the file to save to

### Usage

`$ nuliga results B2+S+2019 18`: Print result to console

`$ nuliga results B2+S+2019 18 -s -f B2-S-2019_G18.json`: Save result to file `B2-S-2019_G18.json`

## Use `nuliga-crawler` programmatically

### Setup

- Add `nuliga-crawler` dependency using yarn or npm to your project

### Usage

```javascript
const NuligaCrawler = require('nuliga-crawler')
const Crawler = new NuligaCrawler({ baseUrl: 'https://baden.liga.nu/cgi-bin/WebObjects/nuLigaTENDE.woa/wa/groupPage' })
const results = Crawler.getResults({ championship: 'B2+S+2019', group: '18'})
```

## Result format

```json
{
  "standings": [
    {
      "Rang": "1",
      "Mannschaft": "Team A",
      "Begegnungen": "6",
      "S": "6",
      "U": "0",
      "N": "0",
      "Matches": "44:10",
      "Sätze": "89:22",
      "Games": "563:250"
    },
    ...  
  ],
  "schedule": [
    {
      "Datum": "05.05.2019 09:30",
      "Heimmannschaft": "Team A",
      "Gastmannschaft": "Team B",
      "Matches": "9:0",
      "Sätze": "18:0",
      "Games": "108:18"
    },
    ...
  ]
}
```
  
## License

[MIT License](./LICENSE)

Copyright (c) Heiko Pfahl <hpfahl@gmail.com>
