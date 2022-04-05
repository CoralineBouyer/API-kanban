require('dotenv').config();

const express = require('express');
const router = require('./app/router');
const cors = require('cors');
const multer = require('multer');
// Multer nous permet de gérer le format de formData dans le front pour que le back le reconnaisse
const bodyParser = multer();

const port = process.env.PORT || 3000;

const app = express();

let corsOptions = {
   origin: '*',
   optionsSuccessStatus: 200
 }

app.use(bodyParser.none())
app.use(cors(corsOptions))
// Middleware pour faire du POST
app.use(express.urlencoded({ extended: true }));


app.use(router);


// Middleware de 404
router.use((req, res) => {
   res.status(404).json({
      error: '404 not found'
   });
});

app.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});