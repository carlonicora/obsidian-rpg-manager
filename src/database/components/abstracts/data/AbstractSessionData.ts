import {SessionDataInterface} from "../../interfaces/data/SessionDataInterface";
import {SessionMetadataInterface} from "../../../interfaces/metadata/components/SessionMetadataInterface";
import {AbtStage} from "../../../../enums/AbtStage";
import {Plots} from "../../../plots/Plots";

export class AbstractSessionData extends Plots implements SessionDataInterface {
	protected metadata: SessionMetadataInterface;

	public get irl(): Date | undefined {
		return (this.metadata.data?.irl ? new Date(this.metadata.data?.irl) : undefined);
	}

	public get abtStage(): AbtStage|undefined {
		if (this.metadata.data?.abtStage === undefined) return undefined;
		return this.factories.abtStage.createAbtStage(this.metadata.data.abtStage);
	}
}
