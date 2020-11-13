import 'dotenv/config';
import { db } from './models';
import { restRouter } from './api';
import config from './config';
import cors from 'cors';
import appManager from './app';
import './errors';
import path from 'path';

global.appRoot = path.resolve(__dirname);

const PORT = config.app.port;

const app = appManager.setup(config);

const corsOptions = {
  //To allow requests from client
    origin: "http://localhost:3000",
    credentials: true
};

app.use(cors(corsOptions));
app.use('/api', restRouter);

app.use((req, res, next) => {
  console.log(req.url)
	next(new RequestError('Invalid route', 404));
});

app.use((error, req, res, next) => {
	if (!(error instanceof RequestError)) {
		error = new RequestError('Some Error Occurred', 500, error.message);
    }
	error.status = error.status || 500;
	res.status(error.status);
	let contype = req.headers['content-type'];
	var json = !(!contype || contype.indexOf('application/json') !== 0);
	if (json) {
    return res.json({ errors: error.errorList });
  } else {
    return res.json({ errors: "Invald request" });
  }
});


/* Database Connection */
db.sequelize.authenticate().then(function () {
	console.log('Nice! Database looks fine');
}).catch(function (err) {
	console.log(err, "Something went wrong with the Database Update!")
});

/* Start Listening service */
app.listen(PORT, () => {
	console.log(`Server is running at PORT http://localhost:${PORT}`);
});