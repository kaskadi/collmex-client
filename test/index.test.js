/* eslint-env mocha */
const assert = require('chai').assert
const fs = require('fs')
const options = fs.existsSync(`${__dirname}/data/options.json`) ? require('./data/options.json') : require('./data/options.default.json')
const invalidOptions = require('./data/options.invalid.json')
const collmex = require('../index.js')(options)
const invalidCollmex = require('../index.js')(invalidOptions)

describe('collmex-client', function () {
  it('should be able to get product data from collmex as array', async function () {
    await collmex.get([{ Satzart: 'PRODUCT_GET', Produktnummer: options.Produktnummer }], 'array').then(testDataType('array'))
  })
  it('should be able to get data in raw format', async function () {
    await collmex.get([{ Satzart: 'PRODUCT_GET', Produktnummer: options.Produktnummer }], 'raw').then(testDataType('raw'))
  })
  it('should be able to parse data to objects', async function () {
    await collmex.get({ Satzart: 'PRODUCT_GET', Produktnummer: options.Produktnummer }).then(testDataType('object'))
  })
  it('should return a success MESSAGE(S) for successfull requests', async function () {
    await collmex.get([{ Satzart: 'PRODUCT_GET', Produktnummer: options.Produktnummer }]).then(testSuccessMsg)
  })
  it('should return an error MESSAGE(E) if there was an error in the request', async function () {
    await invalidCollmex.get([{ Satzart: 'PRODUCT_GET', Produktnummer: options.Produktnummer }]).then(testErrorMsg)
  })
  it('should be able to get product groups', async function () {
    await collmex.get({ Satzart: 'PRODUCT_GROUPS_GET' }).then(testResponseFields('PRDGRP'))
  })
  it('should be able to get available stocks', async function () {
    await collmex.get({ Satzart: 'STOCK_AVAILABLE_GET', Produktnummer: options.Produktnummer }).then(testResponseFields('STOCK_AVAILABLE'))
  })
  it('should be able to get stocks', async function () {
    await collmex.get({ Satzart: 'STOCK_GET', Produktnummer: options.Produktnummer }).then(testResponseFields('CMXSTK'))
  })
  it('should be able to get stock changes', async function () {
    await collmex.get({ Satzart: 'STOCK_CHANGE_GET', Produktnummer: options.Produktnummer }).then(testResponseFields('STOCK_CHANGE'))
  })
  it('should be able to get sales orders', async function () {
    await collmex.get({ Satzart: 'SALES_ORDER_GET', Auftragsnummer: options.Auftragsnummer }).then(testResponseFields('CMXORD-2'))
  })
  it('should be able to get invoices', async function () {
    await collmex.get({ Satzart: 'INVOICE_GET', Rechnungsnummer: options.Rechnungsnummer }).then(testResponseFields('CMXINV'))
  })
  it('should be able to get delivery notices', async function () {
    await collmex.get({ Satzart: 'DELIVERY_GET', Lieferungsnummer: options.Lieferungsnummer }).then(testResponseFields('CMXDLV'))
  })
  it('should be able to get purchase orders', async function () {
    await collmex.get({ Satzart: 'PURCHASE_ORDER_GET', Lieferantenauftragsnummer: options.Lieferantenauftragsnummer }).then(testResponseFields('CMXPOD'))
  })
  it('should be able to get customers', async function () {
    await collmex.get({ Satzart: 'CUSTOMER_GET', Kunde_Nr: options.Kunde_Nr }).then(testResponseFields('CMXKND'))
  })
  it('should be able to get vendors', async function () {
    await collmex.get({ Satzart: 'VENDOR_GET', Lieferanten_Nr: options.Lieferanten_Nr }).then(testResponseFields('CMXLIF'))
  })
  it('should be able to get vendor agreements', async function () {
    await collmex.get({ Satzart: 'VENDOR_AGREEMENT_GET', Lieferant_Nr: options.Lieferanten_Nr }).then(testResponseFields('CMXVAG'))
  })
  it('should be able to get address groups', async function () {
    await collmex.get({ Satzart: 'ADDRESS_GROUPS_GET' }).then(testResponseFields('ADRGRP'))
  })
  it('should be able to get production orders', async function () {
    await collmex.get({ Satzart: 'PRODUCTION_ORDER_GET' }).then(testResponseFields('PRODUCTION_ORDER'))
  })
  it('should be able to get price groups', async function () {
    await collmex.get({ Satzart: 'PRICE_GROUPS_GET' }).then(testResponseFields('PRICE_GROUP'))
  })
  it('should be able to get vouchers', async function () {
    await collmex.get({ Satzart: 'VOUCHER_GET' }).then(testResponseFields('VOUCHER'))
  })
  it('should be able to get open items for customers', async function () {
    // since we're not sure that this given customer will always have open items, we just test for success messages for our query
    await collmex.get({ Satzart: 'OPEN_ITEMS_GET', Kunde_Nr: options.Kunde_Nr }).then(testSuccessMsg)
  })
  it('should be able to get open items for vendors', async function () {
    // since we're not sure that this given supplier will always have open items, we just test for success messages for our query
    await collmex.get({ Satzart: 'OPEN_ITEMS_GET', Offene_Posten: 1, Lieferant_Nr: options.Lieferanten_Nr }).then(testSuccessMsg)
  })
  it('should be able to get quotations', async function () {
    await collmex.get({ Satzart: 'QUOTATION_GET', Angebotsnummer: options.Angebotsnummer }).then(testResponseFields('CMXQTN'))
  })
  it('should be able to get addresses', async function () {
    await collmex.get({ Satzart: 'ADDRESS_GET', Text: options.Customer_Name }).then(testResponseFields('CMXADR'))
  })
  it('should be able to get bill of materials', async function () {
    await collmex.get({ Satzart: 'BILL_OF_MATERIAL_GET' }).then(testResponseFields('CMXBOM'))
  })
})

function testDataType (format) {
  return res => {
    switch (format) {
      case 'array':
        assert.equal(Array.isArray(res), true)
        assert.equal(res.length, 3)
        assert.equal(Array.isArray(res[0]), true)
        assert.equal(res[0][0], 'CMXPRD')
        break
      case 'raw':
        assert.equal(Array.isArray(res), false)
        assert.equal(typeof res, 'string')
        assert.equal(res.substring(0, 6), 'CMXPRD')
        break
      case 'object':
        assert.equal(Array.isArray(res), true)
        assert.equal(typeof res[0], 'object')
        assert.equal(res[0].Satzart, 'CMXPRD')
        assert.equal(Object.prototype.hasOwnProperty.call(res[0], 'undefined'), false)
        break
      default:
        break
    }
  }
}

function testSuccessMsg (res) {
  const resLength = res.length
  assert.equal(res[resLength - 2].Satzart, 'MESSAGE')
  assert.equal(res[resLength - 1].Satzart, 'MESSAGE')
  assert.equal(res[resLength - 2].Meldungstyp, 'S')
  assert.equal(res[resLength - 1].Meldungstyp, 'S')
}

function testErrorMsg (res) {
  assert.equal(res[0].Satzart, 'MESSAGE')
  assert.equal(res[0].Meldungstyp, 'E')
}

function testResponseFields (satzart) {
  return res => {
    assert.equal(res[0].Satzart, satzart)
    assert.equal(Object.prototype.hasOwnProperty.call(res[0], 'undefined'), false)
  }
}
