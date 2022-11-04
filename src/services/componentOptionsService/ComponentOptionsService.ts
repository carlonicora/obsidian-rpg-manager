import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {ComponentOptionsServiceInterface} from "./interfaces/ComponentOptionsServiceInterface";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";
import {RelationshipsSelectionModal} from "../relationshipsService/modals/RelationshipsSelectionModal";
import {IdSwitcherModal} from "../idService/modals/IdSwitcherModal";
import {GalleryManagementModal} from "../galleryService/modals/GalleryManagementModal";
import {GalleryService} from "../galleryService/GalleryService";
import {CampaignModel} from "../../components/campaign/models/CampaignModel";
import {SessionModel} from "../../components/session/models/SessionModel";
import {SceneSelectionModal} from "../../components/session/modals/SceneSelectionModal";
import {CodeblockService} from "../codeblockService/CodeblockService";
import {StaticViewType} from "../../managers/staticViewsManager/enums/StaticViewType";
import {AdventureModel} from "../../components/adventure/models/AdventureModel";
import {AdventurePlotWizardService} from "../adventurePlotWizardService/AdventurePlotWizardService";
import {ActModel} from "../../components/act/models/ActModel";
import {SceneBuilderService} from "../sceneBuilderService/SceneBuilderService";
import {ComponentType} from "../../core/enums/ComponentType";

export class ComponentOptionsService extends AbstractService implements ComponentOptionsServiceInterface, ServiceInterface {
	public render(
		model: ModelInterface,
		containerEl: HTMLElement
	): void {
		if (model instanceof CampaignModel){
			this._addFunctionality(containerEl, 'Timeline')
				.addEventListener("click", () => {
					this.api.staticViews.create(StaticViewType.Timeline, [model.id]);
				});

		} else {
			if (model instanceof AdventureModel) {
				this._addFunctionality(containerEl, 'Wizard')
					.addEventListener("click", () => {
						this.api.service(AdventurePlotWizardService).open(model.id);
					});

				this._addSeparator(containerEl);
			}

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

			if (model instanceof SessionModel) {
				this._addSeparator(containerEl);

				this._addFunctionality(containerEl, 'Manage Scenes')
					.addEventListener("click", () => {
						new SceneSelectionModal(this.api, model).open();
					});

			}

			if (model instanceof ActModel) {
				const scenes = this.api.database.readList(ComponentType.Scene, model.id);

				if (scenes.length === 0) {
					this._addSeparator(containerEl);

					this._addFunctionality(containerEl, 'Scene Builder')
						.addEventListener("click", () => {
							this.api.service(SceneBuilderService).open(model);
						});

				}
			}
		}

		if (!model.isComplete) {
			this._addSeparator(containerEl);

			this._addFunctionality(containerEl, 'Complete')
				.addEventListener("click", () => {
					this.api.service(CodeblockService).remove('data.complete');
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
