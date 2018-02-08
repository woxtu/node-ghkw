#!/usr/bin/env node

const program = require('commander')
const tablemark = require('tablemark')
const run = require('../lib/')
;
(async () => {
  program
    .usage('[options] [keyword...]')
    .version(require('../package.json').version)
    .option('-t, --token [token]', 'access token for GitHub API')
    .parse(process.argv)

  const token = process.env.GITHUB_TOKEN || program.token
  const keywords = program.args

  try {
    let results = await run(token, keywords)
    results.sort((a, b) => a.total_count < b.total_count)
    results = results.map((item, n) => ({ rank: n + 1, ...item }))

    console.log(tablemark(results, {
      columns: [
        { name: 'Rank', align: 'right' },
        { name: 'Keyword', align: 'left' },
        { name: 'Count', align: 'right' },
      ],
      stringify (value) {
        return (typeof value === 'number')
          ? value.toString().replace( /(\d)(?=(\d{3})+(?!\d))/g, '$1,')
          : value
      },
    }))
  } catch (e) {
    console.error(e)
  }
})()
