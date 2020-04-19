import { Client } from 'pg';
import { config } from '../../config';

export const connection = new Client({
    // connectionString: process.env.DATABASE_URL,
    connectionString: config.databaseUrl,
    ssl: true,
});
connection.connect();

// change to ending connections and persisting the pool, add logging, look into oAuth2

exports.default = connection;
