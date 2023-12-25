import { app } from './app';
import { startServer } from './utils/mongo.utils';

startServer();

app.listen(3000, () => {
  console.log(`Listening on port 3000!`);
});
