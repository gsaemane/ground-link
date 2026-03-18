import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    name: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
}, { timestamps: true });
// Modern pre-save hook (Mongoose 9+ style) — NO next() parameter
userSchema.pre('save', async function () {
    // 'this' is correctly typed as HydratedDocument<IUser>
    if (!this.isModified('password')) {
        return; // No next() needed — just return to continue
    }
    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        // No next() call — the promise resolution lets Mongoose proceed
    }
    catch (err) {
        // If you throw here, Mongoose will reject the save operation
        throw err;
    }
});
// Method remains the same
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};
const User = mongoose.model('User', userSchema);
export default User;
//# sourceMappingURL=User.js.map