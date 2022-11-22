import {AbstractAnalyser} from "../abstracts/AbstractAnalyser";
import {AbtStage} from "../../plotsService/enums/AbtStage";
import {SceneInterface} from "../../../components/scene/interfaces/SceneInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {SessionInterface} from "../../../components/session/interfaces/SessionInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {SorterService} from "../../sorterService/SorterService";
import {SorterComparisonElement} from "../../sorterService/SorterComparisonElement";

export class SessionAnalyser extends AbstractAnalyser {
	protected type: ComponentType = ComponentType.Session;

	constructor(
		api: RpgManagerApiInterface,
		session: SessionInterface,
		abtStage: AbtStage|undefined,
	) {
		super(api, abtStage);

		const singleSession: SessionInterface = this.api.database.readById<SessionInterface>(session.index.id);
		if (singleSession.targetDuration != undefined) this.targetDuration = singleSession.targetDuration;

		const sceneList = this.api.database.read<SceneInterface>(
			(scene: SceneInterface) =>
				scene.index.type === ComponentType.Scene &&
				scene.index.campaignId === session.index.campaignId &&
				scene.session?.index.id === session.index.id,
		).sort(
			this.api.service(SorterService).create<SceneInterface>([
				new SorterComparisonElement((scene: SceneInterface) => scene.index.campaignId),
				new SorterComparisonElement((scene: SceneInterface) => scene.index.parentPosition),
				new SorterComparisonElement((scene: SceneInterface) => scene.index.positionInParent),
			]));

		super.addScenesList(sceneList);
		super.ingestData();
	}
}
