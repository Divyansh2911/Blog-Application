const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: `${__dirname}/config.env` })

const URI = process.env.MONGODB_URI;

mongoose.connect(URI, {

    useNewUrlParser: true,

    useUnifiedTopology: true,

}).then((value) => {
    console.log("connected")
}).catch((err) => {
    console.log(err.message)
});

const Users = new mongoose.Schema({
    id: Number,
    user_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    website: { type: String },
})
const User_Model = mongoose.model('User_Model', Users)


const Post_Schema = new mongoose.Schema({
    id: { type: Number, required: true },
    title: String,
    body: String,
    userId: { type: Number, required: true },
},
    {
        timestamps: true,
    })
const Post_Model = mongoose.model('Post_Model', Post_Schema)


const getUser = async (req, res) => {

    const { email, password, id } = req.query;
    if (id) {
        const user = await User_Model.find(id ? { id: id } : {});

        res.send(user)
    }
    else {
        const user = await User_Model.find(email && password ? { email: email, password: password } : {})

        res.send(user)
    }

}

// await User_Model.deleteMany();++
const seedUser = async (req, res) => {
    await User_Model.insertMany([{
        id: 2,
        user_name: "Sg",
        email: 'Sg.1@gmail.com',
        phone: "123",
        website: "ajio",
        password: "12345"

    }])
    res.json({ message: "User seeded" })
}

const createUser =async(req,res)=>{
    const createdUser = await User_Model.create(req.body)
    res.status(201).send(createdUser)
}

const editUser = async(req,res)=>{
    const {id} = req.params;
    const{user_name,email,phone,website,password} = req.body;
    try{
        const updatedUser = await User_Model.findOneAndUpdate({id:id},{
            user_name: user_name,
            email: email,
            phone: phone,
            website: website,
            password: password
        })
        res.send(updatedUser)
    }
    catch(err){
        res.status(404).json({message:err})
    }

}

const getPosts = async (req, res) => {
    const { userId } = req.query;
    const posts = await Post_Model.find(userId ? { userId: userId } : {})
    res.send(posts)
}
const getPost = async (req,res)=>{
    const {id} = req.params;
    const post = await Post_Model.findOne({id:id})
    res.send(post);
}

const seedPosts = async (req, res) => {
    await Post_Model.insertMany([
        {
            id: 2,
            title: "Hello Beautiful World",
            body: "This is S's blog",
            userId: 2,
        }
    ])
    res.json({ message: "post seeded successfully" })
}
const createPost = async(req,res)=>{
    const createdPost = await Post_Model.create(req.body)
    res.status(201).send(createdPost)
}

module.exports = { getUser,createUser,editUser, getPosts,getPost, seedUser, seedPosts,createPost };