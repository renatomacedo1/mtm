const express = require ('express');
const router = express.Router();

const {getAllProcessos, getProcesso, createProcesso, updateProcesso, deleteProcesso} = require('../controllers/processController');

router.route('/').post(createProcesso).get(getAllProcessos);
router.route('/:id').get(getProcesso).delete(deleteProcesso).patch(updateProcesso);


module.exports = router