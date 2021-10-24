const BlogEvent = (data) =>{

    // console.log(data);
    const blogObject = {
        blog_id: data.blog_id,
        title: data.title,
        slug: data.slug,
        images: data.images,
        content: data.content,
        updated_at: data.updated_at,
        catagory: null,
        status: data.status,
        userId: data.userId,
        username: data.username
    }
    // console.log(blogObject);
    return blogObject;
}

module.exports = {BlogEvent}