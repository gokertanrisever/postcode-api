import mongoose from 'mongoose';
import logger from '../common/logger';

export default class MongooseService {
	private count = 0;
	private mongooseOptions = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverSelectionTimeoutMS: 5000,
	};
	private connectionString: string = process.env.DB_URL || 'mongodb://admin:plek@127.0.0.1:27017';

	connectWithRetry = () => {
		logger.debug('Attempting MongoDB connection (will retry if needed)');
		logger.debug(`URL: ${this.connectionString}`)
		mongoose
			.connect(this.connectionString, this.mongooseOptions)
			.then(() => {
				logger.debug('MongoDB is connected');
			})
			.catch((err) => {
				const retrySeconds = 5;
				logger.debug(
					`MongoDB connection unsuccessful (will retry #${++this
						.count} after ${retrySeconds} seconds):`,
					err,
				);
				setTimeout(this.connectWithRetry, retrySeconds * 1000);
			});
	};
}
