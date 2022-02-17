import IPostcode from '../interfaces/postcode';
import { Schema, model } from 'mongoose';

const pointSchema = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

export const postcodeSchema = new Schema<IPostcode>({
	postcode: String,
	status: String,
	userType: String,
	easting: Number,
	northing: Number,
	positionalQualityIndicator: Number,
	country: String,
	latitude: Number,
	longitude: Number,
	postcodeNoSpace: String,
	postcodeFixedWidthSeven: String,
	postcodeFixedWidthEight: String,
	postcodeArea: String,
	postcodeDistrict: String,
	postcodeSector: String,
	outcode: String,
	incode: String,
	location: {
    type: pointSchema,
    index: '2dsphere'
  }
});

export const Postcode = model<IPostcode>('Postcode', postcodeSchema);
