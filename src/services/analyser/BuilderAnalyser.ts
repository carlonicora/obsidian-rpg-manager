import {AbstractAnalyser} from "./abstracts/AbstractAnalyser";
import {App} from "obsidian";
import {AbtStage} from "../plots/enums/AbtStage";
import {AnalyserDataImportInterface} from "./interfaces/AnalyserDataImportInterface";
import {ComponentType} from "../../core/enums/ComponentType";

export class BuilderAnalyser extends AbstractAnalyser {
	protected type: ComponentType = ComponentType.Act;

	constructor(
		app: App,
		dataList: AnalyserDataImportInterface[],
		abtStage: AbtStage|undefined,
	) {
		super(app, abtStage);

		this.rawData = dataList;
		super.ingestData();
	}
}
