const express = require('express');
const {
create,login, getAll, getUser,editUser,deleteone,pushfollow} = require('../controllers/user');
const router = express.Router();
//get user
router.get('/', async (req, res, next) => {
  try {
    const users = await getAll();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

//create new user
router.post('/', async (req, res, next) => {
  const { body } = req;
  try {
    const user = await create(body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

//get User By ID
router.get('/:id', async (req, res, next) => {
  const { params: { id } } = req;
  try {
    const user = await getUser(id);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

//Update User
router.patch('/:id', async (req, res, next) => {
  const { params: { id }, body } = req;
  try {
    const user = await editUser(id, body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});
//delete User
router.delete('/:id',async (req, res, next) => {
    const { params: { id } } = req;
    try {
      const users = await deleteone(id);
      res.json(users);
    } catch (e) {
      next(e);
    }
  });
  
  router.post('/follow/:targetid',async(req,res,next)=>{
    const { params: {targetid} , user: { id } } = req;
    try {
      const userfollow= await pushfollow( id ,targetid);
      res.json(userfollow);
    } catch (e) {
      next(e);
    }
  })
router.post('/login', async (req, res, next) => {
  //debugger
  const { body } = req;
  try {
    
    const user = await login(body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});


module.exports = router;
