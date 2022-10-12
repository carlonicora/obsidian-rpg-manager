import {AnalyserDataInterface} from "../interfaces/AnalyserDataInterface";
import {AnalyserReporterInterface} from "../interfaces/AnalyserReporterInterface";
import {AnalyserReportInterface} from "../interfaces/AnalyserReportInterface";
import {AbtStage} from "../../plots/enums/AbtStage";
import {AnalyserDetailType} from "../enums/AnalyserDetailType";
import {AnalyserReportDetailInterface} from "../interfaces/AnalyserReportDetailInterface";
import {AnalyserReport} from "../reports/AnalyserReport";
import {AnalyserThresholdResult} from "../enums/AnalyserThresholdResult";

export class AbstractAnalyserReporter implements AnalyserReporterInterface {
	protected report: AnalyserReportInterface;

	protected descriptions: Map<AnalyserDetailType|undefined, Map<AnalyserThresholdResult, string>>;

	private abtStageExcitementThreshold: Map<AbtStage, number> = new Map<AbtStage, number>([
		[AbtStage.Need, 35],
		[AbtStage.And, 35],
		[AbtStage.But, 75],
		[AbtStage.Therefore, 50],
	]);

	private abtStageActivityThreshold: Map<AbtStage, number> = new Map<AbtStage, number>([
		[AbtStage.Need, 35],
		[AbtStage.And, 75],
		[AbtStage.But, 50],
		[AbtStage.Therefore, 75],
	]);

	constructor(
		protected data: AnalyserDataInterface,
	) {
		this.report = new AnalyserReport();

	}

	public generateReport(
	): AnalyserReportInterface {

	}

	private _generateDetail(
		detailType: AnalyserDetailType,
	): AnalyserReportDetailInterface {

	}
}
