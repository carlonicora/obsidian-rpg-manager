import {AnalyserServiceInterface} from "./interfaces/AnalyserServiceInterface";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {SceneType} from "./enums/SceneType";
import {AnalyserDataImportInterface} from "./interfaces/AnalyserDataImportInterface";
import {AbtStage} from "../plotsService/enums/AbtStage";
import {AnalyserInterface} from "./interfaces/AnalyserInterface";
import {SceneInterface} from "../../components/scene/interfaces/SceneInterface";
import {ActInterface} from "../../components/act/interfaces/ActInterface";
import {SessionInterface} from "../../components/session/interfaces/SessionInterface";
import {BuilderAnalyser} from "./analysers/BuilderAnalyser";
import {SceneAnalyser} from "./analysers/SceneAnalyser";
import {ActAnalyser} from "./analysers/ActAnalyser";
import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {SessionAnalyser} from "./analysers/SessionAnalyser";

export class AnalyserService extends AbstractService implements AnalyserServiceInterface, ServiceInterface {
	createAct(
		act: ActInterface,
		abtStage: AbtStage|undefined,
	): AnalyserInterface {
		return new ActAnalyser(this.api, act, abtStage);
	}

	createBuilder(
		data: AnalyserDataImportInterface[],
		abtStage?: AbtStage,
	): AnalyserInterface {
		return new BuilderAnalyser(this.api, data, abtStage);
	}

	createScene(
		scene: SceneInterface,
		abtStage: AbtStage|undefined,
	): AnalyserInterface {
		return new SceneAnalyser(this.api, scene, abtStage);
	}

	createSession(
		session: SessionInterface,
		abtStage: AbtStage|undefined,
	): AnalyserInterface {
		return new SessionAnalyser(this.api, session, abtStage);
	}

	public getReadableSceneType(
		type: SceneType,
	): string {
		return SceneType[type].toString().toLowerCase();
	}

	public getSceneType(
		readableContentType: string,
	): SceneType {
		readableContentType = readableContentType[0].toUpperCase() + readableContentType.substring(1).toLowerCase();
		readableContentType = readableContentType.replaceAll('combat', 'Combat');

		return SceneType[readableContentType as keyof typeof SceneType];
	}
}
