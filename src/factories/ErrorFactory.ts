import {AbstractFactory} from "../abstracts/AbstractFactory";

export class ErrorFactory extends AbstractFactory {
	public create(
		errorMessage: string,
	): void {
		console.log('RpgManager Error: ' + errorMessage);
	}
}
