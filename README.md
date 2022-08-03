# Labpro Selection Frontend

> This app is developed by Malik Akbar Hashemi Rafsanjani (13520105), intended for Labpro selection. This app is frontend part. Spesification for this app can be looked at [here](https://docs.google.com/document/u/3/d/e/2PACX-1vTXfRSh4yLUKN8n0cyRYWwZVF5hvNYPoj-wvOs35dQnrE3iclnVYUx9kUAq0-cZdXztN1nLKGgjBbAa/pub)

## How to Run
- Change API_URL to: `http://localhost:5000` in `src\configs\index.ts`
- Steps for running this app are described below:
  ```
  yarn install
  yarn dev
  ```
- Notes:
  - This app is developed in Windows environtment

## Usage

- After seeding, you can use this account as admin:
  ```
  username: malikrafsan
  password: ini-password
  ```
- Login and see all users in "Admin" > "Find User" section
- You can log out and use other users by their username on that section. All generated users' passwords are "password"

## Basic Functionalities

1. Users are divided into 2 types, namely customers and admins
2. The system provides a login page. Login pages for customers and admins are not distinguished. Unverified customers will fail if they log in.
3. The system can only register new customers. The minimum data required are as follows: name, username, password, photo ID card.
   - After registering, the admin will verify the customer account.
4. Customers can submit requests for addition or reduction in balance.
   - After submitting a request, the admin can approve or reject the request.
   - The nominal request can be in any currency. However, the balance recorded in the system remains in rupiah.
   - Every request made by the customer will be recorded in the customer history.
5. Customers can transfer money to other customers.
   - The transfer amount can be in any currency. However, the balance recorded in the system remains in rupiah.
   - Every transfer made by the customer will be recorded in the customer history
6. Customers can view their transaction history (either request to add or subtract balance, or transfer). History have pagination.
7. Pagination is frontend side.

## Bonus and Extended Functionalities

1. This app is deployed on [vercel](https://labpro-selection-fe-app.vercel.app) (for frontend) and [heroku](https://docker-prisma-express-ts-app.herokuapp.com/) (for backend)
2. This app has CI/CD setup for frontend and backend
   - Frontend: push to github branch main (vercel automatically redeploy the app)
   - Backend: push to heroku branch master [`git push heroku master`] (heroku automatically redeploy the app)
3. The interface is quite user-friendly and consistent
4. In the transfer feature, verify the destination account first. If the destination account is invalid, the balance transfer process cannot be carried out.
5. Using database transactions when making transfers.
6. Implementing more than 2 design patterns.
7. Using static regex for finding user based on username, name, and verification status (draft | verified | rejected). query is case insensitive

## Design Patterns
1. Singleton
    - The singleton pattern is used in the ApiSrv and AuthSrv classes. The singleton pattern here is done in quite a different way, but achieves the same thing, namely by exporting only instances of that class. This design pattern was chosen because the two classes only require one instance in one application. In addition, these classes will provide a shared global access point
2. Proxy
    - The proxy pattern is used in the ApiBoundary class. This class wraps the functionalities of the required axios and replaces the axios position. In addition, this class also controls access to axios, to allow doing something before and after requests and responses from axios.
3. Decorator
    - The pattern decorator is used in the ApiSrv class. This class wraps the ApiBoundary class and attaches additional functionalities. This class will slightly change the behavior of ApiBoundary by handling error and success, validating input, and providing mock data handling.
4. Facade
    - The facade pattern is used in the AuthSrv class. This class provides a simple and user-friendly interface, from localStorage and cookie objects, so that users of this class do not need to access the interface from localStorage and especially cookies which are not simple.


## Tech Stacks and Version

1. Next @12.1.6 and React @18.1.0
2. Bootstrap @^5.1.3 and React-Bootstrap @^2.4.0
3. Firebase @^9.9.0
4. Axios @^0.27.2

## Pages

1. `/auth/login` => login page [ALL]
2. `/auth/register` => register page [ALL]
3. `/` => home page [ADMIN / CUSTOMER]
4. `/profile` => profile page [CUSTOMER]
5. `/transfer/create` => create transfer page [CUSTOMER]
6. `/transfer/history` => transfer history page [CUSTOMER]
7. `/saldo-changes/create` => create request saldo changes [CUSTOMER]
8. `/saldo-changes/history` => saldo changes history page [CUSTOMER]
9. `/admin/verify-user` => verify user page [ADMIN]
10. `/admin/verify-saldo-changes` => verify saldo changes page [ADMIN]
11. `/admin/find-user` => find user page [ADMIN]

## Endpoints

1. GET '/' => check whether server is running [ALL]
2. GET '/users' => get all users [ADMIN ONLY]
3. GET '/user' => get current user [ADMIN / CUSTOMER]
4. POST '/login' => login to system and get JWT [ALL]
   - payload:
     - username: string
     - password: string
5. POST '/register' => register new account [ALL]
   - payload:
     - name: string
     - username: string
     - password: string
     - fotoKTP: string
     - urlFotoKTP: string
6. GET '/verify' => get all unverified users [ADMIN ONLY]
7. POST '/verify' => verify or reject draft user [ADMIN ONLY]
   - payload:
     - username: string
     - verified: boolean
8. POST '/transfer' => create new transfer [CUSTOMER ONLY]
   - payload:
     - username_dest: string
     - amount: number
     - currency: string
9. GET '/transfer' => get transfer histories [CUSTOMER ONLY]
10. GET '/saldo-changes' => get saldo changes history [CUSTOMER ONLY]
11. GET '/saldo-changes/requests' => get all draft requests [ADMIN ONLY]
12. POST '/saldo-changes' => create new saldo changes
    - payload:
      - currency: string
      - amount_source: number
13. PATCH '/saldo-changes/:id' => verify saldo changes [ADMIN ONLY]
    - payload:
      - verified: boolean
    - query params:
      - id: string
14. GET '/data/exchange-rates-symbols' => get all valid currencies
