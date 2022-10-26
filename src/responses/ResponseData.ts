import {ResponseDataInterface} from "./interfaces/ResponseDataInterface";
import {ResponseDataElementInterface} from "./interfaces/ResponseDataElementInterface";
import {AbstractRpgManager} from "../core/abstracts/AbstractRpgManager";
import {ModelInterface} from "../api/modelsManager/interfaces/ModelInterface";
import {AbstractModel} from "../api/modelsManager/abstracts/AbstractModel";
import {RelationshipInterface} from "../services/relationshipsService/interfaces/RelationshipInterface";
import {RelationshipType} from "../services/relationshipsService/enums/RelationshipType";

export class ResponseData extends AbstractRpgManager implements ResponseDataInterface {
	public elements: ResponseDataElementInterface[] = [];

	public async addSubModel(
		type: any,
		currentComponent: ModelInterface,
		data: ModelInterface[]|ModelInterface|RelationshipInterface[],
		title: string|undefined=undefined,
		additionalInformation: any|undefined=undefined,
		position: number|undefined=undefined,
	): Promise<void> {
		let relationships: RelationshipInterface[] = [];
		let relationship: RelationshipInterface|undefined;

		if (data instanceof AbstractModel){
			relationship = this.factories.relationship.create(RelationshipType.Hierarchy, data.file.path, undefined, data, true);
		} else if (data instanceof Array){
			relationships = [];
			if (data.length > 0){
				if (data[0] instanceof AbstractModel){
					data.forEach((component: any) => {
						relationships.push(
							this.factories.relationship.create(RelationshipType.Hierarchy, component.file.path, undefined, component, true)
						)
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
			currentComponent,
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
