import {SessionDataInterface} from "../interfaces/SessionDataInterface";
import {SessionMetadataInterface} from "../interfaces/SessionMetadataInterface";
import {AbtStage} from "../../../services/plotsServices/enums/AbtStage";
import {Plots} from "../../../services/plotsServices/Plots";
import {DateInterface} from "../../../../REFACTOR/services/dateService/interfaces/DateInterface";
import {DateService} from "../../../../REFACTOR/services/dateService/DateService";

export class AbstractSessionData extends Plots implements SessionDataInterface {
	protected metadata: SessionMetadataInterface;

	public get irl(): DateInterface | undefined {
		return this.api.service(DateService).getDate(
			this.metadata.data?.irl,
			undefined,
			this,
		);
	}

	public get abtStage(): AbtStage|undefined {
		if (this.metadata.data?.abtStage == undefined) return undefined;
		return this.factories.abtStage.createAbtStage(this.metadata.data.abtStage);
	}

	public get targetDuration(): number|undefined {
		return this.metadata.data?.targetDuration;
	}
}
