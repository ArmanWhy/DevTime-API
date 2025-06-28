import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'


export const register = async (req, res) => {
    try {
        const { name, email, password, timezone, workingHours } = req.body
        const existing = await User.findOne({ email })
        if(existing) return res.status(400).json({ message: 'Email already registered'})

        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({ name, email, password: hashPassword, timezone, workingHours })
        await user.save()

        res.status(201).json({ message: 'User registered successfully'})
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message})
    }
}

export const login = async (req, res) => {
    try {
        const { email, password} = req.body
        const user = await User.findOne({ email })
        if(!user) return res.status(401).json({ message:'Invalid Credentials' })
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(401).json({ message: 'Invalid Credentials'})
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d'})

        res.json({ token, user: { id: user._id, name: user.name, email: user.email}})
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message})
    }
}