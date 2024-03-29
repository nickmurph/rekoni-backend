//packages
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');
const dotenv = require('dotenv');

//controllers for API endpoints
const register = require('./controllers/register.js')
const signin = require('./controllers/signin.js')
const profile = require('./controllers/profile.js')
const image = require('./controllers/image.js')



//initialize dotenv to read local .env
//access via process.env.VARIABLENAMEHERE
dotenv.config();

//establish env variables
const PGPASS = process.env.PGPASS;
const DB_URL = process.env.DB_URL;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;


//connect to postgreSQL DB via Knex
const db = knex({
    client: 'pg',
    connection: {
      connectionString: DB_URL,
      ssl: { rejectUnauthorized: false },
      host : DB_HOST,
      user : DB_USER,
      port: 5432,
      password : PGPASS,
      database : DB_NAME
    }
  });



//middleware
app.use(cors());
app.use(express.json());


//routes
app.get('/', (req,res) => {res.send(db.users)})
app.post('/signin', (req,res) => {signin.handleSignIn(req,res,db,bcrypt)})
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id', (req,res) => {profile.handleProfile(req,res,db)})
app.put('/image', (req,res) => {image.handleImage(req,res,db)})
app.post('/imageURL', (req,res) => {image.handleApiCall(req,res)})


//listen on assigned port
app.listen(process.env.PORT || 3000, () => {
    console.log(`app running on port ${process.env.PORT}`)
});
