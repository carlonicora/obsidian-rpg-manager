import {ComponentManagerInterface} from "./interfaces/ComponentManagerInterface";
import {ComponentClassInterface} from "./interfaces/ComponentClassInterface";
import {App} from "obsidian";
import {ComponentInterface} from "./interfaces/ComponentInterface";
import {NewViewClassInterface} from "../factories/interfaces/NewViewClassInterface";
import {NewViewInterface} from "../../views/interfaces/NewViewInterface";
import {NewViewType} from "../../core/enums/NewViewType";
import {NewModelClassInterface} from "../factories/interfaces/NewModelClassInterface";
import {ComponentModelInterface} from "./interfaces/ComponentModelInterface";
import {CampaignSetting} from "../../components/campaign/enums/CampaignSetting";
import {ComponentType} from "../../core/enums/ComponentType";

export class ComponentManager implements ComponentManagerInterface {
	private _components: Map<ComponentClassInterface<any>, ComponentInterface> = new Map<ComponentClassInterface<any>, ComponentInterface>();

	constructor(
		private _app: App,
	) {
	}

	public get<T extends ComponentInterface>(
		component: ComponentClassInterface<T>,
	): T {
		const response = this._components.get(component) as T;

		//TODO replace error
		if (response === undefined)
			throw new Error('');

		return response;
	}

	public register<T extends ComponentInterface>(
		componentClass: ComponentClassInterface<T>,
	): void {
		const component = new componentClass(this._app);
		this._components.set(componentClass, component);

		window.RpgManagerAPI?.models.register(component.model, component.type, component.campaignSettings);

		component.views.forEach((viewType:NewViewType, view: NewViewClassInterface<NewViewInterface>) => {
			window.RpgManagerAPI?.views.register(view, viewType, component.type, component.campaignSettings);
		});
	}
}
