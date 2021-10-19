const BlogEvent = (data) =>{

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
    return blogObject;
}

module.exports = {BlogEvent}
