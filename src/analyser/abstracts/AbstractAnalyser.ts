import {AnalyserInterface} from "../interfaces/AnalyserInterface";
import {AbstractRpgManager} from "../../abstracts/AbstractRpgManager";
import {App} from "obsidian";
import {AbtStage} from "../../plots/enums/AbtStage";
import {AnalyserDataImportInterface} from "../interfaces/AnalyserDataImportInterface";
import {SceneInterface} from "../../components/components/scene/interfaces/SceneInterface";
import {SceneType} from "../../components/enums/SceneType";
import {AnalyserReportInterface} from "../interfaces/AnalyserReportInterface";
import {AnalyserDataInterface} from "../interfaces/AnalyserDataInterface";
import {AnalyserData} from "../AnalyserData";
import {AnalyserMinimalReporter} from "../reporters/AnalyserMinimalReporter";
import {AnalyserReportType} from "../enums/AnalyserReportType";
import {AnalyserExtendedReporter} from "../reporters/AnalyserExtendedReporter";

export abstract class AbstractAnalyser extends AbstractRpgManager implements AnalyserInterface {
	protected data: Array<AnalyserDataImportInterface>;
	protected isSingleScene = false;

	private dataList: Array<AnalyserDataImportInterface>;
	private analyserData: AnalyserDataInterface;

	constructor(
		app: App,
		protected abtStage: AbtStage|undefined,
	) {
		super(app);
		this.data = [];
		this.analyserData = new AnalyserData();
	}

	public set targetDuration(duration: number) {
		this.analyserData.totalTargetDuration = duration;
	}

	public getReport(
		type: AnalyserReportType,
	): AnalyserReportInterface {
		switch (type) {
			case AnalyserReportType.Minimal:
				return new AnalyserMinimalReporter(this.analyserData).generateReport();
			case AnalyserReportType.Extended:
				return new AnalyserExtendedReporter(this.analyserData).generateReport();
		}
	}

	protected _ingestData(
	): void {
		if (this.dataList.length > 0) {
			this.analyserData.dataLength = this.dataList.length;
			let previousType: SceneType | undefined = undefined;
			this.dataList.forEach((data: AnalyserDataImportInterface) => {
				this.analyserData.totalRunningTime += data.currentDuration ?? 0;
				this.analyserData.addExpectedRunningTime(data.expectedDuration);
				if (data.isExciting)
					this.analyserData.addExpectedExcitmentDuration(data.expectedDuration);

				if (data.isActive)
					this.analyserData.addActiveScene();

				this.analyserData.addSceneType(data.type);
			});
		}
	}

	protected _convertScene(
		scene: SceneInterface,
	): AnalyserDataImportInterface {
		const response: AnalyserDataImportInterface = {
			isExciting: false,
			isActive: false,
			expectedDuration: 0,
		};

		response.currentDuration = scene.currentDuration;
		response.isExciting = scene.isExciting;
		response.expectedDuration = scene.expectedDuration;
		response.isActive = scene.isActive;
		response.type = scene.sceneType;

		return response;
	}

	protected _addScene(
		scene: SceneInterface,
	): void {
		this.data.push(this._convertScene(scene));
	}

	protected _addScenesList(
		scenes: Array<SceneInterface>,
	): void {
		scenes.forEach((scene: SceneInterface) => {
			this._addScene(scene);
		});
	}
}
