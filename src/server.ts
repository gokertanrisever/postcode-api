import { App } from './App';
import logger from './common/logger';

const app: App = new App();

app.init().catch((err: Error) => {
	logger.info('app.init error');
	logger.error(err.name);
	logger.error(err.message);
	logger.error(err.stack);
});
