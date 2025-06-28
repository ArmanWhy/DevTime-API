import express from 'express'
import { getProfile, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js'
import { verifyToken } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/me', verifyToken, getProfile)
router.get('/', verifyToken, getAllUsers);
router.get('/:id', verifyToken, getUserById);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);

export default router