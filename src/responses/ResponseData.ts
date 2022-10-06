import {ResponseDataInterface} from "./interfaces/ResponseDataInterface";
import {ResponseDataElementInterface} from "./interfaces/ResponseDataElementInterface";
import {AbstractRpgManager} from "../abstracts/AbstractRpgManager";
import {ComponentInterface} from "../databases/interfaces/ComponentInterface";
import {AbstractComponent} from "../databases/abstracts/AbstractComponent";
import {RelationshipInterface} from "../relationships/interfaces/RelationshipInterface";
import {RelationshipType} from "../relationships/enums/RelationshipType";

export class ResponseData extends AbstractRpgManager implements ResponseDataInterface {
	public elements: ResponseDataElementInterface[] = [];

	public async addSubModel(
		type: any,
		currentComponent: ComponentInterface,
		data: ComponentInterface[]|ComponentInterface|RelationshipInterface[],
		title: string|undefined=undefined,
		additionalInformation: any|undefined=undefined,
		position: number|undefined=undefined,
	): Promise<void> {
		let relationships: RelationshipInterface[] = [];
		let relationship: RelationshipInterface|undefined;

		if (data instanceof AbstractComponent){
			relationship = this.factories.relationship.create(RelationshipType.Hierarchy, data.file.path, undefined, data, true);
		} else if (data instanceof Array){
			relationships = [];
			if (data.length > 0){
				if (data[0] instanceof AbstractComponent){
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
