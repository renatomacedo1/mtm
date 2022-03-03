const Table = require('../models/Process')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllTables = async (req, res) => {
    const tables = await Table.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({tables, count: tables.length})
}

const getTable = async (req, res) => {
    const {
      user: { userId },
      params: { id: tableId },
    } = req
  
    const table = await Table.findOne({
      _id: tableId,
      createdBy: userId,
    })
    if (!table) {
      throw new NotFoundError(`No table with id ${tableId}`)
    }
    res.status(StatusCodes.OK).json({ table })
}

const createTable = async (req, res) => {
    req.body.createdBy = req.user.userId
    const table = await Table.create(req.body)
    res.status(StatusCodes.CREATED).json({ table })
}

const updateTable = async (req, res) => {
    const {
        body:{/*deveria ter aqui alguma coisa?*/}, 
        user:{userId}, 
        params:{id:tableId}
    } = req

  /*   if(company === '' || position === ''){
        throw new BadRequestError('Company and position fields can not be empty')
    } */

    const table = await Table.findByIdAndUpdate(
        {_id:tableId, creadedBy:userId}, 
        req.body, 
        {new:true, runValidators:true}
        )

    if(!table){
        throw NotFoundError(`No table with id ${tableId}`)
    }

    res.status(StatusCodes.OK).json({ table })

}

const deleteTable = async (req, res) => {
    const {user:{userId}, params:{id:tableId}} = req

    const table = await Table.findOneAndRemove({
        _id:tableId,
        createdBy:userId
    })

    if(!table){
        throw NotFoundError(`No table with id ${tableId}`)
    }

    res.status(StatusCodes.OK).send()

}

module.exports = {
    getAllTables, getTable, createTable, updateTable, deleteTable
}