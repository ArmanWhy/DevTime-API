import User from "../models/User.js";

export const getProfile = async (req, res) => {
    try {
        const users = await User.findById(req.userId).select('-password')
        res.json({ message:'All Users are fetched successfully', users })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message })
    }
}
// Get all users (public team list)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ message: 'All Users Displayed here', users });
  } catch (err) {
    res.status(500).json({ message: "Failed to get users", error: err.message });
  }
};

//get one user by Id

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password')
        if(!user) return res.status(404).json({ message: 'User not found by Id'})
        res.json({ message: 'User fetched by Id successfully', user })
    } catch (err) {
        res.status(500).json({ message: "Error", error: err.message })
    }
}

// Update user's timezone/working hours

export const updateUser = async (req, res) => {
    try {
        const { timezone, workingHours } = req.body
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { timezone, workingHours },
            { new: true, runvalidators: true }
        ).select('-password')

        if(!user) return res.status(404).json({ message: 'User not found'})
        res.json({message: 'User Updated Successfully', user})
    } catch (error) {
        res.status(500).json({ message: "Update failed", error: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdandDelete(req.params.id)
        if(!user) return res.status(404).json({ message: 'User not found' })
        res.json({ message: 'User deleted successfully', user })
    } catch (error) {
        res.status(500).json({ message: "Delete failed", error: error.message })
    }
}