import app from './api/server';
import mongodb from "./api/db";
import { PORT } from './api/env';

// const port = process.env.PORT || 8080;

mongodb(app)
	.then(() => {
		app().listen(PORT, err => {
			if(err) {
				console.log(err);
			} else {
				console.log(`Server online - Listening to port ${PORT}`);
			}
		});
})
	.catch(e => {
		console.log('MONGODB:', 'Failed to connect.');
		console.log(e);
});