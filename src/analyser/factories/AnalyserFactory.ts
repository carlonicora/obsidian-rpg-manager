import {AbstractFactory} from "../../factories/abstracts/AbstractFactory";
import {AnalyserFactoryInterface} from "./interfaces/AnalyserFactoryInterface";
import {App} from "obsidian";
import {AnalyserDataImportInterface} from "../interfaces/AnalyserDataImportInterface";
import {AnalyserInterface} from "../interfaces/AnalyserInterface";
import {SceneInterface} from "../../components/components/scene/interfaces/SceneInterface";
import {ActInterface} from "../../components/components/act/interfaces/ActInterface";
import {SessionInterface} from "../../components/components/session/interfaces/SessionInterface";
import {AbtStage} from "../../plots/enums/AbtStage";
import {BuilderAnalyser} from "../BuilderAnalyser";
import {SceneAnalyser} from "../SceneAnalyser";
import {ActAnalyser} from "../ActAnalyser";
import {SessionAnalyser} from "../SessionAnalyser";

export class AnalyserFactory extends AbstractFactory implements AnalyserFactoryInterface {
	constructor(
		app: App,
	) {
		super(app);
	}

	public createBuilder(
		data: Array<AnalyserDataImportInterface>,
		abtStage: AbtStage|undefined=undefined,
	): AnalyserInterface {
		return new BuilderAnalyser(this.app, data, abtStage);
	}

	public createScene(
		scene: SceneInterface,
		abtStage: AbtStage|undefined,
	): AnalyserInterface {
		return new SceneAnalyser(this.app, scene, abtStage);
	}

	public createAct(
		act: ActInterface,
		abtStage: AbtStage|undefined,
	): AnalyserInterface {
		return new ActAnalyser(this.app, act, abtStage);
	}

	public createSession(
		session: SessionInterface,
		abtStage: AbtStage|undefined,
	): AnalyserInterface {
		return new SessionAnalyser(this.app, session, abtStage);
	}
}
