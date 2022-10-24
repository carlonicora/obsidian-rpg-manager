import {SessionInterface} from "../interfaces/SessionInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {SessionMetadataInterface} from "../interfaces/SessionMetadataInterface";
import {ComponentStage} from "../../../core/enums/ComponentStage";
import {AbstractSessionData} from "../abstracts/AbstractSessionData";
import {FilePatternPositionInterface} from "../../../services/manipulators/interfaces/FilePatternPositionInterface";

export class SessionModel extends AbstractSessionData implements SessionInterface {
	protected metadata: SessionMetadataInterface;
	public stage: ComponentStage = ComponentStage.Run;

	private _sceneNoteListPattern: FilePatternPositionInterface|undefined = undefined;

	public async initialiseData(
	): Promise<void> {
		const pattern: string[] = ['### Storyteller Diary','-', '', '###'];
		this._sceneNoteListPattern = await this.fileManipulator.patternPosition(pattern);
	}

	get isSceneNoteListAvailable(): boolean {
		return this._sceneNoteListPattern !== undefined;
	}

	public async replaceSceneNoteList(
		content: string[],
	): Promise<void> {
		if (this._sceneNoteListPattern !== undefined) this.fileManipulator.replacePattern(this._sceneNoteListPattern, content);
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
		if (sessionId === undefined) return null;

		const response = this.database.read<SessionInterface>((session: SessionInterface) =>
			session.id.type === ComponentType.Session &&
			session.id.campaignId === this.id.campaignId &&
			session.id.sessionId === (next ? sessionId + 1 : sessionId -1)
		);

		return response[0] ?? null;
	}
}
