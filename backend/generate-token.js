// generate-token.js
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('JWT_SECRET is not set in .env');
  process.exit(1);
}

const payload = {
  id: '67f123456789abcdef123456',     // fake user ID (replace with real one if you have it)
  email: 'admin@ground.link',
  role: 'admin'
};

const token = jwt.sign(payload, JWT_SECRET, {
  expiresIn: '1h'   // or '15m', '24h', etc.
});

console.log('Generated JWT token:');
console.log(token);
console.log('\nUse it in header:');
console.log(`Authorization: Bearer ${token}`);