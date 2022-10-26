import {AnalyserInterface} from "../../interfaces/AnalyserInterface";
import {AnalyserDataImportInterface} from "../../interfaces/AnalyserDataImportInterface";
import {SceneInterface} from "../../../../../src/components/scene/interfaces/SceneInterface";
import {ActInterface} from "../../../../../src/components/act/interfaces/ActInterface";
import {SessionInterface} from "../../../../../src/components/session/interfaces/SessionInterface";
import {AbtStage} from "../../../../../src/services/plotsServices/enums/AbtStage";

export interface AnalyserFactoryInterface {
	createBuilder(
		data: AnalyserDataImportInterface[],
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
