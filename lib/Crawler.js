const translateVector = require('lodash.zip')
const fetch = require('./utils/fetch')
const extractTable = require('./utils/extractTable')

class NuligaCrawler {
  constructor (options) {
    this.baseUrl = options.baseUrl
  }

  getTableDataByPrecedingTitle ({ title, html }) {
    const table = extractTable({
      selector: `h2:contains("${title}") + table.result-set`,
      html
    })
    return table
  }

  getStandings ({ html }) {
    let data = this.getTableDataByPrecedingTitle({ title: 'Tabelle', html }) // get array of table columns
    data.shift() // first column has no values -> remove
    data = translateVector(...data) // get array of table rows instead of table columns

    const labels = data.shift() // 1st row contains column labels

    const standings = data.map((row) => {
      const teamResult = {}
      for (let i = 0; i < labels.length; i++) {
        teamResult[`${labels[i]}`] = row[i] // array of values to object { label: value }
      }
      return teamResult
    })

    return standings
  }

  getSchedule ({ html }) {
    let data = this.getTableDataByPrecedingTitle({ title: 'Spielplan', html })
    data.shift() // first column contains day of week -> remove
    data.splice(1, 1) // 3rd column has no values -> remove
    data.pop() // last column has no values -> remove
    data = translateVector(...data) // get array of table rows instead of table columns

    const labels = data.shift() // 1st row contains column labels
    labels[0] = 'Datum'

    let lastDateValue
    const schedule = data.map((row) => {
      const match = {}

      const currentDateValue = row[0] !== '' ? row[0] : lastDateValue
      row[0] = currentDateValue

      for (let i = 0; i < labels.length; i++) {
        match[`${labels[i]}`] = row[i] // array of values to object { label: value }
      }

      lastDateValue = currentDateValue

      return match
    })

    return schedule
  }

  async getResults ({ championship, group }) {
    try {
      const start = Date.now()

      const url = `${this.baseUrl}?championship=${championship}&group=${group}`
      const html = await fetch({ url })

      const standings = this.getStandings({ html })
      const schedule = this.getSchedule({ html })

      // eslint-disable-next-line no-console
      console.log(`Crawler finished in ${(Date.now() - start) / 1000}s`)

      return {
        standings,
        schedule
      }
    } catch (e) {
      throw new Error(`Crawler failed with errors: \n${e.message}`)
    }
  }
}

module.exports = NuligaCrawler
