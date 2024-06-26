import express from 'express';
import cors from "cors";
import pg from "pg";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";

const router = express();
dotenv.config();

// Setting the code to use cors as middleware and also use json to pass the body between the frontend and the backend
router.use(cors());
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Connecting to a postgres db
const db = new pg.Client({
  user: process.env.DB_USER,
  host: "localhost",
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});
db.connect();

// Login
router.post('/', async (req, res) => {
    const {user, password} = req.body;
    try {
        const response = await db.query('SELECT "hashedPassword" FROM "User" WHERE email = $1 OR number = $1', [
            user
        ]);
        try {
            // Comparing passwords
            const match = await bcrypt.compare(password, response);
            if (match) {
                res.status(200);
            } else {
                res.status(401);
            }
        } catch (err) {
            console.error('Incorrect Password', err)
        }
    } catch (err) {
        console.error('User does not exist', err);
    }
});

// Registering a user
router.post('/register', async (req, res) => {
    const {name, email, number, password} = req.body;
    const saltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        try {
            const response = await db.query('INSERT INTO "User" (name, email, number, "hashedPassword") VALUES ($1, $2, $3, $4)', [
                name, email, number, hashedPassword
            ]);
            res.status(201).json({ message: 'User registered successfully' });
        } catch (err) {
            console.error('Error insert in DB: ', err);
        }
    } catch (err) {
        console.error('Error Hashing password: ', err)
    }
});

// Fetching a random movie from the DB
router.get('/billboard', async (req, res) => {
    try {
        const response = await db.query('SELECT * FROM "Movies" ORDER BY RANDOM() LIMIT 1;');
        res.json(response.rows);
    } catch (err) {
        console.error('Error getting random movie from DB: ', err);
    }
});

// Fetching 20 random movie from the DB
router.get('/movieList', async (req, res) => {
    try {
        const response = await db.query('SELECT * FROM "Movies" ORDER BY RANDOM() LIMIT 20;');
        // console.log("Movies >>> ", response.rows)
        res.json(response.rows);
    } catch (err) {
        console.error('Error fetching movies from DB: ', err);
    }
});

const port = 3001
router.listen(port, () => {
    console.log(`Server listing on ${port}`);
});