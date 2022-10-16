import "dotenv/config";
import app from './appConnect';
const APP_PORT = process.env.APP_PORT;


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(APP_PORT, () => {
  return console.log(`App is listening at Port ${APP_PORT}`);
});
