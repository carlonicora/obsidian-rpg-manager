import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ResponseDataElementInterface} from "../interfaces/response/ResponseDataElementInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {RelationshipType} from "../enums/RelationshipType";
import {AbstractRpgManager} from "../abstracts/AbstractRpgManager";
import {ComponentV2Interface} from "../_dbV2/interfaces/ComponentV2Interface";
import {AbstractComponentV2} from "../_dbV2/abstracts/AbstractComponentV2";

export class ResponseData extends AbstractRpgManager implements ResponseDataInterface {
	public elements: ResponseDataElementInterface[] = [];

	public async addSubModel(
		type: any,
		currentElement: ComponentV2Interface,
		data: ComponentV2Interface[]|ComponentV2Interface|RelationshipInterface[],
		title: string|undefined=undefined,
		additionalInformation: any|undefined=undefined,
		position: number|undefined=undefined,
	): Promise<void> {
		let relationships: RelationshipInterface[] = [];
		let relationship: RelationshipInterface|undefined;

		if (data instanceof AbstractComponentV2){
			relationship = {component: data, description: '', type: RelationshipType.Direct} as RelationshipInterface;
		} else if (data instanceof Array){
			relationships = [];
			if (data.length > 0){
				if (data[0] instanceof AbstractComponentV2){
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

		const element = await this.factories.subModels.create(
			type,
			currentElement,
			relationship ?? relationships,
			title,
			additionalInformation,
		)

		this.addElement(element, position);
	}

	public addElement(
		element: ResponseDataElementInterface|null,
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
