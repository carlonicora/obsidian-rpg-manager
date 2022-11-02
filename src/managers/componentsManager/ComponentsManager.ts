import {ComponentsManagerInterface} from "./interfaces/ComponentsManagerInterface";
import {ComponentInterface} from "./interfaces/ComponentInterface";
import {ViewClassInterface} from "../viewsManager/interfaces/ViewClassInterface";
import {ViewType} from "../viewsManager/enum/ViewType";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {ClassInterface} from "../../api/interfaces/ClassInterface";
import {ModalInterface} from "../../core/interfaces/ModalInterface";
import {ModalPartInterface} from "../../core/interfaces/ModalPartInterface";
import {ModalPartClassInterface} from "../modalsManager/interfaces/ModalPartClassInterface";

export class ComponentsManager implements ComponentsManagerInterface {
	private _components: Map<ClassInterface<any>, ComponentInterface> = new Map<ClassInterface<any>, ComponentInterface>();

	constructor(
		private _api: RpgManagerApiInterface,
	) {
	}

	public get<T extends ComponentInterface>(
		component: ClassInterface<T>,
	): T {
		const response = this._components.get(component) as T;

		//TODO change the empty error
		if (response === undefined)
			throw new Error('');

		return response;
	}

	public register<T extends ComponentInterface>(
		componentClass: ClassInterface<T>,
	): void {
		const component: ComponentInterface = new componentClass(this._api);
		this._components.set(componentClass, component);

		this._api.models.register(component.model, component.type, component.campaignSettings);

		component.modals.forEach((modal: ClassInterface<ModalInterface>) => {
			this._api.modals.register(modal, component.campaignSettings, component.type);
		});

		component.modalParts.forEach((modalPart: ModalPartClassInterface<ModalPartInterface>) => {
			this._api.modals.registerPartial(modalPart, component.campaignSettings, component.type);
		});

		this._api.templates.register(component.template, component.campaignSettings, component.type);

		component.views.forEach((viewType:ViewType, view: ViewClassInterface) => {
			this._api.views.register(view, viewType, component.type, component.campaignSettings);
		});
	}
}
