import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ResponseData} from "../data/responses/ResponseData";
import {DataType} from "../enums/DataType";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {MusicTableComponent} from "../components/MusicTableComponent";
import {CharacterTableComponent} from "../components/CharacterTableComponent";
import {FactionTableComponent} from "../components/FactionTableComponent";
import {ClueTableComponent} from "../components/ClueTableComponent";
import {LocationTableComponent} from "../components/LocationTableComponent";

export class SceneModel extends AbstractModel {
	protected currentElement: SceneInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		await this.response.addComponent(
			MusicTableComponent,
			this.currentElement.getRelationships(DataType.Music, false),
		);

		await this.response.addComponent(
			CharacterTableComponent,
			this.currentElement.getRelationships(DataType.Character|DataType.NonPlayerCharacter, false),
		);

		await this.response.addComponent(
			FactionTableComponent,
			this.currentElement.getRelationships(DataType.Faction, false),
		);

		await this.response.addComponent(
			ClueTableComponent,
			this.currentElement.getRelationships(DataType.Clue, false),
		);

		await this.response.addComponent(
			LocationTableComponent,
			this.currentElement.getRelationships(DataType.Location, false),
		);

		return this.response;
	}
}
