# node-ghkw

Counting keyword frequencies in GitHub.

```console
$ ghkw sunday monday tuesday wednesday thursday friday saturday
|  Rank | Keyword   |      Count |
| ----: | :-------- | ---------: |
|     1 | monday    | 24,973,185 |
|     2 | sunday    | 21,426,813 |
|     3 | friday    | 19,223,547 |
|     4 | saturday  | 18,726,437 |
|     5 | thursday  | 17,790,156 |
|     6 | tuesday   | 17,557,191 |
|     7 | wednesday | 17,246,434 |
```

This tool is greatly inspired by [kyoshidajp/ghkw](https://github.com/kyoshidajp/ghkw).

## Installation

```console
$ npm install -g node-ghkw
```

Get your personal access token: https://github.com/settings/tokens/new?scopes=repo

And then, set to environment variable `GITHUB_TOKEN` or option `--token`.

## Usage

```console
$ ghkw -h

  Usage: ghkw [options] [keyword ...]


  Options:

    -V, --version                  output the version number
    -t, --token [token]            access token for GitHub API
    -i, --in [field]               scope the search fields
    -l, --language [language]      search by language
    -F, --fork [fork]              search in forks
    -s, --size [n]                 search by the source code file size
    -p, --path [path]              search by the location of a file within the repository
    -f, --filename [filename]      search by filename
    -e, --extension [extension]    search by the file extension
    -u, --user [user]              search by user
    -o, --org [orgname]            search by organization
    -r, --repository [repository]  search by repository
    -h, --help                     output usage information
```

## License

Licensed under the MIT License.
