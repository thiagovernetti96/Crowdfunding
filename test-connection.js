require('dotenv').config();
const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL;

console.log('Testando conexão com:', connectionString?.replace(/:[^:@]+@/, ':****@'));

const client = new Client({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => {
    console.log('✅ Conexão bem-sucedida!');
    return client.query('SELECT current_database(), version()');
  })
  .then((result) => {
    console.log('Database:', result.rows[0]);
    return client.end();
  })
  .catch((error) => {
    console.log('❌ Erro na conexão:', error.message);
    client.end();
  });