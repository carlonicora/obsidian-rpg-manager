import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";

export class SessionModel extends AbstractModel {
	protected currentElement: SessionInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {

		/*
		@TODO LOAD ALL THE INFO FROM THE SCENES CONTAINED IN THE SESSION

		await this.response.addComponent(
			MusicTableComponent,
			this.currentElement.getRelationships(RecordType.Music),
		);

		await this.response.addComponent(
			CharacterTableComponent,
			this.currentElement.getRelationships(RecordType.Character|RecordType.NonPlayerCharacter),
		);

		await this.response.addComponent(
			FactionTableComponent,
			this.currentElement.getRelationships(RecordType.Faction),
		);

		await this.response.addComponent(
			ClueTableComponent,
			this.currentElement.getRelationships(RecordType.Clue),
		);

		await this.response.addComponent(
			LocationTableComponent,
			this.currentElement.getRelationships(RecordType.Location),
		);

		await this.response.addComponent(
			EventTableComponent,
			this.currentElement.getRelationships(RecordType.Event, ),
		);
		 */

		return this.response;
	}
}
