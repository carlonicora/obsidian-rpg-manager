import {AnalyserReportInterface} from "../interfaces/AnalyserReportInterface";
import {AnalyserReportDetailInterface} from "../interfaces/AnalyserReportDetailInterface";
import {AnalyserReportDetail} from "./AnalyserReportDetail";
import {AnalyserDetailType} from "../enums/AnalyserDetailType";

export class AnalyserReport implements AnalyserReportInterface {
	public excitement: AnalyserReportDetailInterface;
	public activity: AnalyserReportDetailInterface;
	public variety: AnalyserReportDetailInterface;
	public interest: AnalyserReportDetailInterface;
	public duration: AnalyserReportDetailInterface;

	private _score: number;
	private _description: string;

	private _reportDetails: Map<AnalyserDetailType, AnalyserReportDetailInterface>;

	constructor(
	) {
		this.excitement = new AnalyserReportDetail();
		this.activity = new AnalyserReportDetail();
		this.variety = new AnalyserReportDetail();
		this.interest = new AnalyserReportDetail();
		this.duration = new AnalyserReportDetail();

		this._reportDetails = new Map<AnalyserDetailType, AnalyserReportDetailInterface>([
			[AnalyserDetailType.Activity, this.activity],
			[AnalyserDetailType.Duration, this.duration],
			[AnalyserDetailType.Excitement, this.excitement],
			[AnalyserDetailType.Interest, this.interest],
			[AnalyserDetailType.Variety, this.variety],
		]);
	}

	get score(): number {

	}

	get description(): string {
		return this._description;
	}

	set description(description: string) {
		this._description = description;
	}

	get type(): string {

	}
}
