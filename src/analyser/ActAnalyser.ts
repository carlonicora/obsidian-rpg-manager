import {AbstractAnalyser} from "./abstracts/AbstractAnalyser";
import {App} from "obsidian";
import {AbtStage} from "../plots/enums/AbtStage";
import {ActInterface} from "../components/components/act/interfaces/ActInterface";
import {SceneInterface} from "../components/components/scene/interfaces/SceneInterface";
import {ComponentType} from "../components/enums/ComponentType";
import {SorterComparisonElement} from "../databases/SorterComparisonElement";

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

		super._addScenesList(sceneList);
		super._ingestData();
	}
}
