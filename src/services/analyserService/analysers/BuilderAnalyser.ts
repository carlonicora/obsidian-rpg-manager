import {AbstractAnalyser} from "../abstracts/AbstractAnalyser";
import {AbtStage} from "../../plotsServices/enums/AbtStage";
import {AnalyserDataImportInterface} from "../interfaces/AnalyserDataImportInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";

export class BuilderAnalyser extends AbstractAnalyser {
	protected type: ComponentType = ComponentType.Act;

	constructor(
		api: RpgManagerApiInterface,
		dataList: AnalyserDataImportInterface[],
		abtStage: AbtStage|undefined,
	) {
		super(api, abtStage);

		this.rawData = dataList;
		super.ingestData();
	}
}
