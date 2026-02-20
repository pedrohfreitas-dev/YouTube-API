import { Router } from "express";
import { VideosRepository } from "../modules/videos/repositories/VideosRepository.js";
import  login  from "../middleware/login.js";

const videoRoutes = Router()
const videoRepository = new VideosRepository()


videoRoutes.post('/create-video', login, (request, response) => {
  videoRepository.create(request,response)
})

videoRoutes.get('/get-videos', login ,(request, response) => {
  videoRepository.getVideos(request,response)
})

videoRoutes.get('/search', (request, response) => {
  videoRepository.searchVideos(request,response)
})


export { videoRoutes }