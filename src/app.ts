import app from './appConnect';
const port = 3000;


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`App is listening at Port ${port}`);
});
