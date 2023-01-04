import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {SceneFeedbackInterface} from "../../components/scene/interfaces/SceneFeedbackInterface";
import {SceneFeedbackServiceInterface} from "./interfaces/SceneFeedbackServiceInterface";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {Plugin_2, WorkspaceLeaf} from "obsidian";
import {SceneFeedbackView} from "./staticViews/SceneFeedbackView";
import {SceneInterface} from "../../components/scene/interfaces/SceneInterface";
import {StaticViewType} from "../../managers/staticViewsManager/enums/StaticViewType";

export class SceneFeedbackService extends AbstractService implements SceneFeedbackServiceInterface, ServiceInterface {
	constructor(
		api: RpgManagerApiInterface,
	) {
		super(api);

		(<Plugin_2>this.api.plugin).registerView("SceneFeedbackView", (leaf: WorkspaceLeaf) => new SceneFeedbackView(this.api, leaf));
		this.api.app.workspace.detachLeavesOfType("SceneFeedbackView");
	}

	async destroy(
	): Promise<void> {
		super.destroy();
		this.api.app.workspace.detachLeavesOfType("SceneFeedbackView");
	}

	async openFeedback(
		scene: SceneInterface,
	): Promise<void> {
		this.api.staticViews.createGeneric("SceneFeedbackView", true, [scene]);
	}
}
