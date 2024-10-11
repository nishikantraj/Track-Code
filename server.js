const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express();
const PORT = 5069

// Middleware
app.use(express.json())
app.use(cors())

// Now we'll conncet to MongoDB

mongoose.connect('mongodb+srv://nishikantraj1977:Nishikant12%40@cluster0.sc9sk.mongodb.net/',{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log("MongoDB connected"))
    .catch((err)=>console.log(err));

// This route is for testing

app.get('/',(req,res)=>{
    res.send("you are connected to this test server")
})

//creating API endpoints
const User = require("./Models/User")

//Route to create a new user
app.post("/api/user", async (req, res)=>{
    const {userName, email} = req.body;

    try{
        const newUser = new User({userName, email})
        await newUser.save()
        res.status(200).json(newUser)
    }
    catch(error){
        res.status(400).json({message:"Error while creating user: ",error})
    }
})

//Route to add a coding session
app.post('/api/user/:userId/sessions', async(req,res)=>{
    const {userId} = req.params
    const {language, timeSpent} = req.body

    try{
        const user = await User.findById(userId)
        if(!user)
           return res.status(400).json({message: "User not found"});

        // Adding the sessisons
        user.session.push({language, timeSpent})
        await user.save();
        res.status(200).json(user)
    }
    catch(error){
        res.status(400).json({msg: "Error while adding the session: ",error})
    }
})

// Fetching the data from DB 
app.get("/api/leaderboard", async(req, res)=>{
    
})

app.listen(PORT, ()=>console.log(`Server is running on the PORT: ${PORT}`));
