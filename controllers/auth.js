const models = require('../models');
const utils = require('../utils');
const jwt = require('jsonwebtoken');
const accessTokenController = require('./access_token')
module.exports = {
  signUp: (req, res) => {
    models.user.create({
      username: req.body.username,
      user_password: utils.encription(req.body.password)
    }).then((user) => {
      res.status(201).json({
        message: `Success Sign Up New User`,
        data: {...user.dataValues, user_password: undefined}
      });
    }).catch((err) => {
      res.status(400).json({
        message: err.errors[0].message || err.message
      });
    });
  },
  signIn: (req,res) => {
    models.user.findOne({
      where: {
        username: req.body.username,
        user_password: utils.encription(req.body.password)
      }
    }).then(async (user) => {
      if (user) {
        const token = jwt.sign({ id: user.id, username: user.username, role: 'admin'}, process.env.SECRET);
        if (token) {
          const access = await accessTokenController.addByLogin({body: {access_token: token, user_id: user.id}})
          if(!access) {
            res.status(401).json({
              message: "Login failed",
              success: false
            });
          }
          res.status(200).json({
            success: true,
            message: "Success Sign In",
            token
          });
        }
      } else {
        res.status(200).json({
          message: "Failed Sign In",
        });
      }
    }).catch((err) => {
      res.status(200).json({
        message: err.message,
      });
    });
  },
};
