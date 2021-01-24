const Blog=require('../models/Blog')
const create=(blog)=>{
return Blog.create(blog) ;
}
const getAll=()=>Blog.find({}).exec();

const getById=(id)=>Blog.findById(id).exec();

const editOne = (id, body) => Todo.findByIdAndUpdate(id, body, { new: true }).exec();

const getuserBlogs = (query) => Blog.find(query).exec();

const deleteone=(id) => Blog.findOneAndDelete({'_id':id}); 

const getblog=(_tag) =>Blog.find({tags:{$elemMatch:{tag:_tag}}}).exec();

module.exports={
    create,
    getAll,
    getById,
    editOne,
    getuserBlogs,
    deleteone,
    getblog
}