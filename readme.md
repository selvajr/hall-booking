# GUVI - DAY 38

## Hall Booking Task.

### How to run the project on your machine:

1. clone the repository to your local machine.

```
git clone
```

2. To install all the dependencies:

```
npm i express
npm i nodemon --save-dev
npm i date-fns
```

3. Once everything is installed successfully, now it's time to run the server.

```
npm run dev
```

### Dependencies used

1. express

```
npm i express
```

2. nodemon

```
npm i nodemon --save-dev
```

3. date-fns

```
npm i date-fns
```

### Setup.

1. Run the following command to create a new project.

```
    npm init -y
    npm i express
    npm i nodemon --save-dev
    npm i date-fns
```

2. We create a javascript file named `index.js` which is the root of the project.

3. We change the `package.json` file to include start and dev parameter to make the script run from the command `npm run dev`.

### API endpoints

## Creating a Room

POST Method
endpoint: /createroom

## Booking a Room

POST Method
endpoint: /bookingroom

## List all Rooms

GET Method
endpoint: /allroomdetails

## List all customers

GET Method
endpoint: /customers

## List how many times a customer has booked the room

GET Method
endpoint: /customers/:customer

# Deployed URL

https://hall-booking-2mrf.onrender.com

# POSTMAN DOCUMENT URL

https://documenter.getpostman.com/view/34880027/2sA3XWdzJi
