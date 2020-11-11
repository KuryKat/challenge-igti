import { db } from '../models/index.js'
import { logger } from '../config/logger.js'

const create = async (req, res) => {
    const { name, subject, type, value } = req.body
    try {
        const newDocument = await new db.model({
            name,
            subject,
            type,
            value,
        }).save()
        res.send({ message: 'Grade inserido com sucesso' })
        logger.info(`POST /grade - ${JSON.stringify(newDocument)}`)
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Algum erro ocorreu ao salvar',
        })
        logger.error(`POST /grade - ${JSON.stringify(error.message)}`)
    }
}

const findAll = async (req, res) => {
    const { name } = req.query
    //condicao para o filtro no findAll
    let condition = name ? { name: { $regex: new RegExp(name, 'i') } } : {}
    try {
        const search = await db.model.find(condition)
        const results = search.map((result) => {
            const id = result._doc._id
            delete result._doc._id
            return { id, ...result._doc }
        })

        results.sort((a, b) => a.name.localeCompare(b.name))

        res.send(results)
        logger.info(`GET /grade`)
    } catch (error) {
        res.status(500).send({
            message: error.message || 'Erro ao listar todos os documentos',
        })
        logger.error(`GET /grade - ${JSON.stringify(error.message)}`)
    }
}

const findOne = async (req, res) => {
    const { id } = req.params
    try {
        const search = await db.model.findById(id, (err) => {
            err
                ? logger.error(
                      `GET /grade/:id - ${JSON.stringify(error.message)}`
                  )
                : logger.info(`GET /grade - ${id}`)
        })
        const newID = search._doc._id
        delete search._doc._id
        const result = { id: newID, ...search._doc }
        res.send(result)
    } catch (error) {
        res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id })
        logger.error(`GET /grade/:id - ${JSON.stringify(error.message)}`)
    }
}

const update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Dados para atualizacao vazio',
        })
    }

    const { id } = req.params
    try {
        await db.model.findByIdAndUpdate(id, req.body)
        res.send({ message: 'Grade atualizado com sucesso' })
        logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`)
    } catch (error) {
        res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id })
        logger.error(`PUT /grade - ${JSON.stringify(error.message)}`)
    }
}

const remove = async (req, res) => {
    const { id } = req.params

    try {
        await db.model.findByIdAndDelete(id, (err) =>
            err
                ? logger.error(err.message)
                : logger.info(`DELETE /grade - ${id}`)
        )
        res.send({ message: 'Grade excluido com sucesso - id: ' + id })
    } catch (error) {
        res.status(500).send({
            message: 'Nao foi possivel deletar o Grade id: ' + id,
        })
        logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`)
    }
}

const removeAll = async (req, res) => {
    try {
        await db.model.deleteMany({}, (err) =>
            err
                ? logger.error(err.message)
                : logger.info(`DELETE **ALL** /grade`)
        )
        res.send({ message: 'TODAS grades excluidas com sucesso!' })
    } catch (error) {
        res.status(500).send({ message: 'Erro ao excluir todos as Grades' })
        logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`)
    }
}

export default { create, findAll, findOne, update, remove, removeAll }
