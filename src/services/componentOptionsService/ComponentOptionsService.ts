import {AbstractService} from "../../api/servicesManager/abstracts/AbstractService";
import {ComponentOptionsServiceInterface} from "./interfaces/ComponentOptionsServiceInterface";
import {ServiceInterface} from "../../api/servicesManager/interfaces/ServiceInterface";
import {ModelInterface} from "../../api/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../core/enums/ComponentType";
import {RelationshipsSelectionModal} from "../relationshipsService/modals/RelationshipsSelectionModal";
import {IdSwitcherModal} from "../idService/modals/IdSwitcherModal";
import {GalleryManagementModal} from "../galleryService/modals/GalleryManagementModal";

export class ComponentOptionsService extends AbstractService implements ComponentOptionsServiceInterface, ServiceInterface {
	public render(
		model: ModelInterface,
		containerEl: HTMLElement
	): void {
		this._addFunctionality(containerEl, 'Relationships', 'Manage Relationship')
			.addEventListener("click", () => {
				new RelationshipsSelectionModal(this.api, model).open();
			});

		this._addSeparator(containerEl);

		this._addFunctionality(containerEl,'Move', 'Move your ' + ComponentType[model.id.type])
			.addEventListener("click", () => {
				new IdSwitcherModal(this.api, model.file).open();
			});

		this._addSeparator(containerEl);

		this._addFunctionality(containerEl, 'Images', 'Gallery Manager')
			.addEventListener("click", () => {
				new GalleryManagementModal(this.api, model).open();
			});
	}

	private _addFunctionality(
		containerEl: HTMLElement,
		title: string,
		description: string,
	): HTMLSpanElement {
		const crumb = containerEl.createDiv({cls: 'crumb'});
		crumb.createDiv({cls: 'title', text: title});
		const value = crumb.createDiv({cls: 'value'});
		return value.createSpan({cls: 'rpgm-edit-icon', text: description});
	}

	private _addSeparator(
		containerEl: HTMLElement,
	): void {
		const separator = containerEl.createDiv({cls: 'separator'});
		separator.createDiv({cls: 'title', text: ' '});
		const separatorText = separator.createDiv({cls: 'value'});
		separatorText.createEl('p').textContent = '|';
	}
}
