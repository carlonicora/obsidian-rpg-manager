import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {RecordType} from "../enums/RecordType";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {MusicTableComponent} from "../components/MusicTableComponent";
import {CharacterTableComponent} from "../components/CharacterTableComponent";
import {FactionTableComponent} from "../components/FactionTableComponent";
import {ClueTableComponent} from "../components/ClueTableComponent";
import {LocationTableComponent} from "../components/LocationTableComponent";
import {EventTableComponent} from "../components/EventTableComponent";

export class SceneModel extends AbstractModel {
	protected currentElement: SceneInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {

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
			this.currentElement.getRelationships(RecordType.Event),
		);

		return this.response;
	}
}
