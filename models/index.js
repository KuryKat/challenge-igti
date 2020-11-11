import mongoose from 'mongoose'
import { Grade } from './Grade.js'

const db = {}
db.mongoose = mongoose
db.url = process.env.MONGODB
db.model = Grade

export { db }
