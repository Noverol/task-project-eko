import mongoose from 'mongoose';

const StatsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: String, // YYYY-MM-DD
    required: true,
  },
  tasksCompleted: {
    type: Number,
    default: 0,
  },
  xpEarned: {
    type: Number,
    default: 0,
  },
  mood: {
    type: String, // Emoji or key
  },
  hourlyActivity: {
    type: Map,
    of: Number, // Hour (0-23) -> Tasks Completed
    default: {},
  },
}, { timestamps: true });

export default mongoose.models.Stats || mongoose.model('Stats', StatsSchema);
