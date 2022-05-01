import axios from "axios";
import pMap from "p-map";

export function run(token, keywords = [], qualifiers = {}) {
  const queries = Object.entries(qualifiers).map(([k, v]) => `${k}:${v}`);

  const client = axios.create({
    baseURL: "https://api.github.com",
    headers: {
      Accept: "application/vnd.github.v3.text-match+json",
      Authorization: `token ${token}`,
    },
  });

  const worker = (keyword) =>
    client
      .get("/search/code", { params: { q: [keyword, ...queries].join(" ") } })
      .then(({ data: { total_count } }) => ({ keyword, total_count }));

  return pMap(keywords, worker, { concurrency: 2 });
}
