import {AbstractAnalyser} from "./abstracts/AbstractAnalyser";
import {App} from "obsidian";
import {AbtStage} from "../plots/enums/AbtStage";
import {SceneInterface} from "../components/components/scene/interfaces/SceneInterface";
import {ComponentType} from "../components/enums/ComponentType";
import {SorterComparisonElement} from "../databases/SorterComparisonElement";
import {SessionInterface} from "../components/components/session/interfaces/SessionInterface";

export class SessionAnalyser extends AbstractAnalyser {
	protected type: ComponentType = ComponentType.Session;

	constructor(
		app: App,
		session: SessionInterface,
		abtStage: AbtStage|undefined,
	) {
		super(app, abtStage);

		const singleSession: SessionInterface = this.database.readSingle<SessionInterface>(ComponentType.Session, session.id);
		if (singleSession.targetDuration != undefined) this.targetDuration = singleSession.targetDuration;

		const sceneList = this.database.read<SceneInterface>(
			(scene: SceneInterface) =>
				scene.id.type === ComponentType.Scene &&
				scene.id.campaignId === session.id.campaignId &&
				scene.session?.id.sessionId === session.id.sessionId,
		).sort(
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
