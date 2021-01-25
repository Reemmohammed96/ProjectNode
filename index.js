const express=require('express');
const mongoose=require('mongoose');
const app=express();
const routes=require('./Routes');
const { MONGODB_URI } = process.env;
mongoose.connect(MONGODB_URI,{useUnifiedTopology:true});
app.use(express.json());
app.use('/',routes)


app.use('*',(req,res,next)=>{
    res.status(404).json({err:'NOT FOUND'});
})
//error handling
app.use((err,req,res,next)=>{
//if error is mongoose error
if (err instanceof mongoose.Error.ValidationError) {
    return res.status(422).json(err.errors);
  }
  if (err.code === 11000) {
    res.status(422).json({ statusCode: 'ValidationError', property: err.keyValue });
  }
  if (err.message === 'UN_AUTHENTICATED') {
    res.status(401).json({ statusCode: 'UN_AUTHENTICATED' });
  }
  res.status(503).json({"error":err.message});



});
const {PORT=3000}=process.env;
app.listen(PORT,()=>{
    console.log('APP IA UP AND READY ON',PORT)
})
