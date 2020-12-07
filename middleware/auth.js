const jwt = require('jsonwebtoken');
module.exports = {
  isAuth: (req,res,next) => {
    try {
      const token = req.headers.token;
      req.user = jwt.verify(token, process.env.SECRET);
      next();
    } catch(err) {
      res.status(401).json({
        message: 'Token is Invalid'
      });
    }
  },
  isAuthorized: (req,res,next) => {
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(401).json({
        message: 'User Not Authorized'
      });
    }
  }
};
