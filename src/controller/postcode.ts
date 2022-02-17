import { Request, Response, NextFunction } from 'express';
import { parse, Parser } from 'csv-parse';
import logger from '../common/logger';
import formidable, { Options } from 'formidable';
import fs from 'fs';
import { Postcode } from '../models/Postcode';
import IPostcode from '../interfaces/postcode';
import { Document } from 'mongoose';

export const search = (req: Request, res: Response, next: NextFunction): void => {
	let { lat, long, radius } = req.query;
	let query = Postcode.find({
		location: {
			$near: {
				$geometry: {
					type: 'Point',
					coordinates: [long, lat],
				},
				$maxDistance: radius,
			},
		},
	});
	query.exec((err, result) => {
		if (err) {
			res.status(500).send(err);
			return;
		}
		res.status(200).json(result);
	});
};

export const importPostcodes = (req: Request, res: Response, next: NextFunction): void => {
	const parser: Parser = parse({
		delimiter: ',',
	});

	let rows: Document<any, any, IPostcode>[] = [];

	parser.on('readable', function () {
		let record;
		while ((record = parser.read()) !== null) {
			let pc = new Postcode({
				postcode: record[0],
				status: record[1],
				userType: record[2],
				easting: record[3],
				northing: record[4],
				positionalQualityIndicator: record[5],
				country: record[6],
				latitude: record[7],
				longitude: record[8],
				postcodeNoSpace: record[9],
				postcodeFixedWidthSeven: record[10],
				postcodeFixedWidthEight: record[11],
				postcodeArea: record[12],
				postcodeDistrict: record[13],
				postcodeSector: record[14],
				outcode: record[15],
				incode: record[16],
				location: {
					type: 'Point',
					coordinates: [record[8], record[7]],
				},
			});
			pc.validate((err) => {
				if (err) {
					logger.error(err);
					return;
				}
				rows.push(pc);
			});
			logger.debug(`${record[0]} ${record[3]}`);
		}
	});
	parser.on('end', () => {
		logger.debug('Reading csv file is completed.');
		Postcode.bulkSave(rows)
			.then((result) => {
				logger.debug('Bulk write is completed.');
			})
			.catch((err) => {
				logger.error(err.message);
			});
	});
	parser.on('error', function (err) {
		logger.error(err.message);
	});

	const options: Options = {
		filter: function ({ mimetype }): boolean {
			// keep only csv files
			return !!mimetype && mimetype.includes('csv');
		},
		filename: () => 'temp',
		uploadDir: './uploads/',
		keepExtensions: false,
	};

	const form = formidable(options);

	form.parse(req, (err, fields, files) => {
		if (err) {
			next(err);
			return;
		}
		res.sendStatus(200);
	});

	form.on('file', (formname, file) => {
		logger.debug(file);
		const readStream = fs.createReadStream(file.filepath);
		readStream.pipe(parser);
	});
};

export default { importPostcodes, search };
