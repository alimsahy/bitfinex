/**
 * @typedef Order 
 * 
 * @property {string} id
 * @property {string} symbol
 * @property {'BUY'|'SELL'} side
 * @property {number} amount
 * @property {number} price
 * 
*/

const { PeerRPCClient }  = require('grenache-nodejs-ws')
const Link = require('grenache-nodejs-link')

const link = new Link({
  grape: 'http://127.0.0.1:30001',
  requestTimeout: 10000
})
link.start()

const peer = new PeerRPCClient(link, {})
peer.init()

/**
 * @type {Order}
 */
const payload = { id: "XMV942MG27F90HRE", symbol: 'USD', side: 'BUY', amount: 100, price: 29.45 };
const payload2 = { id: "BNORIHGEOIRJF23E", symbol: 'USD', side: 'SELL', amount: 40, price: 29.45 };
const payload3 = { id: "NVDOWFHWUF80324G", symbol: 'USD', side: 'SELL', amount: 60, price: 29.45 };


peer.request('addOrder', payload, { timeout: 100000 }, (err, result) => 
{
    console.log(result);
})

peer.request('addOrder', payload2, { timeout: 100000 }, (err, result) => 
{
    console.log(result);
})

peer.request('addOrder', payload3, { timeout: 100000 }, (err, result) => 
{
    console.log(result);
})