const express = require('express')
const {getUser,createUser,editUser,getPosts,getPost,seedUser,seedPosts,createPost} = require('./serverComponents')
const app = express();
app.use(express.json())



app.get('/', (req, res) => {
    res.status(200).send("welcome")
})
app.get('/api/user', getUser);
app.get('/api/seed', seedUser);
app.get('/api/posts/',getPosts);
app.get('/api/posts/:id',getPost);
app.get('/api/seedPosts',seedPosts);
app.post('/api/user',createUser)
app.post('/api/posts',createPost)
app.put('/api/user/:id',editUser)
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Listening to port on server http://localhost:5000")
})
