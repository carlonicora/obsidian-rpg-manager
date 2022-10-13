import {AbstractAnalyser} from "./abstracts/AbstractAnalyser";
import {App} from "obsidian";
import {AbtStage} from "../plots/enums/AbtStage";
import {AnalyserDataImportInterface} from "./interfaces/AnalyserDataImportInterface";

export class BuilderAnalyser extends AbstractAnalyser {
	constructor(
		app: App,
		dataList: Array<AnalyserDataImportInterface>,
		abtStage: AbtStage|undefined,
	) {
		super(app, abtStage);

		this.rawData = dataList;
		super._ingestData();
	}
}
