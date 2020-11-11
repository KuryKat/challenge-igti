import express from 'express'
import controller from '../controllers/gradeController.js'

const app = express.Router()

app.post('/', controller.create)
app.get('/', controller.findAll)
app.get('/:id', controller.findOne)
app.put('/:id', controller.update)
app.delete('/:id', controller.remove)
app.delete('/', controller.removeAll)

export { app as gradeRouter }
