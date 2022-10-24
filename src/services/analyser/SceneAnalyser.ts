import {AbstractAnalyser} from "./abstracts/AbstractAnalyser";
import {App} from "obsidian";
import {SceneInterface} from "../../components/scene/interfaces/SceneInterface";
import {AbtStage} from "../plots/enums/AbtStage";
import {ComponentType} from "../../core/enums/ComponentType";

export class SceneAnalyser extends AbstractAnalyser {
	constructor(
		app: App,
		scene: SceneInterface,
		abtStage: AbtStage|undefined,
	) {
		super(app, abtStage);

		this.isSingleScene = true;
		this.addScene(this.database.readSingle<SceneInterface>(ComponentType.Scene, scene.id));

		super.ingestData();
	}
}
