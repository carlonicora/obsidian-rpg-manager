import {SessionInterface} from "../interfaces/SessionInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {SessionMetadataInterface} from "../interfaces/SessionMetadataInterface";
import {ComponentStage} from "../../../core/enums/ComponentStage";
import {AbstractSessionData} from "../abstracts/AbstractSessionData";
import {FileManipulatorService} from "../../../services/fileManipulatorService/FileManipulatorService";
import {FileManipulatorInterface} from "../../../services/fileManipulatorService/interfaces/FileManipulatorInterface";
import {
	FilePatternPositionInterface
} from "../../../services/fileManipulatorService/interfaces/FilePatternPositionInterface";
import {DatabaseInterface} from "../../../managers/databaseManager/interfaces/DatabaseInterface";
import {RelationshipListInterface} from "../../../services/relationshipsService/interfaces/RelationshipListInterface";
import {RelationshipInterface} from "../../../services/relationshipsService/interfaces/RelationshipInterface";
import {RelationshipService} from "../../../services/relationshipsService/RelationshipService";
import {RelationshipType} from "../../../services/relationshipsService/enums/RelationshipType";
import {SceneInterface} from "../../scene/interfaces/SceneInterface";
import {RelationshipList} from "../../../services/relationshipsService/RelationshipList";
import {SorterService} from "../../../services/sorterService/SorterService";
import {ActInterface} from "../../act/interfaces/ActInterface";
import {SorterComparisonElement} from "../../../services/sorterService/SorterComparisonElement";
import {SorterType} from "../../../services/searchService/enums/SorterType";
import {CodeblockService} from "../../../services/codeblockService/CodeblockService";

export class SessionModel extends AbstractSessionData implements SessionInterface {
	public stage: ComponentStage = ComponentStage.Run;

	protected metadata: SessionMetadataInterface;

	private _sceneNoteListPattern: FilePatternPositionInterface|undefined = undefined;
	private _fileManipulator: FileManipulatorInterface|undefined;

	public async initialiseData(
	): Promise<void> {
		const pattern: string[] = ['### Storyteller Diary','-', '', '###'];
		this._fileManipulator = await this.api.service(FileManipulatorService).read(this.file);

		if (this._fileManipulator !== undefined)
			this._sceneNoteListPattern = await await this.api.service(FileManipulatorService).patternPosition(this._fileManipulator, pattern);

	}

	get isSceneNoteListAvailable(): boolean {
		return this._sceneNoteListPattern !== undefined;
	}

	public async replaceSceneNoteList(
		content: string[],
	): Promise<void> {
		if (this._fileManipulator !== undefined && this._sceneNoteListPattern !== undefined)
			this.api.service(FileManipulatorService).replacePattern(this._fileManipulator, this._sceneNoteListPattern, content);

	}

	get nextSession(): SessionInterface | null {
		return this._adjacentSession(true);
	}

	get previousSession(): SessionInterface | null {
		return this._adjacentSession(false);
	}

	private _adjacentSession(
		next: boolean,
	): SessionInterface | null {
		try {
			return this.api.database.readNeighbour<SessionInterface>(ComponentType.Session, this.index, !next);
		} catch (e) {
			return null;
		}
	}

	getRelationships(
		database?: DatabaseInterface
	): RelationshipListInterface {
		const response: RelationshipListInterface = new RelationshipList();

		super.getRelationships(database).forEach((relationship: RelationshipInterface) => {
			response.add(relationship);
		});

		this.api.database.read<SceneInterface>((model: SceneInterface) =>
			model.index.campaignId === this.index.campaignId &&
			model.session !== undefined &&
			model.session.index === this.index
		).forEach((model: SceneInterface) => {
			model.getRelationships().forEach((sceneRelationship: RelationshipInterface) => {
				if (sceneRelationship.component !== undefined)
					response.add(this.api.service(RelationshipService).createRelationship(
						RelationshipType.Hierarchy,
						sceneRelationship.path,
						undefined,
						sceneRelationship.component,
					));

			});

			response.add(this.api.service(RelationshipService).createRelationship(
				RelationshipType.Hierarchy,
				model.file.path,
				undefined,
				model,
			));
		});

		return response;
	}

	public async compactScenePositions(
		skipScene?: string,
	): Promise<void> {
		const scenes: SceneInterface[] = this.api.database.read<SceneInterface>((scene: SceneInterface) =>
			scene.index.type === ComponentType.Scene &&
			scene.session?.index.id === this.index.id &&
			(skipScene !== undefined ? scene.index.id !== skipScene : true)
		).sort(this.api.service(SorterService).create<SceneInterface>([
			new SorterComparisonElement((scene: SceneInterface) => scene.positionInSession),
		]));

		for (let index=0; index<scenes.length; index++){
			this.api.service(CodeblockService).addOrUpdate('data.positionInSession', index+1, scenes[index].file);
		}
	}
}
