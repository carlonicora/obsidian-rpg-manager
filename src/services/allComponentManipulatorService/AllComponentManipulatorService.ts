import {TFile} from "obsidian";
import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {AllComponentManipulatorServiceInterface} from "./interfaces/AllComponentManipulatorServiceInterface";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {FileManipulatorService} from "../fileManipulatorService/FileManipulatorService";
import {FileManipulatorInterface} from "../fileManipulatorService/interfaces/FileManipulatorInterface";

export class AllComponentManipulatorService extends AbstractService implements AllComponentManipulatorServiceInterface, ServiceInterface {
	public async updateImagePath(
		oldPath: string,
		newPath: string,
	): Promise<void> {
		return this._updatePath(oldPath, newPath);
	}

	public async updateRelationshipPath(
		oldPath: string,
		newPath: string,
	): Promise<void> {
		return this._updatePath(oldPath, newPath, this._updateRelationship.bind(this));
	}

	private async _updatePath(
		oldPath: string,
		newPath: string,
		callbackFunction?: (file: TFile) => Promise<void>,
	): Promise<void> {
		const allFiles = this.api.app.vault.getMarkdownFiles();
		allFiles.forEach((file: TFile) => {
			this.api.service(FileManipulatorService).read(file)
				.then((fileManipulator: FileManipulatorInterface) => {
					fileManipulator.read()
						.then((isReady: boolean) => {
							if (!isReady)
								return;

							if (!fileManipulator.content.contains('path:'))
								return;

							if (!fileManipulator.content.contains(oldPath))
								return;

							const updatedFileContent = fileManipulator.content.replaceAll(oldPath, newPath);
							fileManipulator.maybeWrite(updatedFileContent)
								.then(() => {
									if (callbackFunction !== undefined)
										callbackFunction(file);
								});
						});
				});
		});
	}

	private async _updateRelationship(
		file: TFile,
	): Promise<void> {
		const component = this.api.database.readByPath(file.path);
		if (component === undefined)
			return;

		component.readMetadata()
			.then(() =>{
				component.initialiseRelationships();
			});
	}
}
