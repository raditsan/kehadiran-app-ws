const crypto = require("crypto");
const Model = require('../models').user;
// const db = require('../config/db');
const { QueryTypes } = require('sequelize');
module.exports = {
  // list: async (req, res) => {
  //   const { QueryTypes } = require('sequelize');
  //   const records = await sequelize.query('select 1 as `foo.bar.baz`', {
  //     nest: true,
  //     type: QueryTypes.SELECT
  //   });
  //   console.log(JSON.stringify(records[0], null, 2));
  //   try {
  //     const records = await sequelize.query('select 1 as `foo.bar.baz`', {
  //       type: sequelize.QueryTypes.SELECT
  //     });
  //     return res.status(200).send('hay')
  //   } catch (e) {
  //     return res.status(400).send(e)
  //   }
  list: async (req, res) => {
    // const records = await db.sequelize.query('select * from users;', {
    //   type: QueryTypes.SELECT
    // });
    // console.log(JSON.stringify(records, null, 2));
    // return res.status(200).send(records)

    return Model
      .findAll({
        include: [],
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then((departments) => res.status(200).send(departments))
      .catch((error) => { res.status(400).send(error); });
  },

  // getById(req, res) {
  //   return Computer
  //     .findByPk(req.params.id, {
  //       include: [{
  //         model: User,
  //         as: 'users'
  //       },
  //         {
  //           model: Project,
  //           as: 'projects'
  //         }],
  //     })
  //     .then((department) => {
  //       if (!department) {
  //         return res.status(404).send({
  //           message: 'Department Not Found',
  //         });
  //       }
  //       return res.status(200).send(department);
  //     })
  //     .catch((error) => res.status(400).send(error));
  // },

  add(req, res) {
    return Model
      .create({
          username: req.body.username,
          user_password: crypto.createHash("sha256").update(req.body.password).digest("hex")
        })
      .then((result) => res.status(201).send({success: true, data: result}))
      .catch((e) => {
        res.status(400).send({success: false, message: e.errors[0].message || e.message})
      });
  },
  getUser(req, res) {
    const username = req.params.username
    console.log('username',username)
    if (!username) {
      res.status(400).send({success: false, message: 'bad request'})
    }
    return Model.findOne({
      where: {
        username
      }
    })
    .then((result) => {
      if(result) {
        res.status(200).send({success: true, data: result})
      } else {
        res.status(404).send({success: false, message: 'username with '+req.params.username+' not found.'})
      }
    })
    .catch((e) => {
      res.status(400).send({success: false, message: e.errors[0].message || e.message})
    });


      // .create({
      //     username: req.body.username,
      //     user_password: crypto.createHash("sha256").update(req.body.password).digest("hex")
      //   })
      // .then((result) => res.status(201).send({success: true, data: result}))
      // .catch((e) => {
      //   res.status(400).send({success: false, message: e.errors[0].message || e.message})
      // });
  },

  // update(req, res) {
  //   return Department
  //     .findByPk(req.params.id)
  //     .then(department => {
  //       if (!department) {
  //         return res.status(404).send({
  //           message: 'Department Not Found',
  //         });
  //       }
  //       return department
  //         .update({
  //           department_head: req.body.department_head || department.department_head,
  //           department_description: req.body.department_description || department.department_description,
  //         })
  //         .then(() => res.status(200).send(department))
  //         .catch((error) => res.status(400).send(error));
  //     })
  //     .catch((error) => res.status(400).send(error));
  // },

  // delete(req, res) {
  //   return Department
  //     .findByPk(req.params.id)
  //     .then(department => {
  //       if (!department) {
  //         return res.status(400).send({
  //           message: 'Department Not Found',
  //         });
  //       }
  //       return department
  //         .destroy()
  //         .then(() => res.status(204).send())
  //         .catch((error) => res.status(400).send(error));
  //     })
  //     .catch((error) => res.status(400).send(error));
  // },
};
