import {AbstractAnalyser} from "./abstracts/AbstractAnalyser";
import {App} from "obsidian";
import {AbtStage} from "../plots/enums/AbtStage";
import {ActInterface} from "../../components/act/interfaces/ActInterface";
import {SceneInterface} from "../../components/scene/interfaces/SceneInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {SorterComparisonElement} from "../../database/SorterComparisonElement";

export class ActAnalyser extends AbstractAnalyser {
	protected type: ComponentType = ComponentType.Act;

	constructor(
		app: App,
		act: ActInterface,
		abtStage: AbtStage|undefined,
	) {
		super(app, abtStage);

		const sceneList = this.database.readList<SceneInterface>(ComponentType.Scene, act.id)
			.sort(
				this.factories.sorter.create<SceneInterface>([
					new SorterComparisonElement((scene: SceneInterface) => scene.id.campaignId),
					new SorterComparisonElement((scene: SceneInterface) => scene.id.adventureId),
					new SorterComparisonElement((scene: SceneInterface) => scene.id.actId),
					new SorterComparisonElement((scene: SceneInterface) => scene.id.sceneId),
				]));

		super.addScenesList(sceneList);
		super.ingestData();
	}
}
