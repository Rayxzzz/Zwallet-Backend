# Zwallet

This is Backend for Zwallet App.


## Built With

- [Node.js]
- [Mysql]
- [Express.js]
- [Socket.io]


## Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Rayxzzz/Zwallet-Backend.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start the Application
   ```sh
   npm start
   ```

## Additional

    This project has been deployed on heroku
> [HEROKU LINK](https://zwallet-ridho.herokuapp.com/)



## API Endpoint

auth endpint

    POST    auth/login
    POST    auth/register


user endpoint

    GET     /user/
    GET     /user/:id
    GET     /user/balance
    GET     /user/transaction/history
    GET     /user/transaction/historySuccess
    GET     /user/transaction/:invoice
    PUT     /user/profile
    PUT     /user/profile/pin
    PUT     /user/profile/phone
    PUT     /user/top-up
    PUT     /user/transaction/:invoice
    POST    /user/transaction
    DELETE  /user/:id/transaction/:invoice/c