import {AbstractRpgManagerError} from "../abstracts/AbstractRpgManagerError";
import {ComponentType} from "../components/enums/ComponentType";

export class InvalidIdChecksumError extends AbstractRpgManagerError {
	showErrorActions(): string {
		return 'Please regenerate the component identifier through the available tool';
	}

	showErrorMessage(): string {
		return 'The ID used in the ' + (this.id?.type !== undefined ? ComponentType[this.id.type] : 'file') + ' has been changed manually and is invalid';
	}

}
