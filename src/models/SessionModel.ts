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

		await this.addRelationships(RecordType.Music);
		await this.addRelationships(RecordType.Character);
		await this.addRelationships(RecordType.Faction);
		await this.addRelationships(RecordType.Clue);
		await this.addRelationships(RecordType.Location);
		await this.addRelationships(RecordType.Event);

		return this.response;
	}
}
