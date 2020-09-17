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

{{>main}}

<a href="#output-formats"></a>

**Output formats**

| value | description |
| --- | --- |
| "object" | **default** turns the response into an array of objects with named properties according to the collmex api documentation. numeric values are converted to js notation (dezimal point). Dates are turned to js/mysql compatible dates.|
| "array" | turns the response into an array of arrays. useful for bulk inserts into mysql for example. numeric values are converted to js notation (dezimal point). Dates are turned to js/mysql compatible dates.|
| "raw" | the raw response (CSV with ";" as the seperator). no conversion is performed. |

**Notes**

- all outputs are automatically converted to utf-8
- posting data can be performed via the get method as well