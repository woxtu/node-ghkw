const axios = require('axios')
const pmap = require('p-map')

module.exports = (token, keywords = []) => {
  const client = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
      'Accept': 'application/vnd.github.v3.text-match+json',
      'Authorization': `token ${token}`,
    },
  })

  const worker = (keyword) =>
    client.get('/search/code', { params: { q: keyword } })
    .then(({ data: { total_count } }) => ({ keyword, total_count }))

  return pmap(keywords, worker, { concurrency: 2 })
}
