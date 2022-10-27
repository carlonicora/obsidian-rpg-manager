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
		const sessionId = this.id.sessionId;

		if (sessionId === undefined)
			return null;

		const response = this.api.database.read<SessionInterface>((session: SessionInterface) =>
			session.id.type === ComponentType.Session &&
			session.id.campaignId === this.id.campaignId &&
			session.id.sessionId === (next ? sessionId + 1 : sessionId -1)
		);

		return response[0] ?? null;
	}
}
