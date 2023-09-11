const { PeerRPCServer }  = require('grenache-nodejs-ws')
const Link = require('grenache-nodejs-link')
const OrderBook = require('./src/core/OrderBook');
let orders = new OrderBook();

const link = new Link(
{
  	grape: 'http://127.0.0.1:30001'
});
link.start()
const peer = new PeerRPCServer(link, {})
peer.init()

const service = peer.transport('server')
service.listen(1337)

setInterval(() => 
{
    link.announce('fibonacci_worker', service.port, {})
    link.announce('addOrder', service.port, {});
    link.announce('orderMatched', service.port, {});
}, 1000)

service.on('request', (rid, key, payload, handler) => 
{
	console.log(key, payload)
    if (key === 'addOrder')
    {
		console.log('emir geldi')
		orders.addOrder(payload);
		orders.runEngine(payload.symbol)
		service.emit('orderAdded', payload);
    }
    handler.reply(null, `${key} - ${payload}`)
})