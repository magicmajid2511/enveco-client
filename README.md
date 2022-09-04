# Project Name
ENVECO - environment economy
<br>



## Description

Sharing economy, where you can rent out your car while it standing. It's better for the enviroment to share than to fear.



<br>

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **Homepage** - As a user I want to be able to access the homepage, search for cars, look at the price and make a request. 
- **Sign up** - As a user I want to sign up on the web page so that I can make a request to either rent a car or rent out my car.
- **Login** - As a user I want to be able to log in on the web page so that I can get back to my account and make updates.
- **Logout** - As a user I want to be able to log out from the web page so that I can make sure no one will access my account.
- **Edit user** - As a user I want to be able to edit my profile.
- **Result** - As a user I want to see the list of cars and make a request.
- **Cars listing** - As a user i want to view all the cars avaliable



<br>



## Server Routes (Back-end):



| **Method** | **Route**                          | **Description**                                              | Request  - Body                                          |
| ---------- | ---------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `GET`      | `/`                                | Main page route.  Renders home `index` view.                                                                                                       
| `GET`      | `/getallcars`                      | Returns all the cars in the database.
| `POST`     | `/addcar`                      | Create cars form data to the server.                          | { type,information} 
| `POST`      | `/editcar`                      | Edit Car details of your added car                         |   { id}
| `POST`      | `/deletecar`                      |  Delete a car by id                                      | {id} 
| `POST`      | `/bookcar  `                      |  Book a car                                            | { email} 
| `POST`      | `/userRentals  `                      |Show all rentals of a particular user. | { email,id} 

| `POST`     | `/register`                          | Sends Sign Up info to the server and creates user.  | {Firstname, Surname, email, password}  
| `POST`     | `/login`                           | Sends Login form data to the server.                         | { email, password }




## Models

Rental model

```javascript
  {
    car: { type: mongoose.Schema.Types.ObjectId, ref: "cars" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    bookedTimeSlots: {
      from: { type: String },
      to: { type: String },
    },
    totalHours: { type: Number },
    totalAmount: { type: Number },
    transactionId: { type: String },
    driverRequired: { type: Boolean },
  },
  { timestamps: true }
);


```
Car model

```javascript
 {
    user: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    countryName: { type: String, required: true },
    stateName: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    capacity: { type: Number, required: true },
    fuelType: { type: String, required: true },
    bookedTimeSlots: [
      {
        from: { type: String, required: true },
        to: { type: String, required: true },
      },
    ],
    rentPerHour: { type: Number, required: true },
  },
  { timestamps: true }
);

```
Auth model

```javascript
  username: { type: String, required: true },
  password: { type: String, required: true },
```


<br>
 

## Packages
 ### Nodemailer

<br>

## Api
 ### Stripe API
 ### Google Maps API

<br>



## Links



### Git

The url to your repository and to your deployed project

[[Repository Link](https://github.com/magicmajid2511/enveco-client)]

[[Deployed Project Link](https://enveco-final.netlify.app/)]



<br>



### Slides

The url to your presentation slides

[Slides Link]()

### Contributors
Matulan Mahenthra - [`<github-Matulan>`](https://github.com/Matulan) - [`<linkedin-profile-link>`](www.linkedin.com/in/matulan-mahenthra)

Majid Boukachni - [`<github-username>`](https://github.com/magicmajid2511) - [`<linkedin-profile-link>`](www.linkedin.com/in/majid-boukachni)
