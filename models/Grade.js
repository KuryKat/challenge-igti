import mongoose from 'mongoose'

export const Grade = mongoose.model(
    'grade',
    mongoose.Schema({
        name: {
            type: String,
            require: true,
        },
        subject: {
            type: String,
            require: true,
        },
        type: {
            type: String,
            require: true,
        },
        value: {
            type: Number,
            require: true,
            default: 0,
        },
        lastModified: {
            type: Date,
            require: true,
            default: new Date(),
        },
    }),
    'student'
)
