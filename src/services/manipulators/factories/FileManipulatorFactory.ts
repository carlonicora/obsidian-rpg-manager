import {AbstractFactory} from "../../../core/abstracts/AbstractFactory";
import {FileManipulatorFactoryInterface} from "./interfaces/FileManipulatorFactoryInterface";
import {TFile} from "obsidian";
import {OldFileManipulatorInterface} from "../../fileManipulatorService/interfaces/OldFileManipulatorInterface";
import {OldFileManipulator} from "../../fileManipulatorService/OldFileManipulator";

export class FileManipulatorFactory extends AbstractFactory implements FileManipulatorFactoryInterface {
	public async create(
		file: TFile,
		fileContent: string|undefined=undefined,
	): Promise<OldFileManipulatorInterface|undefined> {
		const response = new OldFileManipulator(this.app, file, fileContent);
		return response.read()
			.then((isFileManipulatorReady: boolean) => {
				if (!isFileManipulatorReady) return undefined;
				return response;
			});
	}
}
