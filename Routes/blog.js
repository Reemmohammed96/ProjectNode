const express = require('express');
const authMiddleware = require('../middlewares/auth');
const {
  create, getAll,  getById, editOne, deleteone, getuserBlogs,getblog} = require('../controllers/blog');
const router = express.Router();

//get All Blogs
router.get('/', async (req, res, next) => {
  try {
    const blog = await getAll();
    res.json(blog);
  } catch (e) {
    next(e);
  }
});
//search By Tag
router.get('/tags/:tag', async (req, res, next) => {
  const { params: {tag} } = req;
  try {
    console.log(tag);
    const blogs = await getblog(tag);
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});
//Use Middeleware
router.use(authMiddleware);
//create Blog
router.post('/', async (req, res, next) => {
  const { body, user: { id } } = req;
  try {
    const blog = await create({ ...body, auther: id });
    res.json(blog);
  } catch (e) {
    next(e);
  }
});
//get All User Blogs
router.get('/', async (req, res, next) => {
  const { user: { id } } = req;
  try {
    const blog = await getuserBlogs({ auther: id });
    res.json(blog);
  } catch (e) {
    next(e);
  }
});
//get Blog By ID
router.get('/:id', async (req, res, next) => {

  const { params: { id } } = req;
  try {
    const blog = await getById(id);
    res.json(blog);
  } catch (e) {
    next(e);
  }
});
//Update Blog
router.patch('/:id', async (req, res, next) => {
  const { params: { id }, body } = req;
  try {
    const blogs = await editOne(id, body);
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});
//Delete By ID
router.delete('/:id',async (req, res, next) => {
    const { params: { id } } = req;
    try {
      const blogs = await deleteone(id);
      res.json(blogs);
    } catch (e) {
      next(e);
    }
});

module.exports = router;
