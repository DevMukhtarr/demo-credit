import express from 'express';
import database from "./config/connect"
const app = express();

import authroute from './routes/authroute';
import mainroute from './routes/mainroute';


app.use(
    express.urlencoded({
      extended: false,
    })
  );
  
app.use(express.json());
app.use(database)
app.use(authroute)
app.use(mainroute)

export default app