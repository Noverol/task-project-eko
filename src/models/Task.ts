import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: ['Work', 'Personal', 'Urgent'],
    default: 'Personal',
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
  status: {
    type: String,
    enum: ['Todo', 'In-Progress', 'Done'],
    default: 'Todo',
  },
  dueDate: {
    type: Date,
  },
  xpValue: {
    type: Number,
    default: 10,
  },
  completedAt: {
    type: Date,
  },
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
