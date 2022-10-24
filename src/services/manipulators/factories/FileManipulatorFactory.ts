import {AbstractFactory} from "../../../core/abstracts/AbstractFactory";
import {FileManipulatorFactoryInterface} from "./interfaces/FileManipulatorFactoryInterface";
import {TFile} from "obsidian";
import {FileManipulatorInterface} from "../interfaces/FileManipulatorInterface";
import {FileManipulator} from "../FileManipulator";

export class FileManipulatorFactory extends AbstractFactory implements FileManipulatorFactoryInterface {
	public async create(
		file: TFile,
		fileContent: string|undefined=undefined,
	): Promise<FileManipulatorInterface|undefined> {
		const response = new FileManipulator(this.app, file, fileContent);
		return response.read()
			.then((isFileManipulatorReady: boolean) => {
				if (!isFileManipulatorReady) return undefined;
				return response;
			});
	}
}
