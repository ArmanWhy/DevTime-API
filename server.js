import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import userRoutes from './routes/user.js';


dotenv.config()

const app = express()

//middleware
app.use(cors())
app.use(express.json())

//simple test route

app.get('/', (req, res)=>{
    res.send('DevTime API is running...')
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/user', userRoutes);

//DB connection

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MonogoDB connected')
        app.listen(process.env.PORT, () =>{
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    })
    .catch((error) => console.log(error))