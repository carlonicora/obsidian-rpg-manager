import {Plots} from "../../../services/plotsService/models/Plots";
import {ActDataInterface} from "../interfaces/ActDataInterface";
import {ActMetadataInterface} from "../interfaces/ActMetadataInterface";
import {AbtStage} from "../../../services/plotsService/enums/AbtStage";
import {PlotService} from "../../../services/plotsService/PlotService";

export abstract class AbstractActData extends Plots implements  ActDataInterface {
	protected metadata: ActMetadataInterface;

	public get abtStage(): AbtStage|undefined {
		if (this.metadata.data?.abtStage == undefined || this.metadata.data.abtStage === '')
			return undefined;

		return this.api.service(PlotService).getAbtStage(this.metadata.data.abtStage);
	}
}
