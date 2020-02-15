jest.setTimeout(60000)

const NuligaCrawler = require('../lib/Crawler')

const options = {
  baseUrl: 'https://baden.liga.nu/cgi-bin/WebObjects/nuLigaTENDE.woa/wa/groupPage'
}

const Crawler = new NuligaCrawler(options)

describe('getResults function', () => {
  test('getResults should return standings and schedule for championship group', async () => {
    const championshipGroup = { championship: 'B2+S+2019', group: '18' }
    const result = await Crawler.getResults(championshipGroup)

    expect(result).toBeDefined()
    expect(result.standings).toBeDefined()
    expect(result.schedule).toBeDefined()
  })
})
