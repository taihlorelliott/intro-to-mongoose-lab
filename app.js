const dotenv = require('dotenv');
dotenv.config()

const prompt = require('prompt-sync')();

const mongoose = require("mongoose")
console.log(process.env.MONGODB_URI)

const Customer = require('./model/customer.js')

const username = prompt('What is your name? ');
console.log(`Your name is ${username}`)

const connect 