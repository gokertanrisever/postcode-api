import { CommonRouteConfig } from '../common/route-config';
import express from 'express';

export class PostcodeRoute extends CommonRouteConfig {
	constructor(app: express.Application) {
		super(app, 'Postcode');
	}

	configureRoutes(): express.Application {
		this.app.route(`/search`).get((req: express.Request, res: express.Response) => {
      res.status(200).send('Search result')
    });

		return this.app;
	}
}
