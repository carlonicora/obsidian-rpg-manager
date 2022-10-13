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
import {AnalyserMinimalView} from "../views/AnalyserMinimalView";
import {AnalyserReportType} from "../enums/AnalyserReportType";
import {AnalyserExtendedView} from "../views/AnalyserExtendedView";
import {AnalyserReport} from "../reports/AnalyserReport";
import {AnalyserViewInterface} from "../interfaces/AnalyserViewInterface";

export abstract class AbstractAnalyser extends AbstractRpgManager implements AnalyserInterface {
	protected rawData: Array<AnalyserDataImportInterface>;
	protected isSingleScene = false;

	private analyserData: AnalyserDataInterface;

	constructor(
		app: App,
		protected abtStage: AbtStage|undefined,
	) {
		super(app);
		this.rawData = [];
		this.analyserData = new AnalyserData();
	}

	public set targetDuration(duration: number) {
		this.analyserData.totalTargetDuration = duration;
	}

	public render(
		type: AnalyserReportType,
		containerEl: HTMLDivElement,
	): void {
		const report = new AnalyserReport(this.app, this.analyserData);
		let view: AnalyserViewInterface|undefined = undefined;

		switch(type){
			case AnalyserReportType.Minimal:
				view = new AnalyserMinimalView(this.app);
				break;
			case AnalyserReportType.Extended:
				view = new AnalyserExtendedView(this.app);
				break;
			default:
				return;
		}

		view.render(report, containerEl);
	}

	protected _ingestData(
	): void {
		if (this.rawData.length > 0) {
			this.analyserData.dataLength = this.rawData.length;
			let previousType: SceneType | undefined = undefined;
			this.rawData.forEach((data: AnalyserDataImportInterface) => {
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
		this.rawData.push(this._convertScene(scene));
	}

	protected _addScenesList(
		scenes: Array<SceneInterface>,
	): void {
		scenes.forEach((scene: SceneInterface) => {
			this._addScene(scene);
		});
	}
}
