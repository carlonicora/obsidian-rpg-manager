import {ComponentsManagerInterface} from "./interfaces/ComponentsManagerInterface";
import {ComponentClassInterface} from "./interfaces/ComponentClassInterface";
import {ComponentInterface} from "./interfaces/ComponentInterface";
import {ViewClassInterface} from "../viewsManager/interfaces/ViewClassInterface";
import {NewViewType} from "../../core/enums/NewViewType";
import {RpgManagerApiInterface} from "../interfaces/RpgManagerApiInterface";

export class ComponentsManager implements ComponentsManagerInterface {
	private _components: Map<ComponentClassInterface<any>, ComponentInterface> = new Map<ComponentClassInterface<any>, ComponentInterface>();

	constructor(
		private _api: RpgManagerApiInterface,
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
		const component: ComponentInterface = new componentClass(this._api);
		this._components.set(componentClass, component);

		window.RpgManagerAPI?.models.register(component.model, component.type, component.campaignSettings);

		component.views.forEach((viewType:NewViewType, view: ViewClassInterface) => {
			window.RpgManagerAPI?.views.register(view, viewType, component.type, component.campaignSettings);
		});
	}
}
