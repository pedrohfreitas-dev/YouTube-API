import { pool } from '../../../mysql.js'
import { v4 as uuidv4 } from 'uuid'
import { Request, Response } from 'express'


class VideosRepository {
    async create(request: Request, response: Response) {
        try {
            const { user_id, title, description } = request.body
            const id = uuidv4()

            await pool.query(
                'INSERT INTO videos (video_id, user_id, title, description) VALUES (?,?,?,?)',
                [id, user_id, title, description]
            )

            return response.status(201).json({
                message: 'Video created successfully',
            })

        } catch (error: any) {
            return response.status(400).json({
                error: error.message
            })
        }
    }

    async getVideos(request: Request, response: Response) {
        const { user_id } = request.body
        try {
            const [videos]: any = await pool.query(
                'SELECT * FROM videos WHERE user_id = ?',
                [user_id]
            )

            if (videos.length === 0) {
                return response.status(404).json({ message: 'Videos not found' })
            }

            return response.status(200).json({ videos })

        } catch (error) {
            return response.status(400).json(error)
        }
    }

    async searchVideos(request: Request, response: Response) {
        const { search } = request.query
        try {
            const [videos]: any = await pool.query(
                'SELECT * FROM videos WHERE title LIKE ?',
                [`%${search}%`]
            )

            return response.status(200).json({ videos })

        } catch (error) {
            return response.status(400).json(error)
        }
    }
}

export { VideosRepository }