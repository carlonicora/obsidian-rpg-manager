import {AbstractAnalyser} from "../abstracts/AbstractAnalyser";
import {AbtStage} from "../../plotsService/enums/AbtStage";
import {ActInterface} from "../../../components/act/interfaces/ActInterface";
import {SceneInterface} from "../../../components/scene/interfaces/SceneInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {SorterService} from "../../sorterService/SorterService";
import {SorterComparisonElement} from "../../sorterService/SorterComparisonElement";

export class ActAnalyser extends AbstractAnalyser {
	protected type: ComponentType = ComponentType.Act;

	constructor(
		api: RpgManagerApiInterface,
		act: ActInterface,
		abtStage: AbtStage|undefined,
	) {
		super(api, abtStage);

		const sceneList = this.api.database.readChildren<SceneInterface>(ComponentType.Scene, act.index.id)
			.sort(
				this.api.service(SorterService).create<SceneInterface>([
					new SorterComparisonElement((scene: SceneInterface) => scene.index.positionInParent),
				]));

		super.addScenesList(sceneList);
		super.ingestData();
	}
}
