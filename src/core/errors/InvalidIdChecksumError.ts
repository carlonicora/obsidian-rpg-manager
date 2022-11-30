import {ComponentType} from "../enums/ComponentType";
import {AbstractRpgManagerError} from "./abstracts/AbstractRpgManagerError";

export class InvalidIdChecksumError extends AbstractRpgManagerError {
	showErrorActions(): string {
		return 'Please regenerate the component identifier through the available tool';
	}

	showErrorMessage(): string {
		return 'The ID used in the ' + (this.index?.type !== undefined ? ComponentType[this.index.type] : 'file') + ' has been changed manually and is invalid';
	}

}
