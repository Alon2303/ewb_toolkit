import pkg from 'pg';
import { v4 as uuidv4 } from 'uuid';

const { Client } = pkg;

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

const SCHEMA_NAME = "volunteer"
const TABLE_NAME = "volunteer";

export const connect = async () => {
    console.log('connecting...');
    await client.connect();
    console.log('connected');
}

export const createSchema = async () => {
    try {
        await client.query(`CREATE SCHEMA IF NOT EXISTS ${SCHEMA_NAME}`)
    } catch (error) {
        console.log(`Failed to create schema: ${error}`);
        client.end();
    }
};

export const createTable = async () => {
    try {
        await client.query(
            `CREATE TABLE IF NOT EXISTS ${SCHEMA_NAME}.${TABLE_NAME} (
            v_uid varchar(255) primary key, \
            heb_full_name varchar(255) not null, \
            eng_full_name varchar(255) not null, \
            email varchar(255) unique not null, \
            gender varchar(255), \
            role varchar(255), \
            team varchar(255), \
            faculty varchar(255), \
            department varchar(255), \
            year varchar(255),\
            since int,\
            phone varchar(255))`
        );
    } catch (error) {
        console.log(error);
        await client.end();
    }
}

export const populatedata = async (volunteersData) => {
    try {
        const volunteersPromise = [];
        for(const volunteer of volunteersData) {

            if(typeof volunteer["תאריך הצטרפות לארגון"] === "string") volunteer["תאריך הצטרפות לארגון"] = new Date(volunteer["תאריך הצטרפות לארגון"]).getFullYear();
    
            volunteersPromise.push(client.query(`INSERT INTO ${SCHEMA_NAME}.${TABLE_NAME}
            (v_uid, heb_full_name, eng_full_name, email, gender, "role", team, faculty, department, "year", since, phone)
            VALUES(
                '${uuidv4()}',
                '${volunteer["שם מלא בעברית"]}',
                '${volunteer["שם מלא באנגלית"]}',
                '${volunteer["כתובת מייל"]}',
                '${volunteer["מין"]}',
                '${volunteer["תפקיד בעמותה"]}',
                '${volunteer["צוות"]}',
                '${volunteer["פקולטה"]}',
                '${volunteer["מחלקה"]}',
                '${volunteer["שנה בתואר"]}',
                '${volunteer["תאריך הצטרפות לארגון"]}',
                '${volunteer["מספר טלפון"]}')`)
            );
        }
        const res = await Promise.allSettled(volunteersPromise);
        await client.end();
        console.log(JSON.stringify(res, null, 2));
    } catch (error) {
        console.log(error);
        await client.end();
    }
}