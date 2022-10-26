import {AbstractFactory} from "../../core/abstracts/AbstractFactory";
import {AllComponentManipulatorInterface} from "./interfaces/AllComponentManipulatorInterface";
import {TFile} from "obsidian";
import {OldFileManipulatorInterface} from "../fileManipulatorService/interfaces/OldFileManipulatorInterface";

export class AllComponentManipulator extends AbstractFactory implements AllComponentManipulatorInterface {
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

	private async _updateRelationship(
		file: TFile,
	): Promise<void> {
		const component = this.database.readByPath(file.path);
		if (component === undefined)
			return;

		component.readMetadata()
			.then(() =>{
				component.initialiseRelationships()
			})
	}

	private async _updatePath(
		oldPath: string,
		newPath: string,
		callbackFunction?: (file: TFile) => Promise<void>,
	): Promise<void> {
		const allFiles = this.app.vault.getMarkdownFiles();
		allFiles.forEach((file: TFile) => {
			this.factories.fileManipulator.create(file)
				.then((fileManipulator: OldFileManipulatorInterface) => {
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
								})
						})
				})
		});
	}
}
