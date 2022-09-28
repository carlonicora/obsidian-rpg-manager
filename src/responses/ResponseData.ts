import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ResponseDataElementInterface} from "../interfaces/response/ResponseDataElementInterface";
import {ComponentInterface} from "../interfaces/database/ComponentInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {AbstractComponent} from "../abstracts/AbstractComponent";
import {RelationshipType} from "../enums/RelationshipType";
import {AbstractRpgManager} from "../abstracts/AbstractRpgManager";

export class ResponseData extends AbstractRpgManager implements ResponseDataInterface {
	public elements: ResponseDataElementInterface[] = [];

	public async addSubModel(
		type: any,
		currentElement: ComponentInterface,
		data: ComponentInterface[]|ComponentInterface|RelationshipInterface[],
		title: string|undefined=undefined,
		additionalInformation: any|undefined=undefined,
		position: number|undefined=undefined,
	): Promise<void> {
		let relationships: RelationshipInterface[] = [];
		let relationship: RelationshipInterface|undefined;

		if (data instanceof AbstractComponent){
			relationship = {component: data, description: '', type: RelationshipType.Direct} as RelationshipInterface;
		} else if (data instanceof Array){
			relationships = [];
			if (data.length > 0){
				if (data[0] instanceof AbstractComponent){
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
