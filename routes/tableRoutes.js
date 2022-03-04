const express = require ('express');
const router = express.Router();

const {getAllTables, getTable, createTable, updateTable, deleteTable} = require('../controllers/tableController');

router.route('/').post(createTable).get(getAllTables);
router.route('/:id').get(getTable).delete(deleteTable).patch(updateTable);


module.exports = router