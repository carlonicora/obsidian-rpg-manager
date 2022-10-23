import {SessionDataInterface} from "../interfaces/SessionDataInterface";
import {SessionMetadataInterface} from "../interfaces/SessionMetadataInterface";
import {AbtStage} from "../../../../plots/enums/AbtStage";
import {Plots} from "../../../../plots/Plots";
import {DateHelper} from "../../../../helpers/DateHelper";
import {DateInterface} from "../../../../services/date/interfaces/DateInterface";
import {DateService} from "../../../../services/date/DateService";

export class AbstractSessionData extends Plots implements SessionDataInterface {
	protected metadata: SessionMetadataInterface;

	public get irl(): DateInterface | undefined {
		return this.api.service.get(DateService)?.getDate(
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
