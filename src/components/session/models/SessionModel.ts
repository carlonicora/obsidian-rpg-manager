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
		const sessionId = this.index.sessionId;

		if (sessionId === undefined)
			return null;

		const response = this.api.database.read<SessionInterface>((session: SessionInterface) =>
			session.index.type === ComponentType.Session &&
			session.index.campaignId === this.index.campaignId &&
			session.index.sessionId === (next ? sessionId + 1 : sessionId -1)
		);

		return response[0] ?? null;
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
}
