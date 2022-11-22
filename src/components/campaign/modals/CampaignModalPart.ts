import {ComponentType} from "../../../core/enums/ComponentType";
import {CampaignInterface} from "../interfaces/CampaignInterface";
import {RpgManagerApiInterface} from "../../../api/interfaces/RpgManagerApiInterface";
import {AbstractModalPart} from "../../../managers/modalsManager/abstracts/AbstractModalPart";
import {ModalInterface} from "../../../core/interfaces/ModalInterface";
import {IndexService} from "../../../services/indexService/IndexService";

export class CampaignModalPart extends AbstractModalPart {
	private _campaigns: CampaignInterface[];

	private _campaignSettingsEl: HTMLSelectElement;
	private _campaignEl: HTMLSelectElement;
	private _campaignErrorEl: HTMLParagraphElement;
	private _childEl: HTMLDivElement;

	// private _currentDateEl: HTMLInputElement;

	constructor(
		api: RpgManagerApiInterface,
		modal: ModalInterface,
	) {
		super(api, modal);

		this._campaigns = this.api.database.readList<CampaignInterface>(ComponentType.Campaign, undefined);
	}

	public async addElement(
		contentEl: HTMLElement,
	): Promise<void> {
		const campaignEl = contentEl.createDiv({cls: 'campaignContainer'});

		if (this.modal.type === ComponentType.Campaign){
			this.addAdditionalElements();
		} else {
			if (this._campaigns.length === 0){
				const mainContent = this.modal.getContentEl();
				mainContent.empty();
				mainContent.createEl('h2', {cls: 'rpgm-modal-title', text: 'Main campaign missing'});
				mainContent.createSpan({cls: '', text: 'This Obsidian Vault does not contain a Rpg Manager campaign yet. Before creating a ' + ComponentType[this.modal.type] + ', please initialise your first campaign.'});
			} else {
				this._childEl = contentEl.createDiv({cls: 'child'});
				this._childEl.id = 'CampaignChild';

				this._selectCampaignElements(campaignEl);
			}

		}

		if (this.modal.type === ComponentType.Campaign){
			this.modal.saver = this;
		}
	}

	public async loadChild(
		containerEl: HTMLElement
	): Promise<void> {
		if (this.modal.type !== ComponentType.Adventure && this.modal.type !== ComponentType.Session && this.modal.type !== ComponentType.Act && this.modal.type !== ComponentType.Scene) {
			this.modal.elementModal = this.api.modals.getPartial(
				this.modal.campaignSetting,
				this.modal.type,
				this.modal,
			);
			this.modal.elementModal.addElement(
				containerEl,
			);
		} else {
			if (this.modal.type === ComponentType.Adventure || this.modal.type === ComponentType.Act || this.modal.type === ComponentType.Scene) {
				this.modal.adventureModal = this.api.modals.getPartial(
					this.modal.campaignSetting,
					ComponentType.Adventure,
					this.modal,
				);

				this.modal.adventureModal.addElement(
					containerEl,
				);
			} else if (this.modal.type === ComponentType.Session){
				this.modal.sessionModal = this.api.modals.getPartial(
					this.modal.campaignSetting,
					ComponentType.Session,
					this.modal,
				);

				this.modal.sessionModal.addElement(
					containerEl,
				);
			}
		}
	}

	public validate(
	): boolean {
		if (this.modal.campaignId === undefined)
			this.modal.campaignId = this.api.service(IndexService).createUUID();

		return true;
	}

	private _selectCampaignElements(
		containerEl: HTMLElement
	): void {
		const groupElement = containerEl.createDiv({cls: 'rpg-manager-modal-grid-navigation-group clearfix'});

		groupElement.createDiv({cls: 'rpg-manager-modal-grid-navigation-group-title', text: 'Campaign'});
		const selectionContainerEl = groupElement.createDiv({cls: 'rpg-manager-modal-grid-navigation-group-container'});

		this._campaignEl = selectionContainerEl.createEl('select');
		if (this._campaigns.length > 1) {
			this._campaignEl.createEl('option', {
				text: '',
				value: '',
			}).selected = true;
		}

		this._campaigns.forEach((campaign: CampaignInterface) => {
			const campaignOptionEl = this._campaignEl.createEl('option', {
				text: campaign.file.basename,
				value: campaign.index.campaignId.toString(),
			});

			if (this._campaigns.length === 1){
				campaignOptionEl.selected = true;
				this._selectCampaign();
			}
		});

		this._campaignEl.addEventListener('change', (e: Event) => {
			this._selectCampaign();
		});

		this._campaignErrorEl = containerEl.createEl('p', {cls: 'error'});
	}

	private _selectCampaign(
	): void {
		this.modal.campaignId = this._campaignEl.value;

		this._childEl.empty();
		this.loadChild(this._childEl);
	}

	protected async addAdditionalElements(
	): Promise<void> {
		/*
		if (this.modal.additionalInformationEl.style.display !== 'block') {
			this.modal.additionalInformationEl.style.display = 'block';
			this.modal.additionalInformationEl.createEl('h2', {
				cls: 'rpgm-modal-title',
				text: 'Additional Information for the ' + ComponentType[this.modal.type]
			});
			this.modal.additionalInformationEl.createEl('label', {text: 'Current Date'});
			this._currentDateEl = this.modal.additionalInformationEl.createEl('input', {type: 'text'});
		}
		 */
	}

	public prepareAdditionalInformation(): any {
		/*
		return {
			current: this._currentDateEl.value,
		};
		*/
	}
}
