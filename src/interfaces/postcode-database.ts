import IPostcode from './postcode';

export interface PostcodeDatabase {
	find(lat: number, long: number, radius: number): Promise<Array<IPostcode>>;
	save(postcode: IPostcode): Promise<void>;
}
