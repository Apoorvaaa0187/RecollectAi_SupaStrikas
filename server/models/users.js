import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: { type: 'string', required: true },
    email: { type: 'string', required: true },
    password: { type: 'string', required: true }
});
const Users = mongoose.model('Users', userSchema);
export default Users;