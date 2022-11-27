import {GraphViewServiceInterface} from "./interfaces/GraphViewServiceInterface";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {TFile} from "obsidian";
import {CodeblockService} from "../codeblockService/CodeblockService";
import {RelationshipType} from "../relationshipsService/enums/RelationshipType";

export class GraphViewService extends AbstractService implements GraphViewServiceInterface, ServiceInterface {
	constructor(
		protected api: RpgManagerApiInterface,
	) {
		super(api);

		this.registerEvent(this.api.app.metadataCache.on('resolve', (file: TFile) => this._onSave(file)));
	}

	private async _onSave(
		file: TFile,
	): Promise<void> {
		const element = this.api.database.readByPath(file.path);

		if (element === undefined)
			return;

		const domain = await this.api.service(CodeblockService).read(file, 'RpgManagerID');

		if (domain === undefined)
			return;

		const content = domain.originalFileContent.split('\n');
		let hiddenLinksContent = '';

		const newRelationships: string[] = [];
		const relationshipsToRemove: string[] = [];
		let hasExistingRelationships = false;

		if (domain.codeblockEnd.line + 1 < content.length) {
			for (let index = domain.codeblockEnd.line + 1; index < content.length; index++) {
				if (content[index] !== ''){
					hasExistingRelationships = true;
					hiddenLinksContent += content[index] + '\n';
					relationshipsToRemove.push(content[index].substring(2, content[index].length -3).toLowerCase());
				} else {
					hiddenLinksContent += '\n';
				}
			}
		}

		const existingRelationshipCount = relationshipsToRemove.length;

		for (let index=0; index<element.getRelationships().relationships.length; index++){
			const relationship = element.getRelationships().relationships[index];
			if (
				relationship.component !== undefined &&
				!relationship.isInContent &&
				!relationship.isAlsoInContent &&
				(
					relationship.type === RelationshipType.Bidirectional ||
					relationship.type === RelationshipType.Unidirectional ||
					relationship.type === RelationshipType.Child
				)
			) {
				this._updateAvailableRelationships(
					relationshipsToRemove,
					newRelationships,
					relationship.component.file.basename,
				)
			}
		}

		console.log(
			relationshipsToRemove,
			newRelationships,
		)


		if (
			relationshipsToRemove.length !== 0 ||
			newRelationships.length !== existingRelationshipCount
		){
			let newHiddenLinkContent = '';
			for (let index=0; index<newRelationships.length; index++){
				newHiddenLinkContent += newRelationships[index] + '\n';
			}

			if (newHiddenLinkContent !== '')
				newHiddenLinkContent = newHiddenLinkContent.substring(0, newHiddenLinkContent.length - 1);

			console.warn(newHiddenLinkContent)

			let newFileContent = '';
			let isInRpgManagerID = false;
			for (let index=0; index<content.length; index++){
				newFileContent += content[index] + '\n';
				if (isInRpgManagerID && content[index] === '```')
					break;
			}

			newFileContent += newHiddenLinkContent;

			if (newFileContent !== domain.originalFileContent)
				this.api.app.vault.modify(file, newFileContent);

		}
	}

	private _updateAvailableRelationships(
		existingRelationships: string[],
		newRelationships: string[],
		relationship: string,
	): void {
		for (let index=0; index<existingRelationships.length; index++){
			if (existingRelationships[index] === relationship.toLowerCase()){
				existingRelationships.splice(index, 1);
				break;
			}
		}

		newRelationships.push('[[' + relationship + '|]]')
	}
}
