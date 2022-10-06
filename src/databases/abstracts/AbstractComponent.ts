import {ComponentInterface} from "../interfaces/ComponentInterface";
import {RelationshipInterface} from "../../relationships/interfaces/RelationshipInterface";
import {DatabaseInterface} from "../interfaces/DatabaseInterface";
import {AbstractComponentData} from "./AbstractComponentData";
import {AbtPlot} from "../../plots/AbtPlot";
import {AbtInterface} from "../../plots/interfaces/AbtInterface";
import {StoryCircleInterface} from "../../plots/interfaces/StoryCircleInterface";
import {StoryCirclePlot} from "../../plots/StoryCirclePlot";
import {RelationshipListInterface} from "../../relationships/interfaces/RelationshipListInterface";
import {RelationshipList} from "../../relationships/RelationshipList";
import {ControllerMetadataDataInterface} from "../../metadatas/controllers/ControllerMetadataDataInterface";
import {
	ControllerMetadataRelationshipInterface
} from "../../metadatas/controllers/ControllerMetadataRelationshipInterface";

export abstract class AbstractComponent extends AbstractComponentData implements ComponentInterface {
	private relationships: RelationshipListInterface = new RelationshipList();

	public async readMetadata(
	): Promise<void> {
		this.relationships = new RelationshipList();
		return this.manipulators.metadata.read(this.file, this)
			.then((metadata: ControllerMetadataDataInterface) => {
				this.metadata = metadata;
				return this.initialiseRelationships()
					.then(() => {
						return;
					});
			});
	}

	public async initialiseRelationships(
	): Promise<void> {
		this.relationships = new RelationshipList();

		if (this.metadata.relationships !== undefined){
			this.metadata.relationships.forEach((relationshipMetadata: ControllerMetadataRelationshipInterface) => {
				this.relationships.add(
					this.factories.relationship.createFromMetadata(relationshipMetadata),
					false,
				);
			});
		}
	}

	public get link(): string {
		return '[[' + this.file.basename + ']]'
	}

	public getRelationships(
		database: DatabaseInterface|undefined = undefined,
	): RelationshipListInterface {
		this.relationships
			.filter((relationship: RelationshipInterface) => relationship.component === undefined)
			.forEach((relationship: RelationshipInterface) => {
				if (relationship.component === undefined) relationship.component = (database ?? this.database).readByPath(relationship.path);
			});

		return this.relationships;
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
