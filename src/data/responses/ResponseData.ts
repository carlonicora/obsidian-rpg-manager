import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ResponseElementInterface} from "../../interfaces/response/ResponseElementInterface";
import {RecordInterface} from "../../interfaces/database/RecordInterface";
import {RelationshipInterface} from "../../interfaces/RelationshipInterface";
import {AbstractRecord} from "../../abstracts/AbstractRecord";
import {RelationshipType} from "../../enums/RelationshipType";
import {AbstractRpgManager} from "../../abstracts/AbstractRpgManager";

export class ResponseData extends AbstractRpgManager implements ResponseDataInterface {
	public elements: ResponseElementInterface[] = [];

	public async addComponent(
		type: any,
		data: RecordInterface[]|RecordInterface|RelationshipInterface[],
		title: string|undefined=undefined,
		additionalInformation: any|undefined=undefined,
		position: number|undefined=undefined,
	): Promise<void> {
		let relationships: RelationshipInterface[] = [];
		let relationship: RelationshipInterface|undefined;

		if (data instanceof AbstractRecord){
			relationship = {component: data, description: '', type: RelationshipType.Direct} as RelationshipInterface;
		} else if (data instanceof Array){
			relationships = [];
			if (data.length > 0){
				if (data[0] instanceof AbstractRecord){
					data.forEach((record: any) => {
						relationships.push({component: record, description: ''} as RelationshipInterface);
					})
				} else {
					data.forEach((rel: any) => {
						relationships.push(rel);
					});
				}
			}
		}
		const element = await this.factories.components.create(
			type,
			relationship ?? relationships,
			title,
			additionalInformation,
		)

		this.addElement(element, position);
	}

	public addElement(
		element: ResponseElementInterface|null,
		position: number|null = null,
	): void {
		if (element != null) {
			if (position == null) {
				this.elements.push(element);
			} else {
				this.elements.splice(position, 0, element);
			}
		}
	}
}
