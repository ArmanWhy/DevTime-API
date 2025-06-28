import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    timezone: { type: String, default: 'UTC' },
    workingHours: {
        start: { type: String, default: 9 },
        end: { type: Number, default: 17 }
    }
}, { timestamps:true })

export default mongoose.model('User', userSchema)