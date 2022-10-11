import {SessionInterface} from "./interfaces/SessionInterface";
import {ComponentType} from "../../enums/ComponentType";
import {SessionMetadataInterface} from "./interfaces/SessionMetadataInterface";
import {ComponentStage} from "../../enums/ComponentStage";
import {AbstractSessionData} from "./abstracts/AbstractSessionData";
import {FilePatternPositionInterface} from "../../../manipulators/interfaces/FilePatternPositionInterface";

export class Session extends AbstractSessionData implements SessionInterface {
	protected metadata: SessionMetadataInterface;
	public stage: ComponentStage = ComponentStage.Run;

	private sceneNoteListPattern: FilePatternPositionInterface|undefined = undefined;

	public async initialiseData(
	): Promise<void> {
		const pattern: Array<string> = ['### Storyteller Diary','-', '', '###'];
		this.sceneNoteListPattern = await this.fileManipulator.patternPosition(pattern);
	}

	get isSceneNoteListAvailable(): boolean {
		return this.sceneNoteListPattern !== undefined;
	}

	public async replaceSceneNoteList(
		content: Array<string>,
	): Promise<void> {
		if (this.sceneNoteListPattern !== undefined) this.fileManipulator.replacePattern(this.sceneNoteListPattern, content);
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
