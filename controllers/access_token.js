const {json} = require('sequelize')

const Model = require('../models').access_token;

module.exports = {
  list(req, res) {
    return Model
      .findAll({
        include: [],
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then((result) => res.status(200).send(result))
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
  addByLogin(req) {
    return Model
      .create(req.body)
      .then(() => true)
      .catch(() => false);
  },
  add(req, res) {
    return Model
      .create(
        req.body
        //   {
        //   id: req.body.id,
        //   department_head: req.body.department_head,
        //   department_description: req.body.department_description,
        // }
      )
      .then((department) => res.status(201).send(department))
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Model
      .findByPk(req.params.id)
      .then(department => {
        if (!department) {
          return res.status(400).send({
            message: 'Department Not Found',
          });
        }
        return department
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
