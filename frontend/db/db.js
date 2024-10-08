import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'db', // nombre del servicio MySQL en docker-compose
  user: 'trevolt',
  password: 'gb&176dBC!',
  database: 'cotizador',
});

export default pool;
