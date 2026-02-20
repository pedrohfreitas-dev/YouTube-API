
import { pool } from '../../../mysql.js'
import { v4 as uuidv4 } from 'uuid'
import { hash, compare } from 'bcrypt'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'


class UserRepository { 
    async create(request: Request, response: Response) {
        try {
            const { name, email, password } = request.body
            const id = uuidv4()

            const hashedPassword = await hash(password, 10)

            await pool.query(
                'INSERT INTO users (user_id,name,email,password) VALUES (?,?,?,?)',
                [id, name, email, hashedPassword]
            )

            return response.status(201).json({
                id,
                name,
                email
            })

        } catch (error: any) {
            return response.status(400).json({
                error: error.message
            })
        }
    }

    async login(request: Request, response: Response) {
        const { email, password } = request.body

        try {
            const [results]: any = await pool.query(
                'SELECT * FROM users WHERE email = ?',
                [email]
            )

            if (results.length === 0) {
                return response.status(404).json({ message: 'User not found' })
            }

            compare(password, results[0].password, (error, result) => {
                if (error) {
                    return response.status(400).json({ error: 'Error comparing passwords' })
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            userId: results[0].user_id,
                            email: results[0].email
                        },
                        process.env.JWT_SECRET as string, { expiresIn: '1d' }

                    )

                    return response.status(200).json({ token: token, message: 'Authenticated with success' })

                }
            })

        } catch (error) {
            return response.status(400).json(error)
        }
    }

}

export { UserRepository }