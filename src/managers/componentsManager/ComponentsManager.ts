import {ComponentsManagerInterface} from "./interfaces/ComponentsManagerInterface";
import {ComponentInterface} from "./interfaces/ComponentInterface";
import {ViewClassInterface} from "../viewsManager/interfaces/ViewClassInterface";
import {ViewType} from "../viewsManager/enum/ViewType";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {ClassInterface} from "../../api/interfaces/ClassInterface";
import {ModalPartInterface} from "../../core/interfaces/ModalPartInterface";
import {ModalPartClassInterface} from "../modalsManager/interfaces/ModalPartClassInterface";
import {LoggerService} from "../../services/loggerService/LoggerService";
import {LogMessageType} from "../../services/loggerService/enums/LogMessageType";

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

		if (response === undefined) {
			this._api.service(LoggerService).createError(LogMessageType.System, 'The requested component (' + component.name + ') does not exist');
			throw new Error('The requested component (' + component.name + ') does not exist');
		}
		return response;
	}

	public register<T extends ComponentInterface>(
		componentClass: ClassInterface<T>,
	): void {
		const component: ComponentInterface = new componentClass(this._api);
		this._components.set(componentClass, component);

		this._api.models.register(component.model, component.type, component.campaignSettings);

		component.modalParts.forEach((modalPart: ModalPartClassInterface<ModalPartInterface>) => {
			this._api.modals.registerPartial(modalPart, component.campaignSettings, component.type);
		});

		this._api.templates.register(component.template, component.campaignSettings, component.type);

		component.views.forEach((viewType:ViewType, view: ViewClassInterface) => {
			this._api.views.register(view, viewType, component.type, component.campaignSettings);
		});
	}
}
