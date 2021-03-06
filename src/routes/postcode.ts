import { CommonRouteConfig } from '../common/route-config';
import express from 'express';
import postcodeController from '../controller/postcode';
import { checkSchema } from 'express-validator';

export class PostcodeRoute extends CommonRouteConfig {
	constructor(app: express.Application) {
		super(app, 'Postcode');
	}

	configureRoutes(): express.Application {
		this.app.get(`/api/healthcheck`, (req: express.Request, res: express.Response) => {
			res.sendStatus(200);
		});

		this.app.get(
			'/api/search',
			checkSchema({
				lat: {
					in: ['params', 'query'],
					errorMessage: 'lat parameter is invalid',
					isFloat: true,
					toFloat: true,
					default: undefined,
				},
				long: {
					in: ['params', 'query'],
					errorMessage: 'long parameter is invalid',
					isFloat: true,
					toFloat: true,
				},
				radius: {
					in: ['params', 'query'],
					errorMessage: 'ID is wrong',
					isInt: true,
					toInt: true,
					default: undefined,
				},
			}),
			postcodeController.search,
		);
		this.app.post('/api/import', postcodeController.importPostcodes);

		return this.app;
	}
}
