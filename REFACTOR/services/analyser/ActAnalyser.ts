import {AbstractAnalyser} from "./abstracts/AbstractAnalyser";
import {App} from "obsidian";
import {AbtStage} from "../../../src/services/plotsServices/enums/AbtStage";
import {ActInterface} from "../../../src/components/act/interfaces/ActInterface";
import {SceneInterface} from "../../../src/components/scene/interfaces/SceneInterface";
import {ComponentType} from "../../../src/core/enums/ComponentType";
import {SorterComparisonElement} from "../../../src/database/SorterComparisonElement";

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
