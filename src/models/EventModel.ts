import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {RecordType} from "../enums/RecordType";
import {EventInterface} from "../interfaces/data/EventInterface";
import {HeaderComponent} from "../components/HeaderComponent";

export class EventModel extends AbstractModel {
	protected currentElement: EventInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addElement(this.factories.breadcrumb.create(this.currentElement));

		await this.response.addComponent(HeaderComponent, this.currentElement);

		await this.addRelationships(RecordType.Character);
		await this.addRelationships(RecordType.Clue);
		await this.addRelationships(RecordType.Location);

		return this.response;
	}
}
