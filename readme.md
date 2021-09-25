
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

### get all categories
GET http://localhost:5000/api/category/categories

response:
{
  "massage": "success",
  "results": [
    {
      "category_id": 1,
      "name": "Kurti",
      "parent_id": -1000,
      "inserted_at": "2021-09-25T14:55:06.000Z",
      "updated_at": "2021-09-19T11:13:46.000Z",
      "description": ""
    },
    {
      "category_id": 2,
      "name": "Pakistani Kurti",
      "parent_id": 1,
      "inserted_at": "2021-09-19T11:14:09.000Z",
      "updated_at": "2021-09-19T11:14:09.000Z",
      "description": ""
    },
    {
      "category_id": 3,
      "name": "panjabi",
      "parent_id": -1000,
      "inserted_at": "2021-09-25T14:56:11.000Z",
      "updated_at": "0000-00-00 00:00:00",
      "description": ""
    },
    {
      "category_id": 4,
      "name": "saree",
      "parent_id": -1000,
      "inserted_at": "2021-09-25T14:56:11.000Z",
      "updated_at": "0000-00-00 00:00:00",
      "description": ""
    },
    {
      "category_id": 5,
      "name": "indian panjabi",
      "parent_id": 3,
      "inserted_at": "2021-09-25T15:02:10.000Z",
      "updated_at": "0000-00-00 00:00:00",
      "description": ""
    }
  ]
}

### get all parent categories

GET http://localhost:5000/api/category/parent-categories

response:

{
  "massage": "success",
  "results": [
    {
      "category_id": 1,
      "name": "Kurti",
      "parent_id": -1000,
      "inserted_at": "2021-09-25T14:55:06.000Z",
      "updated_at": "2021-09-19T11:13:46.000Z",
      "description": ""
    },
    {
      "category_id": 3,
      "name": "panjabi",
      "parent_id": -1000,
      "inserted_at": "2021-09-25T14:56:11.000Z",
      "updated_at": "0000-00-00 00:00:00",
      "description": ""
    },
    {
      "category_id": 4,
      "name": "saree",
      "parent_id": -1000,
      "inserted_at": "2021-09-25T14:56:11.000Z",
      "updated_at": "0000-00-00 00:00:00",
      "description": ""
    }
  ]
}

### create a new category
POST http://localhost:5000/api/category/new-category
Content-Type: application/json

{
    "data":{
        "category_name" : "dhuti",
        "parent_id" : "",
        "description" : "whatever"
    }
}

response:
{
  "massage": "success",
  "results": {
    "name": "dhuti",
    "parent_id": -1000,
    "inserted_at": 0,
    "updated_at": 0,
    "description": "whatever"
  }
}

### update any category

PATCH  http://localhost:5000/api/category/category
Content-Type: application/json

{
    "data":{
        "id" : "8",
        "category_name" : "dhuti",
        "parent_id" : "",
        "description" : "whatever"
    }
}

response:
{
  "massage": "success"
}

### delete any category by it's ID
DELETE http://localhost:5000/api/category/category
Content-Type: application/json

{
    "id" : "4"
}
