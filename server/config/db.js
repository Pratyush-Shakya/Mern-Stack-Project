let mongoose;
try {
  mongoose = require('mongoose');
} catch (e) {
  mongoose = null;
}

let isConnected = false;

const connectDB = async () => {
  if (!mongoose) {
    console.log('[Database Notice] Mongoose package not yet installed. Running in-memory store mode.');
    return null;
  }

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hangman_db';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });

    isConnected = true;
    console.log(`===============================================`);
    console.log(` MongoDB Connected: ${conn.connection.host}`);
    console.log(` Database Name: ${conn.connection.name}`);
    console.log(`===============================================`);
    return conn;
  } catch (error) {
    console.warn(`\n[MongoDB Notice]: Could not connect to MongoDB at ${uri}`);
    console.warn(`Reason: ${error.message}`);
    console.log(`[Mode]: Using high-speed in-memory store for active session.\n`);
    isConnected = false;
    return null;
  }
};

const getDBStatus = () => {
  if (!mongoose || !mongoose.connection) {
    return { isConnected: false, mode: 'In-Memory Storage', host: 'Local Node Memory' };
  }
  return {
    isConnected: mongoose.connection.readyState === 1,
    mode: mongoose.connection.readyState === 1 ? 'MongoDB / Atlas' : 'In-Memory Store',
    host: mongoose.connection.host || 'Not connected',
    name: mongoose.connection.name || 'None'
  };
};

module.exports = {
  connectDB,
  getDBStatus
};
