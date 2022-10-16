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
				response.push(...this._stringify(yaml[index], 0, false, true));
			}
		} else {
			Object.entries(yaml).forEach(([key, value], index) => {
				const yamlKey = isArrayChild ? '' : '  '.repeat(indent) + key + ': ';

				if (Array.isArray(value)) {
					const arrayReponse: Array<string> = this._stringify(value, 0, true);
					for (let index=0; index<arrayReponse.length; index++){
						if (index === 0){
							arrayReponse[index] = '  '.repeat(indent) +  '- ' + arrayReponse[index];
						} else {
							arrayReponse[index] = '  '.repeat(indent + 1) + arrayReponse[index];
						}
					}
					arrayReponse[0] = ' -' + arrayReponse[0].substring(2);
					response.push(...arrayReponse);
				} else {
					switch (typeof value) {
						case "object":
							response.push(...this._stringify(value, indent + 1));
							break;
						case "number":
						case "boolean":
							response.push(yamlKey + value);
							break;
						case "undefined":
							break;
						default:
							response.push(yamlKey + '"' + value + '"');
							break;
					}
				}

				console.log(key, value, index);
			});
		}

		return response;
	}
}
