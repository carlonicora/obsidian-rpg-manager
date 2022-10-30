import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {ComponentOptionsServiceInterface} from "./interfaces/ComponentOptionsServiceInterface";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {RelationshipsSelectionModal} from "../relationshipsService/modals/RelationshipsSelectionModal";
import {IdSwitcherModal} from "../idService/modals/IdSwitcherModal";
import {GalleryManagementModal} from "../galleryService/modals/GalleryManagementModal";
import {GalleryService} from "../galleryService/GalleryService";
import {CampaignModel} from "../../components/campaign/models/CampaignModel";
import {SessionModel} from "../../components/session/models/SessionModel";

export class ComponentOptionsService extends AbstractService implements ComponentOptionsServiceInterface, ServiceInterface {
	public render(
		model: ModelInterface,
		containerEl: HTMLElement
	): void {
		this._addFunctionality(containerEl, 'Relationship')
			.addEventListener("click", () => {
				new RelationshipsSelectionModal(this.api, model).open();
			});

		this._addSeparator(containerEl);

		this._addFunctionality(containerEl,'Move')
			.addEventListener("click", () => {
				new IdSwitcherModal(this.api, model.file).open();
			});

		this._addSeparator(containerEl);

		this._addFunctionality(containerEl, 'Gallery')
			.addEventListener("click", () => {
				new GalleryManagementModal(this.api, model, this.api.service(GalleryService)).open();
			});

		if (model instanceof CampaignModel){
			this._addSeparator(containerEl);

			//TODO edit onclick
			this._addFunctionality(containerEl, 'Timeline')
				.addEventListener("click", () => {
					new GalleryManagementModal(this.api, model, this.api.service(GalleryService)).open();
				});

		} else if (model instanceof SessionModel){
			this._addSeparator(containerEl);

			//TODO edit onclick
			this._addFunctionality(containerEl, 'Manage Scenes')
				.addEventListener("click", () => {
					new GalleryManagementModal(this.api, model, this.api.service(GalleryService)).open();
				});

		}

		if (!model.isComplete) {
			this._addSeparator(containerEl);

			//TODO edit onclick
			this._addFunctionality(containerEl, 'Complete')
				.addEventListener("click", () => {
					new GalleryManagementModal(this.api, model, this.api.service(GalleryService)).open();
				});

		}
	}

	private _addFunctionality(
		containerEl: HTMLElement,
		description: string,
	): HTMLDivElement {
		return  containerEl.createDiv({cls: 'option', text: description});
	}

	private _addSeparator(
		containerEl: HTMLElement,
	): void {
		containerEl.createDiv({cls: 'separator', text: '|'});
	}
}
