import {ComponentInterface} from "../interfaces/ComponentInterface";
import {RelationshipInterface} from "../../relationships/interfaces/RelationshipInterface";
import {DatabaseInterface} from "../../databases/interfaces/DatabaseInterface";
import {AbstractComponentData} from "./AbstractComponentData";
import {AbtPlot} from "../../plots/AbtPlot";
import {AbtInterface} from "../../plots/interfaces/AbtInterface";
import {StoryCircleInterface} from "../../plots/interfaces/StoryCircleInterface";
import {StoryCirclePlot} from "../../plots/StoryCirclePlot";
import {RelationshipListInterface} from "../../relationships/interfaces/RelationshipListInterface";
import {RelationshipList} from "../../relationships/RelationshipList";
import {ControllerMetadataDataInterface} from "../../controller/interfaces/ControllerMetadataDataInterface";
import {
	ControllerMetadataRelationshipInterface
} from "../../controller/interfaces/ControllerMetadataRelationshipInterface";
import {FileManipulatorInterface} from "../../manipulators/interfaces/FileManipulatorInterface";
import {Md5} from "ts-md5";
import {ComponentNotFoundError} from "../../errors/ComponentNotFoundError";
import {RelationshipType} from "../../relationships/enums/RelationshipType";


export abstract class AbstractComponent extends AbstractComponentData implements ComponentInterface {
	private relationships: RelationshipListInterface = new RelationshipList();
	protected fileManipulator: FileManipulatorInterface;

	private previousMetadata: string|Int32Array|undefined;
	private previousRelationships: string|Int32Array|undefined;
	private previousRelationshipsStringified: Array<any>;

	public async readMetadata(
	): Promise<void> {
		const fileManipulator = await this.factories.fileManipulator.create(this.file)

		if (fileManipulator !== undefined) {
			this.fileManipulator = fileManipulator;
			return this.manipulators.codeblock.read(this.fileManipulator, this)
				.then((metadata: ControllerMetadataDataInterface) => {
					this.metadata = metadata;
					this.initialiseData();
					return this.initialiseRelationships()
						.then(() => {
							return;
						});
				})
				.catch((e) => {
					if (e.message === 'INVALID YAML') return;
				});
		}
	}

	public async initialiseData(
	): Promise<void> {
		return;
	}

	public validateHierarchy(
	): void {
		try {
			this.campaign;
		} catch (e) {
			throw new ComponentNotFoundError(this.app, this.id);
		}
	}

	public async initialiseRelationships(
	): Promise<void> {
		if (this.metadata.relationships !== undefined){
			await this.metadata.relationships.forEach((relationshipMetadata: ControllerMetadataRelationshipInterface) => {
				if (relationshipMetadata.path !== this.file.path) {
					this.relationships.add(
						this.factories.relationship.createFromMetadata(relationshipMetadata),
						false,
					);
				}
			})
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
				if (relationship.component === undefined) {
					const path = relationship.path;
					if (relationship.type !== RelationshipType.Undefined){
						relationship.component = (database ?? this.database).readByPath(path);
					} else {
						const maybeRelatedComponents = (database ?? this.database).read<ComponentInterface>((component: ComponentInterface) =>
							component.file.basename === path
						);

						if (maybeRelatedComponents.length === 1) {
							/**
							 * @TODO: what is the defaultRelationship for this.id.type?
							 */
							relationship.type = RelationshipType.Unidirectional;
							relationship.component = maybeRelatedComponents[0];
							relationship.path = maybeRelatedComponents[0].file.path;
						}
					}
				}
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

	public touch(
	): boolean {
		const md5 = new Md5();
		md5.appendStr(JSON.stringify(this.metadata));
		const metadataMd5 = md5.end();
		const relationshipsMd5 = this.relationships.md5();

		if (this.previousMetadata !== metadataMd5 || this.previousRelationships !== relationshipsMd5){
			this.previousMetadata = metadataMd5;
			this.previousRelationships = relationshipsMd5;
			this.previousRelationshipsStringified = structuredClone(this.relationships.stringified);

			if (this.version === undefined) this.version = 0;
			this.version++;

			return true;
		}

		return false;
	}
}
