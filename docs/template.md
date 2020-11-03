![](https://img.shields.io/github/package-json/v/kaskadi/collmex-client)
![](https://img.shields.io/badge/code--style-standard-blue)
![](https://img.shields.io/github/license/kaskadi/collmex-client?color=blue)

**GitHub Actions workflows status**

[![Build workflow status](https://img.shields.io/github/workflow/status/kaskadi/collmex-client/build?label=build&logo=mocha)](https://github.com/kaskadi/collmex-client/actions?query=workflow%3Abuild)
[![Publish workflow status](https://img.shields.io/github/workflow/status/kaskadi/collmex-client/publish?label=publish&logo=npm)](https://github.com/kaskadi/collmex-client/actions?query=workflow%3Apublish)
[![Data sync workflow status](https://img.shields.io/github/workflow/status/kaskadi/collmex-client/sync-data?label=sync-data&logo=github-actions)](https://github.com/kaskadi/collmex-client/actions?query=workflow%3Async-data)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/collmex-client?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/collmex-client)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/collmex-client?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/collmex-client)
[![](https://img.shields.io/codeclimate/coverage/kaskadi/collmex-client?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/collmex-client)

****

# collmex-client

A Node client to communicate with Collmex API. This was inspired by our [`co-collmex` package](https://www.npmjs.com/package/co-collmex) but rewritten with modern Javascript (removing deprecated dependencies in the process).

**Note:** this package uses a GitHub Action `sync-data` (see [here](https://github.com/kaskadi/collmex-client/actions?query=workflow%3Async-data) and [there](./.github/workflows/sync-data.yml)) to scrap Collmex API documentation daily to check that the CSV mapping (stored [here](./data/satzarten.json)) used is still up to date. This mapping could have been stored into a public CDN and fetched on client instanciation (& then on daily basis for persistent clients) but that would slow down performances and introduce a potential failure point (CDN down -> no data). **Please make sure you always use the latest version of this package to ensure the answer you get from Collmex API is the correct one.**

{{>main}}

# Details

**Output formats <a name="output-formats"></a>**

| Value | Description |
| --- | --- |
| `object` | **default** turns the response into an array of objects with named properties according to the collmex api documentation. numeric values are converted to js notation (dezimal point). Dates are turned to js/mysql compatible dates.|
| `array` | turns the response into an array of arrays. useful for bulk inserts into mysql for example. numeric values are converted to js notation (dezimal point). Dates are turned to js/mysql compatible dates.|
| `raw` | the raw response (CSV with ";" as the seperator). no conversion is performed. |

**Notes**

- all outputs are automatically converted to utf-8
- posting data can be performed via the get method as well