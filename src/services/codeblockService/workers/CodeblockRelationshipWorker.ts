import {CodeblockDataWorkerInterface} from "../interfaces/CodeblockDataWorkerInterface";
import {CodeblockDomainInterface} from "../interfaces/CodeblockDomainInterface";
import {RelationshipInterface} from "../../relationshipsService/interfaces/RelationshipInterface";
import {
	ControllerMetadataRelationshipInterface
} from "../../../api/controllerManager/interfaces/ControllerMetadataRelationshipInterface";
import {ComponentMetadataInterface} from "../../../core/interfaces/ComponentMetadataInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {RelationshipService} from "../../relationshipsService/RelationshipService";

export class CodeblockRelationshipWorker implements CodeblockDataWorkerInterface {
	constructor(
		private _api: RpgManagerApiInterface,
	) {
	}

	public async addOrUpdate(
		domain: CodeblockDomainInterface,
		data: RelationshipInterface,
	): Promise<any> {
		if (domain.codeblock.relationships === undefined)
			domain.codeblock.relationships = [];

		let found: number|undefined;
		for (let relationshipsIndex=0; relationshipsIndex<domain.codeblock.relationships.length; relationshipsIndex++){
			if (data.path === domain.codeblock.relationships[relationshipsIndex].path){
				found = relationshipsIndex;
				break;
			}
		}

		if (found !== undefined)
			domain.codeblock.relationships.splice(found, 1);


		const metadataRelationship: ControllerMetadataRelationshipInterface = {
			type: this._api.services.get(RelationshipService)?.getReadableRelationshipType(data.type),
			path: data.path,
			description: data.description,
		}

		domain.codeblock.relationships.push(metadataRelationship);
	}

	public async remove(
		domain: CodeblockDomainInterface,
		path: string,
	): Promise<void> {
		if (domain.codeblock.relationships === undefined) return;

		let found: number|undefined;
		for (let relationshipsIndex=0; relationshipsIndex<domain.codeblock.relationships.length; relationshipsIndex++){
			if (path === domain.codeblock.relationships[relationshipsIndex].path){
				found = relationshipsIndex;
				break;
			}
		}

		if (found !== undefined){
			domain.codeblock.relationships.splice(found, 1);
		}
	}
}
