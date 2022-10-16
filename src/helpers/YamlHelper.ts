export class YamlHelper {
	public static stringify(
		yaml: any,
	): string {
		let response: string = '';

		response = this._stringify(yaml, 0).join('\n');

		return response;
	}

	private static _stringify(
		yaml: any|Array<any>,
		indent: number,
		isArray: boolean = false,
		isArrayChild: boolean = false,
	): Array<string> {
		const response: Array<string> = [];

		if (isArray) {
			for (let index=0; index<yaml.length; index++){
				const value: any = yaml[index];
				if (value == null){
					response.push('');
				} else if (Array.isArray(value)){
					response.push()
				} else {
					switch (typeof value) {
						case "object":
							response.push(...this._stringify(value, indent + 1));
							break;
						case "number":
						case "boolean":
							response.push(value.toString());
							break;
						case "undefined":
							break;
						default:
							response.push('"' + value + '"');
							break;
					}
				}
			}
		} else {
			Object.entries(yaml).forEach(([key, value], index) => {
				const yamlKey = isArrayChild ? '' : '  '.repeat(indent) + key + ': ';

				if (value == null){
					response.push(yamlKey);
				} else if (Array.isArray(value)) {
					const isBasicArray = this._isBasicArray(value);

					if (isBasicArray) {
						const basicArrayReponse: Array<string> = this._stringify(value, 0, true);
						response.push(yamlKey + '[' + basicArrayReponse.join(',') + ']');
					} else {
						response.push(yamlKey);
						for (let index=0; index<value.length; index++){
							const arrayReponse: Array<any> = this._stringify(value[index], 0, false)
							for (let responseIndex=0; responseIndex<arrayReponse.length; responseIndex++) {
								if (responseIndex === 0) {
									arrayReponse[responseIndex] = '  '.repeat(indent + 1) + '- ' + arrayReponse[responseIndex];
								} else {
									arrayReponse[responseIndex] = '  '.repeat(indent + 2) + arrayReponse[responseIndex];
								}
							}

							response.push(...arrayReponse);
						}
					}
				} else {
					switch (typeof value) {
						case "object":
							response.push(yamlKey);
							response.push(...this._stringify(value, indent + 1));
							break;
						case "number":
						case "boolean":
							response.push(yamlKey + value);
							break;
						default:
							response.push(yamlKey + '"' + value + '"');
							break;
					}
				}
			});
		}

		return response;
	}

	private static _isBasicArray(
		values: Array<any>,
	): boolean {
		for (let index=0; index<values.length; index++){
			if (typeof values[index] === 'object')
				return false;

		}

		return true;
	}
}
