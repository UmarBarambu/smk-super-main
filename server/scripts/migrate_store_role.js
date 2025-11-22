// Simple one-time migration script to rename role value
// Usage: node scripts/migrate_store_role.js

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';

dotenv.config();

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/smk';

async function run() {
  await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to DB');

  const res = await User.updateMany({ role: 'cooperation_store_admin' }, { $set: { role: 'store_admin' } });
  console.log('Migration result:', res);

  await mongoose.disconnect();
  console.log('Disconnected');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
