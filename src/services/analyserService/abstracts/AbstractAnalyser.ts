import {AnalyserInterface} from "../interfaces/AnalyserInterface";
import {AbtStage} from "../../plotsService/enums/AbtStage";
import {AnalyserDataImportInterface} from "../interfaces/AnalyserDataImportInterface";
import {SceneInterface} from "../../../components/scene/interfaces/SceneInterface";
import {AnalyserDataInterface} from "../interfaces/AnalyserDataInterface";
import {AnalyserData} from "../analysers/AnalyserData";
import {AnalyserVisualView} from "../views/AnalyserVisualView";
import {AnalyserReportType} from "../enums/AnalyserReportType";
import {AnalyserExtendedView} from "../views/AnalyserExtendedView";
import {AnalyserReport} from "../reports/AnalyserReport";
import {AnalyserViewInterface} from "../interfaces/AnalyserViewInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {AnalyserSceneView} from "../views/AnalyserSceneView";
import {AnalyserSceneBuilderView} from "../views/AnalyserSceneBuilderView";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";

export abstract class AbstractAnalyser implements AnalyserInterface {
	protected rawData: AnalyserDataImportInterface[];
	protected isSingleScene = false;

	private _analyserData: AnalyserDataInterface;
	protected type: ComponentType;

	constructor(
		protected api: RpgManagerApiInterface,
		abtStage: AbtStage|undefined,
	) {
		this.rawData = [];
		this._analyserData = new AnalyserData();
		this._analyserData.abtStage = abtStage;
	}

	get scenesCount(): number {
		return this.rawData.length;
	}

	public set targetDuration(duration: number) {
		this._analyserData.totalTargetDuration = duration;
	}

	public render(
		type: AnalyserReportType,
		containerEl: HTMLDivElement,
	): void {
		const report = new AnalyserReport(this.api, this._analyserData);
		let view: AnalyserViewInterface|undefined = undefined;

		switch(type){
			case AnalyserReportType.Scene:
				view = new AnalyserSceneView(this.api, this.type);
				break;
			case AnalyserReportType.Visual:
				view = new AnalyserVisualView(this.api, this.type);
				break;
			case AnalyserReportType.Extended:
				view = new AnalyserExtendedView(this.api, this.type);
				break;
			case AnalyserReportType.SceneBuilder:
				view = new AnalyserSceneBuilderView(this.api, this.type);
				break;
			default:
				return;
		}

		view.render(report, containerEl);
	}

	protected ingestData(
	): void {
		if (this.rawData.length > 0) {
			this._analyserData.dataLength = this.rawData.length;
			this.rawData.forEach((data: AnalyserDataImportInterface) => {
				this._analyserData.totalRunningTime += data.currentDuration ?? 0;
				this._analyserData.addExpectedRunningTime(data.expectedDuration);
				if (data.isExciting)
					this._analyserData.addExpectedExcitmentDuration(data.expectedDuration);

				if (data.isActive)
					this._analyserData.addActiveScene();

				this._analyserData.addSceneType(data.type);
			});
		}
	}

	protected convertScene(
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

	protected addScene(
		scene: SceneInterface,
	): void {
		this.rawData.push(this.convertScene(scene));
	}

	protected addScenesList(
		scenes: SceneInterface[],
	): void {
		scenes.forEach((scene: SceneInterface) => {
			this.addScene(scene);
		});
	}
}
