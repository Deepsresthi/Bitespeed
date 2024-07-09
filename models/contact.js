import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: false },
  email: { type: String, required: false },
  linkedId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: false,
  },
  linkPrecedence: {
    type: String,
    enum: ['primary', 'secondary'],
    default: 'primary',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, required: false },
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
