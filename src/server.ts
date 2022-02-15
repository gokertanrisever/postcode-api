import { App } from './App';

const app: App = new App();

app.init().catch((err: Error) => {
	console.info('app.init error');
	console.error(err.name);
	console.error(err.message);
	console.error(err.stack);
});
