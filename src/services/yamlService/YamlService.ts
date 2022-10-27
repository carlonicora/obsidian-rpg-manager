import {YamlServiceInterface} from "./interfaces/YamlServiceInterface";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";

enum YamlDataType {
	Basic,
	Array,
	Object,
}

export class YamlService extends AbstractService implements YamlServiceInterface, ServiceInterface{
	public stringify(
		yaml: any,
	): string {
		let response = '';

		response = this._stringify(yaml, 0).join('\n') + '\n';

		return response;
	}

	private _stringify(
		yaml: any|any[],
		indent: number,
		isArray = false,
	): Array<string> {
		const response: string[] = [];

		if (isArray) {
			for (let index=0; index<yaml.length; index++){
				const value: any = yaml[index];
				if (value == null){
					response.push('');
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
							response.push('"' + value.replaceAll('\n', '\\n').replaceAll('"', '\\"') + '"');
							break;
					}
				}
			}
		} else {
			Object.entries(yaml).forEach(([key, value], index) => {
				const yamlKey = '  '.repeat(indent) + key + ': ';

				if (value == null){
					response.push(yamlKey);
				} else if (Array.isArray(value)) {
					const yamlDataType = this._dataType(value);

					switch (yamlDataType) {
						case YamlDataType.Basic:
							response.push(yamlKey + '[' + this._stringify(value, 0, true).join(',') + ']');
							break;
						case YamlDataType.Object:
							response.push(yamlKey);
							for (let index=0; index<value.length; index++){
								const arrayReponse: any[] = this._stringify(value[index], 0, false);
								for (let responseIndex=0; responseIndex<arrayReponse.length; responseIndex++) {
									if (responseIndex === 0) {
										arrayReponse[responseIndex] = '  '.repeat(indent + 1) + '- ' + arrayReponse[responseIndex];
									} else {
										arrayReponse[responseIndex] = '  '.repeat(indent + 2) + arrayReponse[responseIndex];
									}
								}

								response.push(...arrayReponse);
							}
							break;
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
							response.push(yamlKey + '"' + (<string>value).replaceAll('\n', '\\n').replaceAll('"', '\\"') + '"');
							break;
					}
				}
			});
		}

		return response;
	}

	private _dataType(
		values: any[],
	): YamlDataType {
		for (let index=0; index<values.length; index++){
			if (typeof values[index] === 'object') {
				if (Array.isArray(values[index]))
					return YamlDataType.Array;

				return YamlDataType.Object;
			}
		}

		return YamlDataType.Basic;
	}
}
