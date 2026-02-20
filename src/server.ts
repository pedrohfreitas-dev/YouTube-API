import { config } from 'dotenv'
import express from 'express'
import { userRoutes } from './routes/user_routes.js'
import { videoRoutes } from './routes/video_routes.js'


config() // Carrega as variáveis de ambiente do arquivo .env
const app = express()

app.use(express.json())
app.use('/user', userRoutes) 
app.use('/videos', videoRoutes) 

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
