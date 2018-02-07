#!/usr/bin/env node

const program = require('commander')
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

  console.log(await run(token, keywords))
})()
