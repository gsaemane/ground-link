import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET)
    throw new Error('JWT_SECRET is not set in environment variables');
export const generateToken = (user) => {
    const payload = {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
    };
    // Cast the options or the specific variable to string
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: (process.env.JWT_EXPIRES_IN || '1h'),
    });
};
export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
//# sourceMappingURL=auth.js.map