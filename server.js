const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controller/Register');
const signin = require('./controller/Signin');
const profile = require('./controller/Profile');
const image = require('./controller/Image');

const db = knex({
    client : 'pg',
    connection : {
        host: '127.0.0.1',
        user : 'postgres',
        password : 'Trichy123',
        database : 'postgres'
    }
})


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send(database.users)});
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageUrl', (req, res) => {image.handleImageAPI(req, res)})

const PORT = process.env.PORT;
app.listen(PORT || 5000, () => {
    console.log(`App is running on ${PORT}`)
})