# demo-credit

# Demo Credit

Demo Credit is a mobile lending app that requires wallet functionality. This is needed as borrowers need a wallet to receive the loans they have been granted and also send the money for repayments.

What Users can do:

 1. create an account
 2. fund their account
 3. transfer funds to another user’s account
 4. withdraw funds from their account.

 # Api Reference

## Getting Started
- Base Url: The Base Url of the project is live at  https://mukhtar-lendsqr-be-test.herokuapp.com/ 
- Authentication: Authentication token will be available on sign in and sign up of tenant
- Environment Variables: a sample of environment variables is available at ``` .env.example ``` file  

## Endpoints
> POST /signup

 General:
 - Registers as a user

> sample :  https://mukhtar-lendsqr-be-test.herokuapp.com/signup 

request sample

```
{
    "firstname":"john",
    "lastname":"doe" ,
    "username": "johndoe",
    "email":"johndoe@gmail.com",
    "password":"johndoe",
    "confirm_password": "johndoe"
}
```

response sample

```
{
    "status": true,
    "message": "New user created succesfully",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwiaWF0IjoxNjY1OTE5NTgzLCJleHAiOjE2OTc0NTU1ODN9.-pLbTcbkmGey1kTNOTENhqtkgeN5mtrM0GdflF_AY-Y"
}

```

> POST /signin

General:
 - signin as a user

 > sample : https://mukhtar-lendsqr-be-test.herokuapp.com/signin 

 request sample

 ```
{
   "email": "johndoe@gmail.com",
   "password": "johndoe"
}

 ```

 response sample

 ```
{
    "status": true,
    "message": "user signed in succesfully",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwiaWF0IjoxNjY1OTE4ODMzLCJleHAiOjE2NjU5MTg4MzN9.aG1qR2tQrj7Hg_MZYjQO7H9DVGuAhw_YZC6JfOikGV0"
}

 ```

 > POST /wallet/fund

 General:
 - Fund your wallet

 > sample : https://mukhtar-lendsqr-be-test.herokuapp.com/wallet/fund 

 request sample

 using ``` x-access-token ``` as key for header and the jwt token you get in either signin or signup i.e.

 ```
 
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwiaWF0IjoxNjY1OTE4ODMzLCJleHAiOjE2NjU5MTg4MzN9.aG1qR2tQrj7Hg_MZYjQO7H9DVGuAhw_YZC6JfOikGV0

 ```

```
{ 
 "amount": 10000
}

```

response sample

```
{
    "status": true,
    "message": "Wallet Funded successfully"
}

```

 > POST /wallet/tranfer
 General:
 - transfer funds to another demo credit user

 > sample : https://mukhtar-lendsqr-be-test.herokuapp.com/wallet/tranfer

 request sample

 ```
{
    "username": "lopsum",
    "amount": 30
}

 ```
response sample

```
{
    "status": true,
    "message": "Transferred successfully"
}

```

> get /wallet/withdraw

General:
 - Withdraw from wallet

 > sample : https://mukhtar-lendsqr-be-test.herokuapp.com/wallet/withdraw

request sample

 ```
 {
    "amount": 70
}

 ```
response sample

 ```
 {
    "status": true,
    "message": "withdrawal successful"
}

 ```

# E-R Diagram

<img src="./schema design.png">

