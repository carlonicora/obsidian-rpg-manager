export class ErrorFactory {
	public static create(
		errorMessage: string,
	): void {
		console.log('RpgManager Error: ' + errorMessage);
	}
}
