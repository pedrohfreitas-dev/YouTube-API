import jwt from 'jsonwebtoken'


const login = (req:any , res:any, next:any) => {
    try {
        const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET as string)
        req.user = decode
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
}

export default login