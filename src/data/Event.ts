import {AbstractRpgElementData} from "../abstracts/AbstractRpgElementData";
import {EventInterface} from "../interfaces/data/EventInterface";
import {RpgDataListInterface} from "../interfaces/data/RpgDataListInterface";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {RpgDataInterface} from "../interfaces/data/RpgDataInterface";

export class Event extends AbstractRpgElementData implements EventInterface {
	public date: Date|null;

	protected async loadData(
	): Promise<void> {
		this.date = this.initialiseDate(this.frontmatter?.dates?.event);

		super.loadData();
	}

	public loadReverseRelationships(
		dataList: RpgDataListInterface,
	): void {
		this.relationships.forEach((data: RelationshipInterface, name: string) => {
			if (data.component !== undefined){
				data.component.addReverseRelationship(
					this.name,
					{
						component: this,
						description: data.description,
						isReverse: true,
					}
				)
			}
		});
	}
}
