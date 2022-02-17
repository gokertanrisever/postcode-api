import http from 'http';
import helmet from 'helmet';
import express from 'express';
import { errorHandler } from './middlewares/error';
import { PostcodeRoute } from './routes/postcode';
import { CommonRouteConfig } from './common/route-config';
import logger from './common/logger';
import MongooseService from './db/mongoose-service';

export class App {
	public app: express.Application;
	public httpServer: http.Server;
	public routeList: Array<CommonRouteConfig>;
	public port: string | number;

	public async init(): Promise<void> {
		this.port = process.env.PORT || 3000;
		this.routeList = [];
		this.app = express();
		this.httpServer = http.createServer(this.app);
		this.httpServer.setTimeout(5000);
		this.middleware();
		this.start();
		this.routes();
		this.connectDB();
	}

	private start(): void {
		this.app.get('/', (req: express.Request, res: express.Response) => {
			res.status(200).send(`Server running at http://localhost:${this.port}`);
		});
	}

	private routes(): void {
		this.routeList.push(new PostcodeRoute(this.app));

		this.httpServer.listen(this.port, () => {
			this.routeList.forEach((route: CommonRouteConfig) => {
				route.configureRoutes();
				logger.debug(`Route configured for ${route.getName()}`);
			});
		});
	}

	private middleware(): void {
		this.app.use(helmet({ contentSecurityPolicy: false }));
		this.app.use(express.json());
		this.app.use(
			express.urlencoded({
				extended: true,
			}),
		);
		this.app.use(errorHandler);
	}

	private connectDB(): void {
		let mongooseService = new MongooseService();
		mongooseService.connectWithRetry();
	}
}
