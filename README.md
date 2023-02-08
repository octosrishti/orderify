## orderify 
An application to create order and view orders

## Frontend

client folder serves as the frontend created using Reactjs  and tailwindcss

1)Login Page - user with an account can login into the application 
2)Sign up Page - user without and account has to sign up sending the POST request to server 
3)Home - when the user is verified they can create new orders from the home page and also view all the orders with description, phone number and total amount of the order

## Server

Backend for the application build using Nodejs, Express and MongoDB  as the database

# API's 

**Orders API's**
All the order API's have a middleware for token authenntication 

1) create new order - creates new order

        url : https://orderify.onrender.com/order
        method : POST,
        headers : {
            content-type : "application/json,
            authorization : access_token
        }
        body : {
            description : order description,
            sub_total: total amount of the order.
            user_id: user that created the order.
            phone_number : phone number of the person who will receive the order
        }

2) get orders - returns all the orders of the user

        url : https://orderify.onrender.com/orders
        method : GET,
        headers : {
            content-type : "application/json,
            authorization : access_token
        }

**AUTH API's**
Handle all the authentication logic for the server and writes it into the database

1)Login user -

        url : https://orderify.onrender.com/login
        method : POST,
        headers : {
            content-type : "application/json
        }
        body : {
            email: email for the user.
            password: password,
        }

2)Sign up user -

        url : https://orderify.onrender.com/signup
        method : POST,
        headers : {
            content-type : "application/json
        }
        body : {
            email: email for the user.
            password: password,
            phone_number: phone number of the person
        }

# Database

MongoDB is a nosql database used here for saving all the data that has 2 table **USER** and **ORDER** with **_id** as primary key.
