import {AbstractModalComponent} from "../../abstracts/AbstractModalComponent";
import {CampaignSetting} from "../../enums/CampaignSetting";
import {DataType} from "../../enums/DataType";
import {App} from "obsidian";
import {ModalInterface} from "../../interfaces/ModalInterface";
import {CampaignInterface} from "../../interfaces/data/CampaignInterface";

export class CampaignModal extends AbstractModalComponent {
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

		this.campaigns = this.app.plugins.getPlugin('rpg-manager').io.getCampaigns().elements as CampaignInterface[];
	}

	public async addElement(
		contentEl: HTMLElement,
	): Promise<void> {
		const campaignEl = contentEl.createDiv({cls: 'campaignContainer'});

		if (this.modal.type === DataType.Campaign){
			this.addAdditionalElements();
			this.addNewCampaignElements(campaignEl);
		} else {
			if (this.campaigns.length === 0){
				const mainContent = this.modal.getContentEl();
				mainContent.empty();
				mainContent.createEl('h2', {cls: 'rpgm-modal-title', text: 'Main campaign missing'});
				mainContent.createSpan({cls: '', text: 'This Obsidian Vault does not contain a Rpg Manager campaign yet. Before creating a ' + DataType[this.modal.type] + ', please initialise your first campaign.'});
			} else {
				this.childEl = contentEl.createDiv({cls: 'child'});
				this.childEl.id = 'CampaignChild';

				this.selectCampaignElements(campaignEl);
			}

		}

		if (this.modal.type === DataType.Campaign){
			this.modal.saver = this;
		}
	}

	public async loadChild(
		containerEl: HTMLElement
	): Promise<void> {
		if (this.modal.type !== DataType.Adventure && this.modal.type !== DataType.Session && this.modal.type !== DataType.Scene && this.modal.type !== DataType.Note) {
			this.modal.elementModal = this.app.plugins.getPlugin('rpg-manager').factories.modals.create(
				this.modal.settings,
				this.modal.type,
				this.modal,
			);
			this.modal.elementModal.addElement(
				containerEl,
			)
		} else {
			this.modal.adventureModal = this.app.plugins.getPlugin('rpg-manager').factories.modals.create(
				this.modal.settings,
				DataType.Adventure,
				this.modal,
			);

			this.modal.adventureModal.addElement(
				containerEl,
			)
		}
	}

	public validate(
	): boolean {
		return true;
	}

	private addNewCampaignElements(
		containerEl: HTMLElement,
	): void {
		this.modal.campaignId = 1;
		this.campaigns.forEach((data: CampaignInterface) => {
			if (data.campaignId >= this.modal.campaignId) this.modal.campaignId = (data.campaignId + 1);
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
		this.modal.settings = CampaignSetting[this.campaignSettingsEl.value as keyof typeof CampaignSetting];
	}

	private selectCampaign(
	): void {
		this.modal.campaignId = +this.campaignEl.value;
		this.childEl.empty();
		this.loadChild(this.childEl);
	}

	protected async addAdditionalElements(
	): Promise<void> {
		if (this.modal.additionalInformationEl.style.display !== 'block') {
			this.modal.additionalInformationEl.style.display = 'block';
			this.modal.additionalInformationEl.createEl('h2', {
				cls: 'rpgm-modal-title',
				text: 'Additional Information for the ' + DataType[this.modal.type]
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
