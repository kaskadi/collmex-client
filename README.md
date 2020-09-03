[![Build workflow status](https://img.shields.io/github/workflow/status/kaskadi/collmex-client/build?label=build&logo=mocha)](https://github.com/kaskadi/collmex-client/actions?query=workflow%3Abuild)
[![Publish workflow status](https://img.shields.io/github/workflow/status/kaskadi/collmex-client/publish?label=publish&logo=npm)](https://github.com/kaskadi/collmex-client/actions?query=workflow%3Apublish)
[![Data sync workflow status](https://img.shields.io/github/workflow/status/kaskadi/collmex-client/sync-data?label=sync-data&logo=github-actions)](https://github.com/kaskadi/collmex-client/actions?query=workflow%3Async-data)

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/collmex-client?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/collmex-client)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/collmex-client?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/collmex-client)
[![](https://img.shields.io/codeclimate/coverage/kaskadi/collmex-client?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/collmex-client)

# collmex-client

A Node client to communicate with Collmex API. This was inspired by our [`co-collmex` package](https://www.npmjs.com/package/co-collmex) but rewritten with modern Javascript (removing deprecated dependencies in the process).

# Installation

```
npm i collmex-client
```

# Usage

**Client initialisation**

```
const collmex = require('collmex-client')({
  User : "username",
  Password : "password",
  "CMXKundennummer" : 123456,
  "Firma_Nr" : 1,
  "Systemname" : "collmex-test"
})
```

**Methods**

`get`: retrieves data from Collmex
- parameters:
  - `data <Object>: data for the request to send to Collmex`
  - `output_format [Optional] <String>: specifies the desired output_format. Default: 'object'`
- Returns: `<Promise>`

*output_format valid values*

| value | description |
| --- | --- |
| "object" | **default** turns the response into an array of objects with named properties according to the collmex api documentation. numeric values are converted to js notation (dezimal point). Dates are turned to js/mysql compatible dates.|
| "array" | turns the response into an array of arrays. useful for bulk inserts into mysql for example. numeric values are converted to js notation (dezimal point). Dates are turned to js/mysql compatible dates.|
| "raw" | the raw response (CSV with ";" as the seperator). no conversion is performed. |

**Getting data**

```
const data = await collmex.get({ Satzart: "PRODUCT_GET", Produktnummer: 12345 })
```

OR

```
const data = await collmex.get([
  { Satzart: "PRODUCT_GET", Produktnummer:12345 },
  { Satzart: "STOCK_AVAILABLE_GET", Produktnummer: 12345 }
])
```

**Notes**

- all outputs are automatically converted to utf-8
- posting data can be performed via the get method as well