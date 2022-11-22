import {AbstractAnalyser} from "../abstracts/AbstractAnalyser";
import {SceneInterface} from "../../../components/scene/interfaces/SceneInterface";
import {AbtStage} from "../../plotsService/enums/AbtStage";
import {ComponentType} from "../../../core/enums/ComponentType";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";

export class SceneAnalyser extends AbstractAnalyser {
	constructor(
		api: RpgManagerApiInterface,
		scene: SceneInterface,
		abtStage: AbtStage|undefined,
	) {
		super(api, abtStage);

		this.isSingleScene = true;
		this.addScene(this.api.database.readById<SceneInterface>(scene.index.id));

		super.ingestData();
	}
}
