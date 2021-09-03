const express = require("express");
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
        res.status(200).json(jsonObject)
    }catch(error){
        res.status(500).json({massage:"Internal Server Error"})
    }
})

module.exports = routes