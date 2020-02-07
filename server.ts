/*
* This is the entry point to the program.
*
* It creates the application instance which serves the angular application and 
* our API.
*/

// Configure environment vars
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

import * as express from 'express';
import { join } from 'path';
import * as helmet from 'helmet';
import { createServer } from 'http';
import { json, urlencoded } from 'body-parser';

/** The Sequelize ORM instance to interact with the database */
import { database } from './database';

/** Establishes session with the client with cookies */
import * as session from 'express-session';
/** Establishes configuration for cookies on the database side */
import * as sequelizeStore from 'connect-session-sequelize';
/** The Combined Power of the above two imports to control user sessions */
const SequelizeSessionStore = sequelizeStore(session.Store);

/** Our api to handle contact requests and rate limiting */
import { ApiServer } from './api/api-control';

/** The exress aplication instance */
const app: express.Application = express();


////////////////////////////////////////////////
// Middleware
//
// Protects agains common web vulnerabilities
app.use(helmet());
// parsers for POST data
app.use(json());
app.use(urlencoded({ extended: false }));
/** The number of milliseconds in one hour */
const msInHour = 3600000;
// set up the session and config for cookies
app.use(session({
  secret: process.env.SECRET_KEY!,
  resave: false,
  saveUninitialized: false,
  store: new SequelizeSessionStore({
    db: database.sequelize,
    checkExpirationInterval: msInHour * 96
  }),
  cookie: {
    sameSite: true,
    secure: false,
    maxAge: msInHour * 24,
    httpOnly: true
  }
}));
// protect against dangerous web vulnerabilities
app.use(helmet());


////////////////////////////////////////////////
// Routes
//
// Point static paths to dist
app.use(express.static(join(__dirname, 'src/')));
// Set our api
app.use('/api', ApiServer());
// Route all other routes to the angular application
app.get('*', (_, res) => res.sendFile(join(__dirname, 'src/index.html')));


////////////////////////////////////////////////////////////////////////
// Start up the Node Server

// Set the port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create and then listen to output
createServer(app).listen(port, () => console.log(`Server running on localhost:${port}`));
