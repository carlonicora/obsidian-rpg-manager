import {AbstractFactory} from "../abstracts/AbstractFactory";
import {FrontmatterFactoryInterface} from "../interfaces/factories/FrontmatterFactoryInterface";
import {TFile} from "obsidian";

export class FrontmatterFactory extends AbstractFactory implements FrontmatterFactoryInterface {
	public async update(
		file: TFile,
		keyValues: Map<string, string>,
	): Promise<void> {
		const fileContent: string = await this.app.vault.read(file);
		this.maybeUpdateFile(file, fileContent, keyValues);
	}

	public async remove(
		file: TFile,
		keyValues: Map<string, string>,
	): Promise<void> {
		const fileContent: string = await this.app.vault.read(file);
		this.maybeUpdateFile(file, fileContent, keyValues, true);
	}

	private async maybeUpdateFile(
		file: TFile,
		content: string,
		keyValues: Map<string, string>,
		remove=false,
	): Promise<void> {
		const fileContent:Array<string> = await content.split('\n');
		const updatedMap: Map<string, boolean> = await new Map<string, boolean>();

		await keyValues.forEach((value: string, key: string) => {
			updatedMap.set(key, false);
		})

		const newfileContentArray: Array<string> = await [];

		let hasFrontMatterStarted = false;
		let hasFrontMatterEnded = false;

		await fileContent.forEach((line: string) => {
			let addLine = true;
			if (!hasFrontMatterEnded) {
				if (line === '---') {
					if (!hasFrontMatterStarted) {
						hasFrontMatterStarted = true;
					} else {
						hasFrontMatterEnded = true;

						if (!remove) {
							updatedMap.forEach((hasBeenAddedOrUpdated: boolean, key: string) => {
								if (!hasBeenAddedOrUpdated) {
									newfileContentArray.push(key + ': ' + keyValues.get(key));
									updatedMap.set(key, true);
								}
							});
						}
					}
				} else {
					const keySeparatorIndex = line.indexOf(':');
					if (keySeparatorIndex !== -1) {
						const key = line.substring(0, keySeparatorIndex)
						const value = line.substring(keySeparatorIndex+1).trimStart();

						if (updatedMap.has(key) && keyValues.has(key) && updatedMap.get(key) === false) {
							updatedMap.set(key, true);
							if (remove){
								addLine = false;
							} else {
								if (keyValues.get(key) !== value) line = key + ': ' + keyValues.get(key);
							}
						}
					}
				}
			}

			if (addLine) newfileContentArray.push(line);
		});

		const newFileContent = await newfileContentArray.join('\n');

		if (newFileContent !== content){
			this.updateFile(file, newFileContent);
		}
	}

	private async updateFile(
		file: TFile,
		content: string,
	): Promise<void> {
		await this.app.vault.modify(file, content);
		this.database.onSave(file);

		return;
	}
}
