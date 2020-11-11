import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { gradeRouter } from './routes/gradeRouter.js'

import { db } from './models/index.js'
;(async () => {
    try {
        await db.mongoose.connect(db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connected to MongoDB!')
    } catch (error) {
        console.log('Erro ao conectar no MongoDB: ' + error.message)
        process.exit()
    }
})()

const app = express()

//define o dominio de origem para consumo do servico
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
    cors({
        origin: 'http://localhost:3001',
    })
)

app.use('/grade', gradeRouter)

app.get('/', (_, res) => {
    res.send('API em execucao')
})

app.listen(process.env.PORT || 8081, console.log('API Started!'))
