import {ComponentInterface} from "../interfaces/ComponentInterface";
import {RelationshipInterface} from "../relationships/interfaces/RelationshipInterface";
import {DatabaseInterface} from "../interfaces/DatabaseInterface";
import {AbstractComponentData} from "./AbstractComponentData";
import {AbtPlot} from "../plots/AbtPlot";
import {AbtInterface} from "../plots/interfaces/AbtInterface";
import {StoryCircleInterface} from "../plots/interfaces/StoryCircleInterface";
import {StoryCirclePlot} from "../plots/StoryCirclePlot";

export abstract class AbstractComponent extends AbstractComponentData implements ComponentInterface {
	public async readMetadata(
	): Promise<void> {
		return this.dataManipulators.metadata.read(this.file)
			.then((metadata: any) => {
				this.metadata = metadata;
				return;
			});
	}

	public get link(): string {
		return '[[' + this.file.basename + ']]'
	}

	public getRelationships(
		database: DatabaseInterface|undefined = undefined,
	): Array<RelationshipInterface> {
		if (this.metadata.relationships === undefined) return [];

		this.metadata.relationships.forEach((relationship: RelationshipInterface) => {
			if (relationship.component === undefined) relationship.component = (database ?? this.database).readByPath(relationship.path);
		});

		return this.metadata.relationships;
	}

	public addRelationship(
		relationship: RelationshipInterface,
		database: DatabaseInterface|undefined=undefined,
	): void {
		this.getRelationships(database).push(relationship);
	}

	public existsInRelationships(
		relationships: Array<RelationshipInterface>,
	): boolean {
		for (let relationshipCounter=0; relationshipCounter<relationships.length; relationshipCounter++){
			if (relationships[relationshipCounter].path === this.file.path) return true;
		}

		return false;
	}

	public get hasStoryCirclePlot(): boolean {
		return this.metadata?.plot?.storycircle !== undefined;
	}

	public get hasAbtPlot(): boolean {
		return this.metadata?.plot?.abt !== undefined;
	}

	get abt(): AbtInterface {
		return new AbtPlot({});
	}

	get storyCircle(): StoryCircleInterface {
		return new StoryCirclePlot({});
	}
}
