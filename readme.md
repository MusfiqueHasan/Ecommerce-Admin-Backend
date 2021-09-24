
### get shipping cost
GET http://localhost:5000/api/ecommrece/shippingCost/:id
id = 235,233 (product_ids)

response:
{
  "massage": "Success",
  "results": [
    {
      "shipping_class_id": 15,
      "shipping_class_name": "dsf ",
      "shipping_type": "Fixed Rate",
      "shipping_zone": [],
      "shipping_rate": 1009999
    },
    {
      "shipping_class_id": 14,
      "shipping_class_name": "Fixed",
      "shipping_type": "Fixed Rate",
      "shipping_zone": [],
      "shipping_rate": 90
    },
    {
      "shipping_class_id": 13,
      "shipping_class_name": "Outside Dhaka  ",
      "shipping_type": "Flat Rate",
      "shipping_zone": [
        "Faridpur",
        "Gazipur",
        "Gopalganj"
      ],
      "shipping_rate": 120
    },
    {
      "shipping_class_id": 12,
      "shipping_class_name": "Inside Dhaka",
      "shipping_type": "Flat Rate",
      "shipping_zone": [
        "Dhaka"
      ],
      "shipping_rate": 100
    }
  ]
}


### post shipping clas
POST http://localhost:5000/api/shipping
Content-Type: application/json

{
    "shipping_name":"CHECK",
    "shipping_type": "1",
    "shipping_zone": ["DHAKA,BANGLADESH","CHITTAGONG,BANGLADESH"],
    "shipping_rate": 100
}

response:
{
  "massage": "Success",
  "results": {
    "shipping_class_id": 16
  }
}


### get all blogs 

GET http://localhost:5000/api/blog/all-blogs

response:
{
  "jsonObject": {
    "message": "success",
    "value": [
      {
        "blog_id": 1000,
        "title": "title",
        "slug": "slug",
        "updated_at": "2021-09-22T18:00:00.000Z",
        "inserted_at": "2021-09-24T18:00:00.000Z",
        "content": "content",
        "status": "status",
        "id": 29,
        "images": "image"
      }
    ]
  }
}