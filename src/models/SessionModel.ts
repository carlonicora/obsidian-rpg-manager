import {AbstractModel} from "../abstracts/AbstractModel";
import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {SessionInterface} from "../interfaces/data/SessionInterface";
import {SceneInterface} from "../interfaces/data/SceneInterface";
import {RecordType} from "../enums/RecordType";
import {RelationshipInterface} from "../interfaces/RelationshipInterface";
import {SorterComparisonElement} from "../database/SorterComparisonElement";

export class SessionModel extends AbstractModel {
	protected currentElement: SessionInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		const scenes = await this.database.read<SceneInterface>(
			(scene: SceneInterface) =>
				scene.id.type === RecordType.Scene &&
				scene.id.campaignId === this.currentElement.campaign.campaignId &&
				scene.sessionId === this.currentElement.id.sessionId,
			).sort(this.factories.sorter.create<SceneInterface>([
				new SorterComparisonElement((scene: SceneInterface) => scene.id.adventureId),
				new SorterComparisonElement((scene: SceneInterface) => scene.id.actId),
				new SorterComparisonElement((scene: SceneInterface) => scene.id.sceneId),
			]));

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
		await this.addRelationships(RecordType.NonPlayerCharacter);
		await this.addRelationships(RecordType.Faction);
		await this.addRelationships(RecordType.Clue);
		await this.addRelationships(RecordType.Location);
		await this.addRelationships(RecordType.Event);

		return this.response;
	}
}
