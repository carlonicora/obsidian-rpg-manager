import {AbstractRpgManager} from "../abstracts/AbstractRpgManager";
import {CachedMetadata, parseYaml, SectionCache, TFile} from "obsidian";
import {MetadataReaderInterface} from "../interfaces/dataManipulation/MetadataReaderInterface";
import {RelationshipInterface} from "../database/relationships/interfaces/RelationshipInterface";
import {RelationshipMetadataInterface} from "../database/interfaces/metadata/RelationshipMetadataInterface";

export class MetadataReader extends AbstractRpgManager implements MetadataReaderInterface{
	public async read(
		file: TFile,
	): Promise<any> {
		return this.app.vault.read(file)
			.then((fileContent: string) => {
				const fileCacheMetadata: CachedMetadata|null = this.app.metadataCache.getFileCache(file);
				if (fileCacheMetadata == null) return {};

				return this._getCodeBloksMetadata(fileContent, fileCacheMetadata);
			});
	}

	private async _getCodeBloksMetadata(
		fileContent: string,
		fileCacheMetadata: CachedMetadata,
	): Promise<any>{
		let response: any = {};

		const arrayContent: Array<string> = await fileContent.split('\n');
		const sections: Array<SectionCache>|undefined = fileCacheMetadata.sections;

		if (sections !== undefined) {
			for (let index = 0; index < sections.length; index++) {
				const section: SectionCache | undefined = sections[index];
				if (section !== undefined) {
					//@TODO ADD FRONTMATTER/YAML READ
					if (section.type === 'code') {
						if (arrayContent[section.position.start.line] === '```RpgManager') {
							let codeBlockContent = '';
							for (let index = section.position.start.line + 1; index < arrayContent.length; index++) {
								if (arrayContent[index] === '```') break;
								if (arrayContent[index] !== '') codeBlockContent += arrayContent[index] + '\n';
							}
							const newCodeBlockContent: any = parseYaml(codeBlockContent);
							if (newCodeBlockContent.relationships !== undefined){
								const newRelationships: Array<RelationshipInterface> = [];
								await newCodeBlockContent.relationships.forEach((relationship: RelationshipMetadataInterface) => {
									newRelationships.push(this.factories.relationship.createFromMetadata(relationship));
								});
								newCodeBlockContent.relationships = newRelationships;
							}
							if (codeBlockContent !== '') response = {...response, ...newCodeBlockContent};
						}
					}
				}
			}
		}

		delete response['models'];

		return response;
	}
}
