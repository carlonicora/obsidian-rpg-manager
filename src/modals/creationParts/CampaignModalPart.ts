import {AbstractModalPart} from "../../abstracts/AbstractModalPart";
import {CampaignSetting} from "../../enums/CampaignSetting";
import {ComponentType} from "../../enums/ComponentType";
import {App} from "obsidian";
import {ModalInterface} from "../../interfaces/ModalInterface";
import {CampaignInterface} from "../../interfaces/components/CampaignInterface";
import {IdInterface} from "../../interfaces/components/IdInterface";

export class CampaignModalPart extends AbstractModalPart {
	private campaigns: CampaignInterface[];

	private campaignSettingsEl: HTMLSelectElement;
	private campaignEl: HTMLSelectElement;
	private campaignErrorEl: HTMLParagraphElement;
	private childEl: HTMLDivElement;

	private currentDateEl: HTMLInputElement;

	constructor(
		app: App,
		modal: ModalInterface,
	) {
		super(app, modal);

		this.campaigns = this.database.readList<CampaignInterface>(ComponentType.Campaign, undefined);
	}

	public async addElement(
		contentEl: HTMLElement,
	): Promise<void> {
		const campaignEl = contentEl.createDiv({cls: 'campaignContainer'});

		if (this.modal.type === ComponentType.Campaign){
			this.addAdditionalElements();
			this.addNewCampaignElements(campaignEl);
		} else {
			if (this.campaigns.length === 0){
				const mainContent = this.modal.getContentEl();
				mainContent.empty();
				mainContent.createEl('h2', {cls: 'rpgm-modal-title', text: 'Main campaign missing'});
				mainContent.createSpan({cls: '', text: 'This Obsidian Vault does not contain a Rpg Manager campaign yet. Before creating a ' + ComponentType[this.modal.type] + ', please initialise your first campaign.'});
			} else {
				this.childEl = contentEl.createDiv({cls: 'child'});
				this.childEl.id = 'CampaignChild';

				this.selectCampaignElements(campaignEl);
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
			this.modal.elementModal = this.factories.modals.create(
				this.modal.campaignSetting,
				this.modal.type,
				this.modal,
			);
			this.modal.elementModal.addElement(
				containerEl,
			)
		} else {
			if (this.modal.type === ComponentType.Adventure || this.modal.type === ComponentType.Act || this.modal.type === ComponentType.Scene) {
				this.modal.adventureModal = this.factories.modals.create(
					this.modal.campaignSetting,
					ComponentType.Adventure,
					this.modal,
				);

				this.modal.adventureModal.addElement(
					containerEl,
				)
			} else if (this.modal.type === ComponentType.Session){
				this.modal.sessionModal = this.factories.modals.create(
					this.modal.campaignSetting,
					ComponentType.Session,
					this.modal,
				);

				this.modal.sessionModal.addElement(
					containerEl,
				)
			}
		}
	}

	public validate(
	): boolean {
		return true;
	}

	private addNewCampaignElements(
		containerEl: HTMLElement,
	): void {
		if (this.modal.campaignId === undefined) {
			this.modal.campaignId = this.factories.id.create(ComponentType.Campaign, 1);
		}

		this.campaigns.forEach((campaign: CampaignInterface) => {
			if (this.modal.campaignId !== undefined && campaign.campaignId >= this.modal.campaignId.id) {
				this.modal.campaignId.id = (campaign.campaignId + 1);
			}
		});

		containerEl.createEl('label', {text: 'Select Campaign Settings'});
		this.campaignSettingsEl = containerEl.createEl('select');

		Object.keys(CampaignSetting).filter((v) => isNaN(Number(v))).forEach((setting: string) => {
			const campaignSettingOption = this.campaignSettingsEl.createEl('option', {
				text: setting,
				value: setting,
			})

			if (setting === CampaignSetting.Agnostic.toString()){
				campaignSettingOption.selected = true;
			}
		});

		this.selectSetting();

		this.campaignSettingsEl.addEventListener('change', (e: Event) => {
			this.selectSetting();
		});
	}

	private selectCampaignElements(
		containerEl: HTMLElement
	): void {
		const groupElement = containerEl.createDiv({cls: 'group'});

		groupElement.createDiv({cls: 'title', text: 'Campaign'});
		const selectionContainerEl = groupElement.createDiv({cls: 'container'});
		groupElement.createDiv({cls: 'clear'});

		this.campaignEl = selectionContainerEl.createEl('select');
		if (this.campaigns.length > 1) {
			this.campaignEl.createEl('option', {
				text: '',
				value: '',
			}).selected = true;
		}

		this.campaigns.forEach((campaign: CampaignInterface) => {
			const campaignOptionEl = this.campaignEl.createEl('option', {
				text: campaign.name,
				value: campaign.campaignId.toString(),
			});

			if (this.campaigns.length === 1){
				campaignOptionEl.selected = true;
				this.selectCampaign();
			}
		});

		this.campaignEl.addEventListener('change', (e: Event) => {
			this.selectCampaign();
		});

		this.campaignErrorEl = containerEl.createEl('p', {cls: 'error'});
	}

	private selectSetting(
	): void {
		this.modal.campaignSetting = CampaignSetting[this.campaignSettingsEl.value as keyof typeof CampaignSetting];
	}

	private selectCampaign(
	): void {
		const campaignId:IdInterface|undefined = this.factories.id.create(ComponentType.Campaign, this.campaignEl.value);
		if (campaignId !== undefined) this.modal.campaignId = campaignId;

		this.childEl.empty();
		this.loadChild(this.childEl);
	}

	protected async addAdditionalElements(
	): Promise<void> {
		if (this.modal.additionalInformationEl.style.display !== 'block') {
			this.modal.additionalInformationEl.style.display = 'block';
			this.modal.additionalInformationEl.createEl('h2', {
				cls: 'rpgm-modal-title',
				text: 'Additional Information for the ' + ComponentType[this.modal.type]
			});
			this.modal.additionalInformationEl.createEl('label', {text: 'Current Date'});
			this.currentDateEl = this.modal.additionalInformationEl.createEl('input', {type: 'text'});
		}
	}

	public prepareAdditionalInformation(): any {
		return {
			current: this.currentDateEl.value,
		};
	}
}
