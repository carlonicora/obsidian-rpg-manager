import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ResponseDataElementInterface} from "../interfaces/response/ResponseDataElementInterface";
import {AbstractRpgManager} from "../abstracts/AbstractRpgManager";
import {ComponentInterface} from "../database/interfaces/ComponentInterface";
import {AbstractComponent} from "../database/abstracts/AbstractComponent";
import {RelationshipInterface} from "../database/relationships/interfaces/RelationshipInterface";
import {RelationshipType} from "../database/relationships/enums/RelationshipType";
import {Relationship} from "../database/relationships/Relationship";

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
			relationship = new Relationship(RelationshipType.Univocal, data.file.path, undefined, data);
		} else if (data instanceof Array){
			relationships = [];
			if (data.length > 0){
				if (data[0] instanceof AbstractComponent){
					data.forEach((component: any) => {
						relationships.push({component: component, description: ''} as RelationshipInterface);
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
