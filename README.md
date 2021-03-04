# BANKA 🏦💵🏧💳
> Banka is a light-weight core banking application that powers banking operations like account creation, transfer, customer deposit and withdrawals. This app is meant to support a single bank, where users can signup and create bank accounts online, but must visit the branch to withdraw or deposit money

> Key Features:  
1. User: 
  - User (client) can view account transaction history
  - User (client) can view a specific account transaction.
  - User (client) can create an account
  - User can transfer money
  - Integrated real time email notification upon credit/debit transaction on user account

2. Admin:
  - Admin/staff can view all user accounts.
  - Admin/staff can view a specific user account.
  - Admin/staff can activate or deactivate an account.
  - Admin/staff can delete a specific user account.
  

## Admin Data
> email: johndoe@kudi.com
password: Admin_01


## Getting Started

> [UI Templates](#ui-templates) &middot; [Technologies](#technologies-used) &middot; [Installations](#installations) &middot; [API Endpoints](#api-endpoints) &middot; [Author](#author)

---

## UI Templates

UI templates for the application can be found on vercel [https://banka-ui.vercel.app/](https://banka-ui.vercel.app/).

---

## Heroku App

Application was deployed to Heroku. Use public URL [https://banka-api.herokuapp.com/](https://banka-api.herokuapp.com/) with API endpoints.

---

## Technologies Used
[node]: (https://nodejs.org)
- Bank-end
  - [Node.js](https://nodejs.org) A run time environment based off Chrome's v8 Engines for writing Javascript server-side applications.
  - [Express.js](https://sailsjs.com/) - Sails is the most popular MVC framework for Node.js, designed to emulate the familiar MVC pattern of frameworks like Ruby on Rails, but with support for the requirements of modern apps: data-driven APIs with a scalable, service-oriented architecture.
  - [Sequelize](https://sequelize.org/) - Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.
  - [ESLint](https://eslint.org/) - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
  - [Airbnb](https://www.npmjs.com/package/eslint-config-airbnb) style guide was followed.

- Front-end
  - [React.js](https://reactjs.org/) - React is an open-source, front end, JavaScript library for building user interfaces or UI components.
  - [Redux](https://redux.js.org/) - Redux is an open-source JavaScript library for managing application state.
  - [Tailwind CSS](https://tailwindcss.com/) - Tailwind UI is a collection of beautiful, fully responsive UI components 
---

## Installations

#### Getting started

- You need to have Node and Sails installed on your computer.
- Install [Node](https://nodejs.org).

#### Clone

- clone BANKA UI
    ```shell
    $ git clone https://github.com/RIDUMATICS/Banka-UI.git
    ```
- clone BANKA API
    ```shell
    $ git clone https://github.com/RIDUMATICS/Banka.git
    ```
#### Setup (API)

- Installing the project dependencies
  > Run the command below
  ```shell
  $ npm install
  ```
- Start your express server
  > run the command below
  ```shell
  $ npm run dev
  ```

#### Setup (UI)

- Installing the project dependencies
  > Run the command below
  ```shell
  $ npm install
  ```
- Start your sails server
  > run the command below
  ```shell
  $ npm start
  ```
## Author

- [Ridwan Onikoyi](https://github.com/RIDUMATICS) 
