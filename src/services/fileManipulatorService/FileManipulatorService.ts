import {ServiceInterface} from "../../api/servicesManager/interfaces/ServiceInterface";
import {TFile} from "obsidian";
import {FileManipulatorServiceInterface} from "./interfaces/FileManipulatorServiceInterface";
import {FileManipulatorInterface} from "./interfaces/FileManipulatorInterface";
import {FileManipulator} from "./FileManipulator";
import {AbstractService} from "../../api/servicesManager/abstracts/AbstractService";

export class FileManipulatorService extends AbstractService implements FileManipulatorServiceInterface, ServiceInterface {
	public async read(
		file: TFile,
	): Promise<FileManipulatorInterface|undefined> {
		const response = new FileManipulator(this.app, this.api, file);
		return response.read()
			.then((loaded: boolean) => {
				if (!loaded)
					return undefined;

				return response;
			});
	}
}
