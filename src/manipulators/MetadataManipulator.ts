import {AbstractRpgManager} from "../abstracts/AbstractRpgManager";
import {CachedMetadata, parseYaml, SectionCache, TFile} from "obsidian";
import {MetadataManipulatorInterface} from "./interfaces/MetadataManipulatorInterface";
import {ComponentInterface} from "../databases/interfaces/ComponentInterface";
import {ComponentStage} from "../databases/components/enums/ComponentStage";
import {RelationshipType} from "../relationships/enums/RelationshipType";
import {ControllerMetadataDataInterface} from "../metadatas/controllers/ControllerMetadataDataInterface";
import {ControllerMetadataInterface} from "../metadatas/controllers/ControllerMetadataInterface";

export class MetadataManipulator extends AbstractRpgManager implements MetadataManipulatorInterface{
	public async read(
		file: TFile,
		component: ComponentInterface,
	): Promise<ControllerMetadataDataInterface> {
		return this.app.vault.read(file)
			.then((fileContent: string):ControllerMetadataDataInterface => {
				const fileCacheMetadata: CachedMetadata|null = this.app.metadataCache.getFileCache(file);
				if (fileCacheMetadata == null) return {};

				return this._addRelationshipsFromContent(
					fileContent,
					this._getCodeBloksMetadata(fileContent, fileCacheMetadata),
					component,
				);
			});
	}

	private _addRelationshipsFromContent(
		fileContent: string,
		metadata: ControllerMetadataDataInterface,
		component: ComponentInterface,
	): ControllerMetadataDataInterface {
		if (metadata.relationships == undefined) metadata.relationships = [];

		let content = fileContent;
		let indexOfRelationship: number = content.indexOf('[[');
		while (indexOfRelationship !== -1){
			content = content.substring(content.indexOf('[[') + 2);
			const endLinkIndex = content.indexOf(']]');
			if (endLinkIndex === -1) break;

			const nameAndAlias = content.substring(0, endLinkIndex);
			const aliasIndex = nameAndAlias.indexOf('|');
			let basename: string;
			if (aliasIndex === -1){
				basename = nameAndAlias;
			} else {
				basename = nameAndAlias.substring(0, aliasIndex);
			}

			let path: string|undefined = undefined;
			const allFiles = this.app.vault.getMarkdownFiles();
			for (let filesIndex=0; filesIndex<allFiles.length; filesIndex++){
				if (allFiles[filesIndex].basename === basename){
					path = allFiles[filesIndex].path;
					break;
				}
			}

			if (path !== undefined) {
				let relationshipAlreadyExists = false;
				for(let relationshipsIndex=0; relationshipsIndex<metadata.relationships.length; relationshipsIndex++){
					if (metadata.relationships[relationshipsIndex].path === path) {
						relationshipAlreadyExists = true;
						break;
					}
				}

				if (!relationshipAlreadyExists) {
					let relationship: RelationshipType | undefined = undefined;
					if (component.stage === ComponentStage.Run || component.stage === ComponentStage.Plot) {
						relationship = RelationshipType.Univocal;
					} else {
						relationship = RelationshipType.Biunivocal;
					}

					metadata.relationships?.push({
						type: this.factories.relationshipType.createReadableRelationshipType(relationship),
						path: path,
						isInContent: true,
					})
				}
			}

			indexOfRelationship = content.indexOf('[[');
		}

		return metadata;
	}

	private _getCodeBloksMetadata(
		fileContent: string,
		fileCacheMetadata: CachedMetadata,
	): ControllerMetadataDataInterface{
		let controllerMetadataInterface: ControllerMetadataInterface = {
			models:{},
			plot: {},
			data: {},
			relationships: [],
		};

		const arrayContent: Array<string> = fileContent.split('\n');
		const sections: Array<SectionCache>|undefined = fileCacheMetadata.sections;

		if (sections !== undefined) {
			for (let index = 0; index < sections.length; index++) {
				const section: SectionCache | undefined = sections[index];
				if (section !== undefined) {
					if (section.type === 'code') {
						if (arrayContent[section.position.start.line] === '```RpgManager') {
							let codeBlockContent = '';
							for (let index = section.position.start.line + 1; index < arrayContent.length; index++) {
								if (arrayContent[index] === '```') break;
								if (arrayContent[index] !== '') codeBlockContent += arrayContent[index] + '\n';
							}
							const newCodeBlockContent: any = parseYaml(codeBlockContent);
							if (codeBlockContent !== '') controllerMetadataInterface = {...controllerMetadataInterface, ...newCodeBlockContent};
						}
					}
				}
			}
		}

		const response: ControllerMetadataDataInterface = {
			data: controllerMetadataInterface.data,
			plot: controllerMetadataInterface.plot,
			relationships: controllerMetadataInterface.relationships,
		};

		return response;
	}
}
