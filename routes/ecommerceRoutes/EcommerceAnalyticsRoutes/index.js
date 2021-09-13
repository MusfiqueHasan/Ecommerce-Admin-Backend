const express = require("express");
const HTTPStatus = require("../../../HTTPStatus");
const EcommerceAnalyticsQuery = require("../../../Querry/EcommerceAnalytics");
const routes = express.Router();

routes.get('/inventory',async(req,res)=>{
    try{

        const response = await EcommerceAnalyticsQuery.getInventoryStatistice()
        console.log(response)
        const resultData = response.map(item=> {
            return{
                name:item.inventory_status,
                value:item.count
            }
        })
        const jsonObject = {
            massage:'Success',
            results:resultData
        }
        res.status(HTTPStatus.OK).json(jsonObject)
    }catch(error){
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({massage:"Internal Server Error"})
    }
})

module.exports = routes