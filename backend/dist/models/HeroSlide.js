import mongoose from 'mongoose';
const heroSlideSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: '',
    },
    subtitle: {
        type: String,
        default: '',
    },
    order: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });
export default mongoose.model('HeroSlide', heroSlideSchema);
//# sourceMappingURL=HeroSlide.js.map