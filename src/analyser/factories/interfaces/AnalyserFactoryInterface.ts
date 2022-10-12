import {AnalyserInterface} from "../../interfaces/AnalyserInterface";
import {AnalyserDataImportInterface} from "../../interfaces/AnalyserDataImportInterface";
import {SceneInterface} from "../../../components/components/scene/interfaces/SceneInterface";
import {ActInterface} from "../../../components/components/act/interfaces/ActInterface";
import {SessionInterface} from "../../../components/components/session/interfaces/SessionInterface";
import {AbtStage} from "../../../plots/enums/AbtStage";

export interface AnalyserFactoryInterface {
	createBuilder(
		data: Array<AnalyserDataImportInterface>,
		abtStage?: AbtStage,
	): AnalyserInterface;

	createScene(
		scene: SceneInterface,
		abtStage: AbtStage|undefined,
	): AnalyserInterface;

	createAct(
		act: ActInterface,
		abtStage: AbtStage|undefined,
	): AnalyserInterface;

	createSession(
		session: SessionInterface,
		abtStage: AbtStage|undefined,
	): AnalyserInterface;
}
