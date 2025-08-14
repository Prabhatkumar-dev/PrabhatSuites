# PrabhatSuites

PrabhatSuites is a Full Stack  hotel listing , Booking and reviewing web application built with Node.js, Express, and MongoDB. Users can browse hotel listings, view details, leave reviews, and manage their accounts.
 ##TechStack 
 Tech Stack used for Frontend are : HTML , CSS , JS .
 Tech Stack used for Backend are  : Nodejs , Expressjs , MongoDB , RestAPI .

Live on  : https://prabhatsuites.onrender.com 
## Features

- User authentication and registration
- Add, edit, and delete hotel listings
- Upload images for listings
- Leave and manage reviews for hotels
- Responsive design with Bootstrap
- Flash messages for user feedback

## Folder Structure

```
Prabhats/
│
├── app.js                 # Main Express app entry point
├── cloudconfig.js         # Cloudinary configuration for image uploads
├── middleware.js          # Custom Express middleware
├── package.json           # Project dependencies and scripts
├── schema.js              # Joi validation schemas
│
├── controllers/           # Route controllers
│   ├── listing.js
│   ├── reviews.js
│   └── users.js
│
├── init/                  # Initial data and setup scripts
│   ├── data.js
│   └── index.js
│
├── models/                # Mongoose models
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── public/                # Static assets
│   ├── css/
│   │   ├── reviewstar.css
│   │   └── style.css
│   └── js/
│       └── script.js
│
├── routes/                # Express route definitions
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── uploads/               # Uploaded images
│   └── ...
│
├── utils/                 # Utility modules
│   ├── ExpressError.js
│   └── wrapAsync.js
│
└── views/                 # EJS templates
    ├── includes/
    │   ├── flash.ejs
    │   ├── footer.ejs
    │   └── navbar.ejs
    ├── layouts/
    │   └── boilerplate.ejs
    ├── listing/
    │   ├── edit.ejs
    │   ├── error.ejs
    │   └── ...
    └── users/
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

npm start


## License

This project is licensed under the MIT License.

---

**Note:** Replace `<repo-url>` with your actual repository URL and update any sections as needed for
