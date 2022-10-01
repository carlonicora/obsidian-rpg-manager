import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ResponseDataElementInterface} from "../interfaces/response/ResponseDataElementInterface";
import {AbstractRpgManager} from "../abstracts/AbstractRpgManager";
import {ComponentV2Interface} from "../_dbV2/interfaces/ComponentV2Interface";
import {AbstractComponentV2} from "../_dbV2/abstracts/AbstractComponentV2";
import {RelationshipV2Interface} from "../_dbV2/relationships/interfaces/RelationshipV2Interface";
import {RelationshipV2Type} from "../_dbV2/relationships/enums/RelationshipV2Type";
import {RelationshipV2} from "../_dbV2/relationships/RelationshipV2";

export class ResponseData extends AbstractRpgManager implements ResponseDataInterface {
	public elements: ResponseDataElementInterface[] = [];

	public async addSubModel(
		type: any,
		currentElement: ComponentV2Interface,
		data: ComponentV2Interface[]|ComponentV2Interface|RelationshipV2Interface[],
		title: string|undefined=undefined,
		additionalInformation: any|undefined=undefined,
		position: number|undefined=undefined,
	): Promise<void> {
		let relationships: RelationshipV2Interface[] = [];
		let relationship: RelationshipV2Interface|undefined;

		if (data instanceof AbstractComponentV2){
			relationship = new RelationshipV2(RelationshipV2Type.Univocal, data.file.path, undefined, data);
		} else if (data instanceof Array){
			relationships = [];
			if (data.length > 0){
				if (data[0] instanceof AbstractComponentV2){
					data.forEach((component: any) => {
						relationships.push({component: component, description: ''} as RelationshipV2Interface);
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
