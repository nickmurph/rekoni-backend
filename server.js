const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');

const credentials = require('./credentials.js');
const register = require('./controllers/register.js')
const signin = require('./controllers/signin.js')
const profile = require('./controllers/profile.js')
const image = require('./controllers/image.js')


//connect to postgreSQL DB via Knex
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      port: 5432,
      password : credentials.pgpass, //password stored in .gitignored file credentials.js
      database : 'rekoni'
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
// const PORT = process.env.PORT
const PORT = 3000
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
});
