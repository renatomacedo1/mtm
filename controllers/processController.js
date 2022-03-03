const Processo = require('../models/Process')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const getAllProcessos = async (req, res) => {
    const processos = await Processo.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({processos, count: processos.length})
}

const getProcesso = async (req, res) => {
    const {
      user: { userId },
      params: { id: processoId },
    } = req
  
    const processo = await Processo.findOne({
      _id: processoId,
      createdBy: userId,
    })
    if (!processo) {
      throw new NotFoundError(`No processo with id ${processoId}`)
    }
    res.status(StatusCodes.OK).json({ processo })
  }

const createProcesso = async (req, res) => {
    req.body.createdBy = req.user.userId
    const processo = await Processo.create(req.body)
    res.status(StatusCodes.CREATED).json({ processo })
  }

const updateProcesso = async (req, res) => {
    const {
        body:{company, position}, 
        user:{userId}, 
        params:{id:processoId}
    } = req

    if(company === '' || position === ''){
        throw new BadRequestError('Company and position fields can not be empty')
    }

    const processo = await Processo.findByIdAndUpdate(
        {_id:processoId, creadedBy:userId}, 
        req.body, 
        {new:true, runValidators:true}
        )

    if(!processo){
        throw NotFoundError(`No processo with id ${processoId}`)
    }

    res.status(StatusCodes.OK).json({ processo })

}

const deleteProcesso = async (req, res) => {
    const {user:{userId}, params:{id:processoId}} = req

    const processo = await Processo.findOneAndRemove({
        _id:processoId,
        createdBy:userId
    })

    if(!processo){
        throw NotFoundError(`No processo with id ${processoId}`)
    }

    res.status(StatusCodes.OK).send()

}

module.exports = {
    getAllProcessos, getProcesso, createProcesso, updateProcesso, deleteProcesso
}