const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());


// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/userdb')

.then(() => {

    console.log('MongoDB Connected');
})

.catch((err) => {

    console.log(err);
});


// Schema
const UserSchema = new mongoose.Schema({

    name:String,
    email:String,
    password:String

});

const User = mongoose.model('User', UserSchema);


// Serve HTML
app.get('/', (req,res) => {

    res.sendFile(
        path.join(__dirname,'index.html')
    );

});


// CREATE
app.post('/register', async (req,res) => {

    try{

        const user = new User(req.body);

        await user.save();

        res.send('User Registered');

    }catch(err){

        res.send(err);
    }
});


// READ
app.get('/users', async (req,res) => {

    try{

        const users = await User.find();

        res.json(users);

    }catch(err){

        res.send(err);
    }
});


// UPDATE
app.put('/update/:id', async (req,res) => {

    try{

        await User.findByIdAndUpdate(
            req.params.id,
            req.body
        );

        res.send('User Updated');

    }catch(err){

        res.send(err);
    }
});


// DELETE
app.delete('/delete/:id', async (req,res) => {

    try{

        await User.findByIdAndDelete(
            req.params.id
        );

        res.send('User Deleted');

    }catch(err){

        res.send(err);
    }
});


// Server
app.listen(3000, () => {

    console.log(
        'Server running at http://localhost:3000'
    );

});