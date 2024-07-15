import { model, Schema } from 'mongoose';
import { hash } from 'bcrypt';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function (next) {
  const code = await hash(this.password, 10);
  this.password = code;

  next();
});

// Remover a senha na saída JSON
// userSchema.methods.toJSON = function () {
//   const obj = this.toObject();
//   delete obj.password;
//   return obj;
// };
export const User = model('User', userSchema);
