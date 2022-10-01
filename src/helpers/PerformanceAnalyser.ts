import {InfoLog, LogMessageType, WarningLog} from "./Logger";

export enum PerformanceType {
	MetadataRead,
	MetadataUpdate,
	MetadataAnalysis,
}

export class PerformanceAnalyser {
	private static startTime: Map<PerformanceType, number> = new Map<PerformanceType, number>();
	private static timeSpent: Map<PerformanceType, number> = new Map<PerformanceType, number>();

	public static async initialise(
	): Promise<void> {
		this.startTime = new Map<PerformanceType, number>();
		this.timeSpent = new Map<PerformanceType, number>([

		]);
	}

	public static async start(
		type: PerformanceType,
	): Promise<void> {
		if (this.startTime.has(type)) {
			new WarningLog(LogMessageType.Performance, 'A timer for ' + PerformanceType[type] + ' has been started twice');
		} else {
			this.startTime.set(type, Date.now());
		}
	}

	public static async stop(
		type: PerformanceType,
	): Promise<void> {
		const start: number|undefined = this.startTime.get(type);
		if (start === undefined) {
			new WarningLog(LogMessageType.Performance, 'A timer for ' + PerformanceType[type] + ' has been stopped without being started first')
		} else {
			this.timeSpent.set(
				type,
				(this.timeSpent.get(type) ?? 0) + (Date.now() - start)
			);
			this.startTime.delete(type);
		}
	}

	public static async createReport(
	): Promise<void> {
		let report = 'Timing report:\n';
		this.timeSpent.forEach((durationInMilliseconds: number, type: PerformanceType) => {
			report += ' - ' + PerformanceType[type] + ': ' + durationInMilliseconds + 'ms\n';
		});

		new InfoLog(LogMessageType.Performance, report);
	}
}
