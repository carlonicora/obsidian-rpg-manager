import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {TFile} from "obsidian";
import {FileManipulatorServiceInterface} from "./interfaces/FileManipulatorServiceInterface";
import {FileManipulatorInterface} from "./interfaces/FileManipulatorInterface";
import {FileManipulator} from "./FileManipulator";
import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {FilePatternPositionInterface} from "./interfaces/FilePatternPositionInterface";

export class FileManipulatorService extends AbstractService implements FileManipulatorServiceInterface, ServiceInterface {
	public async read(
		file: TFile,
	): Promise<FileManipulatorInterface|undefined> {
		const response = new FileManipulator(this.api, file);
		return response.read()
			.then((loaded: boolean) => {
				if (!loaded)
					return undefined;

				return response;
			});
	}

	public patternPosition(
		fileManipulator: FileManipulatorInterface,
		pattern: string[],
	): FilePatternPositionInterface|undefined {
		const arrayContent: string[] = fileManipulator.contentArray;

		let startLine: number|undefined = undefined;
		let endLine: number|undefined = undefined;
		let isPartialStart: boolean|undefined = undefined;
		let isPartialEnd: boolean|undefined = undefined;

		let analysedLine = 0;
		for (let index=0; index<arrayContent.length; index++){
			const line = arrayContent[index];
			let isMatching = false;
			if (analysedLine === 0 && pattern.length === 1){
				isMatching = line === pattern[0];
				if (isMatching){
					startLine = index;
					isPartialStart = false;
				}
			} else if (analysedLine === 0){
				isMatching = line.endsWith(pattern[0]);

				if (isMatching){
					startLine = index;
					isPartialStart = line !== pattern[0];
				}
			} else if (analysedLine === pattern.length -1){
				isMatching = line.startsWith(pattern[pattern.length-1]);

				if (isMatching){
					endLine = index;
					isPartialEnd = line !== pattern[pattern.length-1];
				}
			} else {
				isMatching = line === pattern[analysedLine];
			}

			if (isMatching){
				analysedLine++;
				if (startLine !== undefined && endLine !== undefined && isPartialStart !== undefined && isPartialEnd !== undefined){
					return {
						partialEnd: isPartialEnd,
						partialStart: isPartialStart,
						start: startLine,
						end: endLine + 1,
						content: pattern,
					};
				}
			} else if (analysedLine !== 0) {
				analysedLine = 0;
				startLine = undefined;
				endLine = undefined;
				isPartialStart = undefined;
				isPartialEnd = undefined;
			}
		}

		return undefined;
	}

	public async replacePattern(
		fileManipulator: FileManipulatorInterface,
		patternPosition: FilePatternPositionInterface,
		content: string[],
	): Promise<void> {
		const arrayContent: string[] = fileManipulator.contentArray;

		if (patternPosition.partialStart){
			arrayContent[patternPosition.start].replace(patternPosition.content[0], content[0]);
			patternPosition.start++;
		}

		if (patternPosition.partialEnd){
			arrayContent[patternPosition.end].replace(arrayContent[patternPosition.end], content[content.length -1]);
			content.splice(content.length -1, 1);
			patternPosition.end--;
		}

		arrayContent.splice(patternPosition.start, patternPosition.end - patternPosition.start, ...content);

		fileManipulator.maybeWrite(arrayContent.join('\n'));
	}
}
