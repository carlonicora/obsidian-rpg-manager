import {AbstractComponentV2} from "../abstracts/AbstractComponentV2";
import {SessionV2Interface} from "./interfaces/SessionV2Interface";
import {ComponentType} from "../../enums/ComponentType";
import {AbtStage} from "../../enums/AbtStage";
import {SessionMetadataInterface} from "../metadatas/interfaces/SessionMetadataInterface";
import {ComponentStage} from "./enums/ComponentStage";

export class SessionV2 extends AbstractComponentV2 implements SessionV2Interface {
	protected metadata: SessionMetadataInterface;
	public stage: ComponentStage = ComponentStage.Run;

	get abtStage(): AbtStage | undefined {
		return (this.metadata.abtStage);
	}

	get irl(): Date | undefined {
		return (this.metadata.irl ? new Date(this.metadata.irl) : undefined);
	}

	get nextSession(): SessionV2Interface | null {
		return this._adjacentSession(true);
	}

	get previousSession(): SessionV2Interface | null {
		return this._adjacentSession(false);
	}

	private _adjacentSession(
		next: boolean,
	): SessionV2Interface | null {
		const sessionId = this.id.sessionId;
		if (sessionId === undefined) return null;

		const response = this.databaseV2.read<SessionV2Interface>((session: SessionV2Interface) =>
			session.id.type === ComponentType.Session &&
			session.id.campaignId === this.id.campaignId &&
			session.id.sessionId === (next ? sessionId + 1 : sessionId -1)
		);

		return response[0] ?? null;
	}
}
