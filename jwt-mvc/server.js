const express=require('express');
const Jwt=require('jsonwebtoken');
const bodyparser=require('body-parser')
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();





//middlewares
app.use(cors());
app.use(bodyparser.json());
mongoose.connect('mongodb://abcd123:abcd123@ds019268.mlab.com:19268/karthik',(err)=>{
    console.log("connnected to mongodb")
});




//crud api combining

const routes=require('./crud/routes/index')
app.use('/api',routes);




//models
//schemas
const Schema=mongoose.Schema;
const sess=mongoose.model('token', new Schema({
    email : String,
    pass: String
}))


const event=mongoose.model('events', new Schema({
    products : String,
    city: String
}))


const special=mongoose.model('special', new Schema({
    products : String,
    city: String
}))


// token middlewate 
let verifyToken =function(req,res,next){
    if(!req.headers.authorization){
    return   res.status(401).send({message :"unotherized"})
    }
    let token=req.headers.authorization.split(' ')[1];

    try{
        if(token==="null"){
    // return   res.status(401).send({message :"unotherized"})
        }
        let payload=Jwt.verify(token,'secret');
        if(!payload){
     return   res.status(401).send({message :"unotherized"})
        }
        req.userId=payload.sub;    //why we are doing this i donno
        next();
    }catch(err){
     return   res.status(401).send({err})

    }
}

//routes

app.post('/register',(req,res)=>{
    const post=new sess(req.body);
    post.save((err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.send({message:"post success"});
        }
    })
});



app.post('/login',(req,res)=>{
    sess.find({email:req.body.email},(err,result)=>{
        if(result[0]){
            const token = Jwt.sign({ sub : result[0]._id },'secret')  ;
            res.status(200).send({token})
        }else{
            res.status(401).send({message:"please check ur password and email"})
        }
   
    })
})

app.get('/events',(req,res)=>{
    event.find({},(err,data)=>{
        res.send(data);
    })
})

app.get('/special',verifyToken,(req,res)=>{
    special.find({},(err,data)=>{
        res.send(data);
    })
})



app.listen(3000,()=>{
    console.log(`working on port 3000`)
})


