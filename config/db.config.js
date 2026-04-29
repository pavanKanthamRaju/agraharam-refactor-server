import spabasedb from './spabasedb.js';
import db from './db.js';

let dbConnection;

if (process.env.NODE_ENV === 'production') {
  // Use the Supabase adapter in a production environment
  dbConnection = spabasedb;
  console.log("Database connection: Supabase (Production)");
} else {
  // Default to the local pg Pool for development
  dbConnection = db; 
  console.log("Database connection: Local PostgreSQL (Development)");
}

export default dbConnection;