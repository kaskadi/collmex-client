![](https://img.shields.io/github/package-json/v/kaskadi/aws-es-client)
![](https://img.shields.io/badge/code--style-standard-blue)
![](https://img.shields.io/github/license/kaskadi/aws-es-client?color=blue)

**GitHub Actions workflows status**

[![Build workflow status](https://img.shields.io/github/workflow/status/kaskadi/collmex-client/build?label=build&logo=mocha)](https://github.com/kaskadi/collmex-client/actions?query=workflow%3Abuild)
[![Publish workflow status](https://img.shields.io/github/workflow/status/kaskadi/collmex-client/publish?label=publish&logo=npm)](https://github.com/kaskadi/collmex-client/actions?query=workflow%3Apublish)
[![Data sync workflow status](https://img.shields.io/github/workflow/status/kaskadi/collmex-client/sync-data?label=sync-data&logo=github-actions)](https://github.com/kaskadi/collmex-client/actions?query=workflow%3Async-data)
[![Code scanning status](https://img.shields.io/github/workflow/status/kaskadi/collmex-client/code-scanning?label=code-scanning&logo=github)](https://github.com/kaskadi/collmex-client/actions?query=workflow%3Acode-scanning)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/aws-es-client?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/aws-es-client)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/aws-es-client?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/aws-es-client)
[![](https://img.shields.io/codeclimate/coverage/kaskadi/aws-es-client?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/aws-es-client)

****

# collmex-client

A Node client to communicate with Collmex API. This was inspired by our [`co-collmex` package](https://www.npmjs.com/package/co-collmex) but rewritten with modern Javascript (removing deprecated dependencies in the process).

**Note:** this package uses a GitHub Action `sync-data` (see [here](https://github.com/kaskadi/collmex-client/actions?query=workflow%3Async-data) and [there](./.github/workflows/sync-data.yml)) to scrap Collmex API documentation daily to check that the CSV mapping (stored [here](./data/satzarten.json)) used is still up to date. This mapping could have been stored into a public CDN and fetched on client instanciation (& then on daily basis for persistent clients) but that would slow down performances and introduce a potential failure point (CDN down -> no data). **Please make sure you always use the latest version of this package to ensure the answer you get from Collmex API is the correct one.**

# Installation

```
npm i collmex-client
```

# API documentation

## Modules
Module | Description
------ | -----------
[collmex-client] | Creates a new client to communicate with Collmex API.

## Typedefs

Name | Description
------ | -----------
[Options] | Options for the new Collmex client instanciation


## collmex-client

Creates a new client to communicate with Collmex API.

**Returns**: `Collmex` - Collmex client  

| Param | Type | Description |
| --- | --- | --- |
| opts | [`Options`] | Options to be passed to instanciate a new client |

**Example**  
```js
const collmex = require('collmex-client')({
  User: 'username',
  Password: 'password',
  CMXKundennummer: 123456,
  Firma_Nr: 1,
  Systemname: 'collmex-test'
})
```

### collmex.get(data, \[output_format\])

Calls Collmex API.

**Kind**: static method of [`collmex-client`]  
**Returns**: `Promise.<(Array.<object>|Array.<array>|Array.<string>)>` - The fulfilled promise(s) value type depends on the `output_format` provided when using `get` or on the `Output` option used when instanciating a new client  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | `object` \| `Array.<object>` |  | Data for the request to send to Collmex. Use an `array` if you would like to send multiple requests at once. |
| \[output_format\] | `string` | `'object'` | Desired output type (set only for that specific call). See [here] for `output_format` valid values |

**Example**  
```js
// retrieve a given product from Collmex

const data = await collmex.get({ Satzart: 'PRODUCT_GET', Produktnummer: 12345 })

// you can also retrieve a given product
// AND the available stocks for that product (multiple requests)

const data = await collmex.get([
 { Satzart: 'PRODUCT_GET', Produktnummer: 12345 },
 { Satzart: 'STOCK_AVAILABLE_GET', Produktnummer: 12345 }
])
```

## Options

Options for the new Collmex client instanciation

**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| User | `string` |  | Collmex user |
| Password | `string` |  | Collmex password for given user |
| CMXKundennummer | `number` |  | Collmex Customer Number |
| Firma_Nr | `number` |  | Company Number (as registered with Collmex) |
| \[Systemname\] | `string` | `'collmex-client'` | User-agent you would like to use for your client |
| \[Output\] | `string` | `'object'` | Desired output type. Will be set for any further `get` calls except if reassigned or overwritten via `get` `output_format` parameter. |

<!-- LINKS -->

[collmex-client]:#collmex-client
[Options]:#options
[`Options`]:#options
[`collmex-client`]:#collmex-client
[here]:#output-formats

# Details

**Output formats <a name="output-formats"></a>**

| value | description |
| --- | --- |
| "object" | **default** turns the response into an array of objects with named properties according to the collmex api documentation. numeric values are converted to js notation (dezimal point). Dates are turned to js/mysql compatible dates.|
| "array" | turns the response into an array of arrays. useful for bulk inserts into mysql for example. numeric values are converted to js notation (dezimal point). Dates are turned to js/mysql compatible dates.|
| "raw" | the raw response (CSV with ";" as the seperator). no conversion is performed. |

**Notes**

- all outputs are automatically converted to utf-8
- posting data can be performed via the get method as well