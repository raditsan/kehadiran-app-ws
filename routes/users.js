const auth = require('../middleware/auth');
const {getUser, list, add} = require('../controllers/user');
const express = require('express');
const router = express.Router();

router.get('/',auth.isAuthorized, list);
router.get('/:username', getUser);
router.post('/',auth.isAuthorized, add);
// router.delete('/:id',auth.isAuthorized, deleteUser);
// router.put('/:id', updateUser);

module.exports = router;
