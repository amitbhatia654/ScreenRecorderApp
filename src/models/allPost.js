import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title: String,
    image: String,
    location: String,
    userId: String,
})

const posts = mongoose.models.posts || mongoose.model('posts', postSchema);
export default posts;