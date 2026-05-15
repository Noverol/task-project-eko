import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    default: 'Astra User',
  },
  xp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 1,
  },
  streak: {
    type: Number,
    default: 0,
  },
  bio: {
    type: String,
    default: 'Digital minimalist and task conqueror.',
  },
  avatarUrl: {
    type: String,
    default: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Astra',
  },
  themeColor: {
    type: String,
    default: '#0ea5e9',
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
  badges: [
    {
      name: String,
      icon: String,
      awardedAt: { type: Date, default: Date.now },
    },
  ],
  categories: [
    {
      name: String,
      color: String,
    },
  ],
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
