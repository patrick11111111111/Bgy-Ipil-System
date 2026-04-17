import mongoose from 'mongoose';
import User from './models/User.js';

const check = async () => {
  try {
    await mongoose.connect('mongodb://admin:admin@ac-k615cpv-shard-00-00.ulqf1ai.mongodb.net:27017,ac-k615cpv-shard-00-01.ulqf1ai.mongodb.net:27017,ac-k615cpv-shard-00-02.ulqf1ai.mongodb.net:27017/?ssl=true&replicaSet=atlas-h5pxv5-shard-0&authSource=admin&retryWrites=true&w=majority');
    const users = await User.find({});
    console.log('Users in cloud DB:', users.map(u => ({ username: u.username, role: u.role })));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

check();
