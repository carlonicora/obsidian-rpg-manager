import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {ResponseElementInterface} from "../../interfaces/response/ResponseElementInterface";
import {RecordInterface} from "../../interfaces/database/RecordInterface";
import {RelationshipInterface} from "../../interfaces/RelationshipInterface";
import {App} from "obsidian";
import {AbstractRecord} from "../../abstracts/AbstractRecord";

export class ResponseData implements ResponseDataInterface {
	public elements: ResponseElementInterface[];

	constructor(
		private app: App,
	) {
		this.elements = [];
	}

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
			relationship = {component: data, description: ''} as RelationshipInterface;
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
		const element = await this.app.plugins.getPlugin('rpg-manager').factories.components.create(
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
