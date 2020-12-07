const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const userRoute = require('./users')
const computerController = require('../controllers').computer;
const authController = require('../controllers').auth;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



/* Computer Router */
router.get('/api/computer', computerController.list);
// router.get('/api/computer/:id', computerController.getById);
router.post('/api/computer', computerController.add);
// router.put('/api/computer/:id', computerController.update);
// router.delete('/api/computer/:id', computerController.delete);

//AUTH
router.post('/api/auth/signin', authController.signIn);
router.post('/api/auth/signup', authController.signUp);
router.use('/api/users',auth.isAuth,userRoute);
// router.get('/api/user', userController.list);
// router.post('/api/user', userController.add);
// router.get('/api/user/:username', userController.getUser);

module.exports = router;
