![](https://img.shields.io/github/package-json/v/kaskadi/aws-es-client)
![](https://img.shields.io/badge/code--style-standard-blue)
![](https://img.shields.io/github/license/kaskadi/aws-es-client?color=blue)

**GitHub Actions workflows status**

[![Build workflow status](https://img.shields.io/github/workflow/status/kaskadi/collmex-client/build?label=build&logo=mocha)](https://github.com/kaskadi/collmex-client/actions?query=workflow%3Abuild)
[![Publish workflow status](https://img.shields.io/github/workflow/status/kaskadi/collmex-client/publish?label=publish&logo=npm)](https://github.com/kaskadi/collmex-client/actions?query=workflow%3Apublish)
[![Data sync workflow status](https://img.shields.io/github/workflow/status/kaskadi/collmex-client/sync-data?label=sync-data&logo=github-actions)](https://github.com/kaskadi/collmex-client/actions?query=workflow%3Async-data)
[![Docs generation status](https://img.shields.io/github/workflow/status/kaskadi/aws-es-client/generate-docs?label=docs&logo=read-the-docs)](https://github.com/kaskadi/aws-es-client/actions?query=workflow%3Agenerate-docs)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/aws-es-client?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/aws-es-client)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/aws-es-client?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/aws-es-client)
[![](https://img.shields.io/codeclimate/coverage/kaskadi/aws-es-client?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/aws-es-client)

**LGTM**

[![](https://img.shields.io/lgtm/grade/javascript/github/kaskadi/aws-es-client?label=code%20quality&logo=LGTM)](https://lgtm.com/projects/g/kaskadi/aws-es-client/?mode=list&logo=LGTM)

****

# collmex-client

A Node client to communicate with Collmex API. This was inspired by our [`co-collmex` package](https://www.npmjs.com/package/co-collmex) but rewritten with modern Javascript (removing deprecated dependencies in the process).

# Installation

```
npm i collmex-client
```

# Usage

<a name="module_collmex-client"></a>

## collmex-client ⇒ <code>Collmex</code>
**Returns**: <code>Collmex</code> - New Collmex client  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>object</code> | [Options](#module_collmex-client..Options) to be passed to instanciate a new client |

**Example**  
```js
const collmex = require('collmex-client')({
  User : "username",
  Password : "password",
  "CMXKundennummer" : 123456,
  "Firma_Nr" : 1,
  "Systemname" : "collmex-test"
})
```

* [collmex-client](#module_collmex-client) ⇒ <code>Collmex</code>
    * _static_
        * [.get(data, [output_format])](#module_collmex-client.get) ⇒ <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code>
    * _inner_
        * [~Options](#module_collmex-client..Options) : <code>Object</code>

<a name="module_collmex-client.get"></a>

### collmex.get(data, [output_format]) ⇒ <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code>
Proceed call to Collmex API

**Kind**: static method of [<code>collmex-client</code>](#module_collmex-client)  
**Returns**: <code>Promise</code> \| <code>Array.&lt;Promise&gt;</code> - The fulfilled promise(s) value type depends on the `output_format` provided when using `get` or on the `Output` option used when instanciating a new client  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| data | <code>object</code> \| <code>Array.&lt;object&gt;</code> |  | Data for the request to send to Collmex. Use an `array` if you would like to send multiple requests at once. |
| [output_format] | <code>string</code> | <code>&quot;object&quot;</code> | Desired output type (set only for that specific call). See [here](#output-formats) for `output_format` valid values |

**Example**  
```js
// retrieve a given product from Collmex

const data = await collmex.get({ Satzart: "PRODUCT_GET", Produktnummer: 12345 })

// you can also retrieve a given product
// AND the available stocks for that product (multiple requests)

const data = await collmex.get([
 { Satzart: "PRODUCT_GET", Produktnummer:12345 },
 { Satzart: "STOCK_AVAILABLE_GET", Produktnummer: 12345 }
])
```
<a name="module_collmex-client..Options"></a>

### collmex-client~Options : <code>Object</code>
Options for the new Collmex client instanciation

**Kind**: inner typedef of [<code>collmex-client</code>](#module_collmex-client)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| User | <code>string</code> |  | Collmex user |
| Password | <code>string</code> |  | Collmex password for given user |
| CMXKundennummer | <code>number</code> |  | Collmex Customer Number |
| Firma_Nr | <code>number</code> |  | Company Number (as registered with Collmex) |
| [Systemname] | <code>string</code> | <code>&quot;collmex-client&quot;</code> | User-agent you would like to use for your client |
| [Output] | <code>string</code> | <code>&quot;object&quot;</code> | Desired output type. Will be set for any further `get` calls except if reassigned or overwritten via `get` `output_format` parameter. |

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