export default interface IPostcode {
	postcode: string;
	status: string;
	userType: string;
	easting: number;
	northing: number;
	positionalQualityIndicator: number;
	country: string;
	latitude: number;
	longitude: number;
	postcodeNoSpace: string;
	postcodeFixedWidthSeven: string;
	postcodeFixedWidthEight: string;
	postcodeArea: string;
	postcodeDistrict: string;
	postcodeSector: string;
	outcode: string;
	incode: string;
	location: {
    type: {
      type: string,
    },
    coordinates: {
      type: [Number],
    },
		index: string
  }
}