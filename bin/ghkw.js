#!/usr/bin/env node

const program = require('commander')
const tablemark = require('tablemark')
const run = require('../lib/')
require('../utils/object-extension')
;
(async () => {
  program
    .usage('[options] [keyword ...]')
    .version(require('../package.json').version)
    .option('-t, --token [token]', 'access token for GitHub API')
    .option('-i, --in [field]', 'scope the search fields')
    .option('-l, --language [language]', 'search by language')
    .option('-F, --fork [fork]', 'search in forks')
    .option('-s, --size [n]', 'search by the source code file size')
    .option('-p, --path [path]', 'search by the location of a file within the repository')
    .option('-f, --filename [filename]', 'search by filename')
    .option('-e, --extension [extension]', 'search by the file extension')
    .option('-u, --user [user]', 'search by user')
    .option('-o, --org [orgname]', 'search by organization')
    .option('-r, --repository [repository]', 'search by repository')
    .parse(process.argv)

  if (!program.args.length) {
    program.help()
  }

  const token = process.env.GITHUB_TOKEN || program.token
  const keywords = program.args
  const qualifiers = program
    .pick('in', 'language', 'fork', 'size', 'path', 'filename', 'extension', 'user', 'org', 'repository')
    .pickBy((_k, v) => v)

  try {
    let results = await run(token, keywords, qualifiers)
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
