### _**IMPORTANT NOTES**_ - 
You must create your own .env file to store a DB_URI or MONGODB_URI connection string for your own MongoDB cluster. You will need read and write perms 


# Getting Started
This project holds both client and server files. Run npm install in both client and server folders to install all required dependencies. 

# Available Scripts


## Client
### `npm run start`

Runs the client site (React application).<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

### `npm run deploy`

Deploys the site to gh-pages

## Server

### `node index.js`

Launches the server at port 9000<br>
Must launch before the client. By default, the client uses the URL hosted at vercel, not the localhost. 




# File structure
### `client` - Holds the client application
- #### `public` - This holds all of our static files
- #### `src`
    - #### `assets` - This folder holds assets such as images, docs, and fonts
    - #### `components` - This folder holds all of the different components that will make up our views
    - #### `views` - These represent a unique page on the website i.e. Home or About. These are still normal react components
    - #### `App.js` - This is what renders all of our browser routes and different views
    - #### `index.js` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines npm behaviors and packages for the client
#### `server` - Holds the server application
- #### `.env` - This holds our sensitive data, like mongoDB uri
- #### `index.js` - Store the server backend, all API calls
#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!

# Client Structure

## Counting
Basic counting ducks game with one pond

## Counting 2
More advanced counting ducks game, one pond and nest

## Alphabet
Word builder in spanish

## Assessment
WIP Testing site for students

## Admin
Admin panel