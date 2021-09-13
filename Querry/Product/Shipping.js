const PromiseModule = require("../../helpers/Promise/PromiseModule")

const Shipping = {
    getShippingDetails,
    getShippingClass,
    addShippingClass,
    deleteShippingClassById,
    updateShippingClassById
}

async function getShippingDetails(id){
    const sqlSearch = `Select * from product_shipping where product_shipping.product_id = ${id}`
    return PromiseModule.readData(sqlSearch)
}

async function getShippingClass(){
    const sqlSearch=`Select * from shipping`;
    return PromiseModule.readData(sqlSearch)
}

async function addShippingClass(){

}

async function deleteShippingClassById(){

}

async function updateShippingClassById(){

}


module.exports =  Shipping