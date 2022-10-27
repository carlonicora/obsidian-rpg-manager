import {SceneType} from "../enums/SceneType";
import {AnalyserDataImportInterface} from "./AnalyserDataImportInterface";
import {AbtStage} from "../../plotsServices/enums/AbtStage";
import {AnalyserInterface} from "./AnalyserInterface";
import {SceneInterface} from "../../../components/scene/interfaces/SceneInterface";
import {ActInterface} from "../../../components/act/interfaces/ActInterface";
import {SessionInterface} from "../../../components/session/interfaces/SessionInterface";

export interface AnalyserServiceInterface {
	createAct(
		act: ActInterface,
		abtStage: AbtStage|undefined,
	): AnalyserInterface;

	createBuilder(
		data: AnalyserDataImportInterface[],
		abtStage?: AbtStage,
	): AnalyserInterface;

	createScene(
		scene: SceneInterface,
		abtStage: AbtStage|undefined,
	): AnalyserInterface;

	createSession(
		session: SessionInterface,
		abtStage: AbtStage|undefined,
	): AnalyserInterface;

	getReadableSceneType(
		type: SceneType,
	): string;

	getSceneType(
		readableContentType: string,
	): SceneType;
}
