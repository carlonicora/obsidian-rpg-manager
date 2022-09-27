import {AbstractModel} from "../../abstracts/AbstractModel";
import {ResponseDataInterface} from "../../interfaces/response/ResponseDataInterface";
import {SessionInterface} from "../../interfaces/components/SessionInterface";
import {SceneInterface} from "../../interfaces/components/SceneInterface";
import {ComponentType} from "../../enums/ComponentType";
import {RelationshipInterface} from "../../interfaces/RelationshipInterface";
import {SorterComparisonElement} from "../../database/SorterComparisonElement";
import {ComponentInterface} from "../../interfaces/database/ComponentInterface";
import {RelationshipType} from "../../enums/RelationshipType";

export class SessionModel extends AbstractModel {
	protected currentElement: SessionInterface;

	public async generateData(
	): Promise<ResponseDataInterface> {
		const scenes = await this.database.read<SceneInterface>(
			(scene: SceneInterface) =>
				scene.id.type === ComponentType.Scene &&
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

				if (relationship.component?.id.type === ComponentType.Event || relationship.component?.id.type === ComponentType.Clue) this.addSubplotRelationships(relationship.component);
			});
			await scenes[sceneIndex].reverseRelationships.forEach((relationship: RelationshipInterface, name: string) => {
				relationship.description = '';
				if (!this.currentElement.reverseRelationships.has(name)) this.currentElement.relationships.set(name, relationship);
				if (relationship.component?.id.type === ComponentType.Event || relationship.component?.id.type === ComponentType.Clue) this.addSubplotRelationships(relationship.component);
			});
		}

		await this.addRelationships(ComponentType.Subplot, RelationshipType.ReverseInFrontmatter);
		await this.addRelationships(ComponentType.Music);
		await this.addRelationships(ComponentType.Character);
		await this.addRelationships(ComponentType.NonPlayerCharacter);
		await this.addRelationships(ComponentType.Faction);
		await this.addRelationships(ComponentType.Clue);
		await this.addRelationships(ComponentType.Location);
		await this.addRelationships(ComponentType.Event);

		return this.response;
	}

	private addSubplotRelationships(
		record: ComponentInterface,
	): void {
		record.reverseRelationships.forEach((relationship: RelationshipInterface, name: string) => {
			if (
				relationship.type === RelationshipType.ReverseInFrontmatter &&
				relationship.component?.id.type === ComponentType.Subplot
			) {
				if (!this.currentElement.reverseRelationships.has(name)) this.currentElement.reverseRelationships.set(name, relationship);
			}
		});
	}
}
