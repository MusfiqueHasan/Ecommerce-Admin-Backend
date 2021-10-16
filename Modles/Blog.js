const BlogEvent = (data) =>{

    // console.log(data);
    const blogObject = {
        blog_id: data.blog_id,
        title: data.title,
        slug: data.slug,
        images: data.images,
        content: data.content,
        updated_at: data.updated_at,
        catagory: [],
        status: data.status,
        userId: data.userId,
        username: data.username
    }
    // console.log(blogObject);
    return blogObject;
}

module.exports = {BlogEvent}

// {
//     "blog_id": 1055,
//     "title": "High valued individual - HVI",
//     "slug": "high-valued-individual",
//     "images": "",
//     "content": "hjVcDJCJD",
//     "updated_at": "2021-10-13T00:24:29.000Z",
//     "catagory": [
//       {
//         "category_id": 1,
//         "category_name": "category_name\t"
//       },
//       {
//         "category_id": 2,
//         "category_name": "jeans pant"
//       },
//       {
//         "category_id": 3,
//         "category_name": "asd"
//       }
//     ],
//     "status": "Published",
//     "userId": 29,
//     "username": "full Name"
//   }
