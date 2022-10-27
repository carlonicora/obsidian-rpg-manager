import {AbstractAnalyser} from "../abstracts/AbstractAnalyser";
import {AbtStage} from "../../plotsServices/enums/AbtStage";
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

		const singleSession: SessionInterface = this.api.database.readSingle<SessionInterface>(ComponentType.Session, session.id);
		if (singleSession.targetDuration != undefined) this.targetDuration = singleSession.targetDuration;

		const sceneList = this.api.database.read<SceneInterface>(
			(scene: SceneInterface) =>
				scene.id.type === ComponentType.Scene &&
				scene.id.campaignId === session.id.campaignId &&
				scene.session?.id.sessionId === session.id.sessionId,
		).sort(
			this.api.service(SorterService).create<SceneInterface>([
				new SorterComparisonElement((scene: SceneInterface) => scene.id.campaignId),
				new SorterComparisonElement((scene: SceneInterface) => scene.id.adventureId),
				new SorterComparisonElement((scene: SceneInterface) => scene.id.actId),
				new SorterComparisonElement((scene: SceneInterface) => scene.id.sceneId),
			]));

		super.addScenesList(sceneList);
		super.ingestData();
	}
}
