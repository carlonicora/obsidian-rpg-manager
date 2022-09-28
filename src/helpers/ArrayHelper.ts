export class ArrayHelper {
	public static isArray(
		maybeArray: any,
	): boolean {
		if (typeof maybeArray !== 'object') return false;

		let response = false;
		Object.entries(maybeArray).forEach(([index, value]: [string, any]) => {
			if (!isNaN(+index)){
				response = true;
			}
		});

		return response;
	}
}
