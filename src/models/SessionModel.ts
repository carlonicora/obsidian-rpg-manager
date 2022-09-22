import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {RecordType} from "../enums/RecordType";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {EventTableComponent} from "../components/EventTableComponent";
import {LocationTableComponent} from "../components/LocationTableComponent";
import {ClueTableComponent} from "../components/ClueTableComponent";
import {FactionTableComponent} from "../components/FactionTableComponent";
import {CharacterTableComponent} from "../components/CharacterTableComponent";
import {MusicTableComponent} from "../components/MusicTableComponent";

export class SessionModel extends AbstractModel {
	protected currentElement: SessionInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {

		const scenes = this.database.read<SceneInterface>(
			(scene: SceneInterface) =>
				scene.id.type === RecordType.Scene &&
				scene.id.campaignId === this.currentElement.campaign.campaignId &&
				scene.sessionId === this.currentElement.id.sessionId
		);

		for (let sceneIndex=0; sceneIndex<scenes.length; sceneIndex++){
			await scenes[sceneIndex].relationships.forEach((relationship: RelationshipInterface, name: string) => {
				relationship.description = '';
				if (!this.currentElement.relationships.has(name)) this.currentElement.relationships.set(name, relationship);
			});
			await scenes[sceneIndex].reverseRelationships.forEach((relationship: RelationshipInterface, name: string) => {
				relationship.description = '';
				if (!this.currentElement.reverseRelationships.has(name)) this.currentElement.relationships.set(name, relationship);
			});
		}

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
