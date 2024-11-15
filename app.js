const dotenv = require('dotenv');
dotenv.config()

const prompt = require('prompt-sync')();

const mongoose = require("mongoose")
console.log(process.env.MONGODB_URI)

const Customer = require('./model/customer.js')

// connecting mongoDB to app.js
const connect = async () => {
    // Connect to MongoDB using the MONGODB_URI specified in our .env file.
    await mongoose.connect(process.env.MONGODB_URI);
    // console.log('Welcome to the CRM!');
}

connect()

//creating a customer function
async function createCustomer() {
    const name = prompt("Enter customer's name: ");
    const age = parseInt(prompt("Enter the customer's age: "), 10) //converts a string entered to a number

    //establishing the new customer info
    const newCustomer = new Customer({name, age});
    await newCustomer.save();
    console.log("Customer created yay!")
}

//view customers function
async function viewCustomer() {
    const customers = await Customer.find();
    if (customers.length === 0) {
        console.log("No customers found.");
    } else {
        customers.forEach((customer) => {
            console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
        });
    }
}

// update a customer function
async function updateCustomer(){
    const customers = await Customer.find();
    if (customers.length === 0) {
        console.log("No customers found.");
    return;
    } 
//display customer list
    console.log("Here are the current customers: ");
    customers.forEach((customer) => {
        console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
    })
//update prompt
    const customerId = prompt("Copy and paste the id of the customer you would like to update here: ");
    const customer = await Customer.findById(customerId);
//if customer id does not exist then console.log nah
    if (!customer) {
        console.log("Customer does not exist.")
        return;
    }
    const newName = prompt("What is the customers new name? ");
    const newAge = parseInt(prompt("what is the customer new age? "), 10); // chat gbt need parse int to convert to a number from string. also need ,10 to make a whole number

    customer.name = newName;
    customer.age = newAge;

    await customer.save();
    console.log("Customer updated! Woot!")
}

//function to delete a customer
async function deleteCustomer() {
    const customers = await Customer.find();
    if (customers.legnth === 0){
        console.log('No customers exist.')
        return;
    }
//display customer list
    console.log("Here are the current customers: ");
    customers.forEach((customer) => {
        console.log(`id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`);
    })

//delete prompt
    const customerId = prompt("Copy and paste the id of the customer you would like to delete here: ");
    const customer = await Customer.findByIdAndDelete(customerId);

//if customer id doesnt exist then nah
    if (!customer) {
        console.log("Customer does not exist.")
        return;
    }

    //delete message

    console.log("Yay customer deleted!");

}

//quit function
async function quit(){
    console.log("Quitting app.")
    mongoose.connection.close();
    process.exit();
    return;
}

// main menu async function 
async function mainMenu() {
    //welcome console moved here so it only displays once
    console.log ('Welcome to the CRM!');
    //looping 
    while (true) {
        
        console.log ('What would you like to do?')
        console.log ('1. Create a customer')
        console.log ('2. View all customers')
        console.log ('3. Update a customer')
        console.log ('4. Delete a customer')
        console.log ('5. Quit')
// prompt to have answer to question
        const answer = prompt('Select a number to run ');
        
// switch statement to process the different answers that could be
        switch (answer) {
            case "1":
                // console.log("number 1")
                await createCustomer();
                break;
            case '2':
                await viewCustomer();
                break;
            case '3':
                await updateCustomer();
                break;
            case '4':
                await deleteCustomer();
                break;
            case '5':
                await quit();
                break;
            default:
                console.log("This option is invalid, please try again.")
        }
    }
}


mainMenu();


// console.log("Welcome to the CRM")

// const todo = prompt('What would you like to do?');
// console.log ([
//     '1. Create', '2. View'
// ])
// console.log(`Your name is ${username}`)
//  did not work 



