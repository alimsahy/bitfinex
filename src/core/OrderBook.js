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

class OrderBook
{
    /**
     * Orders container object
     * 
     * @type {Order[]}
     * 
    */
    #m_allOrders = [];    

    /**
     * Gets all orders
     * 
     * @returns {Order[]}
     * 
    */
    get orders()
    {
        return this.#m_allOrders;
    }

    /**
     * Adds new order to order book
     * 
     * @public
     * @function addOrder
     * 
     * @param {Order} orderInfo             Order that given by user
     * 
     * @returns {void}
     * 
    */
    addOrder(orderInfo)
    {
        this.#m_allOrders.push(orderInfo);
        
    }

    /**
     * Runs match order for given symbol
     * 
     * @param {string} symbol 
     * 
    */
    runEngine(symbol)
    {
        let sellOrders = this.orders.filter(i => i.side === 'SELL' && i.symbol === symbol);
        let buyOrders = this.orders.filter(i => i.side === 'BUY' && i.symbol === symbol);
        
        while (buyOrders.length > 0 && sellOrders.length > 0)
        {
            let highestPrice = buyOrders.sort((a, b) => b.price - a.price)[0];
            let lowestPrice = sellOrders.sort((a, b) => a.price - b.price)[0];

            if (highestPrice.price >= lowestPrice.price)
            {
                const matchedQuantity = Math.min(highestPrice.amount, lowestPrice.amount);
                highestPrice.amount -= matchedQuantity;
                lowestPrice.amount -= matchedQuantity;
                console.log(`Matched order: ${highestPrice.id} BUY ${matchedQuantity} shares at ${lowestPrice.price} from ${lowestPrice.id}`);
                if (highestPrice.amount === 0) buyOrders.shift();
                if (lowestPrice.amount === 0) sellOrders.shift();
            }
            else break;
        }        
    }
}

module.exports = OrderBook;