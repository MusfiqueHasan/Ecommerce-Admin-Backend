const PromiseModule = require("../../helpers/Promise/PromiseModule")

const Shipping = {
    getShippingDetails
}

async function getShippingDetails(id){
    const sqlSearch = `Select * from product_shipping where product_shipping.product_id = ${id}`
    return PromiseModule.readData(sqlSearch)
}

module.exports =  Shipping