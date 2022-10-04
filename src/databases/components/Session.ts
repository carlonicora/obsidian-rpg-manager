import {SessionInterface} from "./interfaces/SessionInterface";
import {ComponentType} from "../enums/ComponentType";
import {SessionMetadataInterface} from "../../metadatas/components/SessionMetadataInterface";
import {ComponentStage} from "./enums/ComponentStage";
import {AbstractSessionData} from "./abstracts/data/AbstractSessionData";

export class Session extends AbstractSessionData implements SessionInterface {
	protected metadata: SessionMetadataInterface;
	public stage: ComponentStage = ComponentStage.Run;

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
