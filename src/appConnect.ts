import express from 'express';
import '../knexfile';
const app = express();

import authroute from './routes/authroute';
import mainroute from './routes/mainroute';


app.use(
    express.urlencoded({
      extended: false,
    })
  );
  
app.use(express.json());
app.use(authroute)
app.use(mainroute)

export default app