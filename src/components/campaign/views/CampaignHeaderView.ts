import {AbstractHeaderView} from "../../../managers/viewsManager/abstracts/AbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {CampaignInterface} from "../interfaces/CampaignInterface";
import {ModelSelectorElement} from "../../../managers/viewsManager/elements/ModelSelectorElement";
import {ModelInterface} from "../../../managers/modelsManager/interfaces/ModelInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {SorterService} from "../../../services/sorterService/SorterService";
import {SorterComparisonElement} from "../../../services/sorterService/SorterComparisonElement";
import {AdventureInterface} from "../../adventure/interfaces/AdventureInterface";
import {SorterType} from "../../../services/searchService/enums/SorterType";
import {ActInterface} from "../../act/interfaces/ActInterface";
import {SessionInterface} from "../../session/interfaces/SessionInterface";
import {DateElement} from "../../../services/dateService/views/elements/DateElement";
import {CalendarType} from "../../../services/dateService/enums/CalendarType";
import {FantasyCalendarElement} from "../../../services/fantasyCalendarService/views/elements/FantasyCalendarElement";
import {FantasyCalendarCategory} from "../../../services/fantasyCalendarService/enums/FantasyCalendarCategory";
import i18next from "i18next";

export class CampaignHeaderView extends AbstractHeaderView implements NewHeaderViewInterface {
	public model: CampaignInterface;

	public render(): void {
		this.addTitle();
		this.addComponentOptions();

		const adventures = this.api.database.readChildren<AdventureInterface>(ComponentType.Adventure, this.model.index.id)
			.sort(this.api.service(SorterService).create<AdventureInterface>([
				new SorterComparisonElement((component: ModelInterface) => component.file.stat.mtime, SorterType.Descending),
			]));
		this.addInfoElement(ModelSelectorElement, {
			model: this.model,
			title: i18next.t("current", {ns: "elements", type: i18next.t("adventure", {ns: "elements", count: 1})}),
			values: {index: this.model.currentAdventureId, list: adventures},
			editableKey: 'data.currentAdventureId'
		});

		let acts = this.api.database.read<ActInterface>((model: ActInterface) =>
			model.index.type === ComponentType.Act &&
			model.index.campaignId === this.model.index.id
		).sort(this.api.service(SorterService).create<ActInterface>([
			new SorterComparisonElement((component: ModelInterface) => component.file.stat.mtime, SorterType.Descending),
		]));

		if (this.model.currentAdventureId != undefined)
			acts = acts.filter((act: ActInterface) => act.index.parentId === this.model.currentAdventureId?.id);

		this.addInfoElement(ModelSelectorElement, {
			model: this.model,
			title: i18next.t("current", {ns: "elements", type: i18next.t("act", {ns: "elements", count: 1})}),
			values: {index: this.model.currentActId, list: acts},
			editableKey: 'data.currentActId'
		});

		const sessions = this.api.database.readChildren<SessionInterface>(ComponentType.Session, this.model.index.id)
			.sort(this.api.service(SorterService).create<SessionInterface>([
				new SorterComparisonElement((component: ModelInterface) => component.file.stat.mtime, SorterType.Descending),
			]));
		this.addInfoElement(ModelSelectorElement, {
			model: this.model,
			title: i18next.t("current", {ns: "elements", type: i18next.t("session", {ns: "elements", count: 1})}),
			values: {index: this.model.currentSessionId, list: sessions},
			editableKey: 'data.currentSessionId'
		});

		this.addInfoElement(this.model.calendar === CalendarType.Gregorian ? DateElement : FantasyCalendarElement, {
			model: this.model,
			title: i18next.t("current", {ns: "elements", type: i18next.t("date", {ns: "elements"})}),
			values: this.model.date,
			category: FantasyCalendarCategory.CurrentDate,
			editableKey: 'data.date'
		});

		if (this.api.settings.usePlotStructures)
			this.addPlot();
	}

	protected addTitle(): void {
		if (this.model.images.length == 0) {
			super.addTitle();
		} else {
			const titleOverlayEl: HTMLDivElement = this.titleContainerEl.createDiv({cls: 'rpg-manager-header-container-title-overlay'});
			const titleEl: HTMLDivElement = titleOverlayEl.createDiv({cls: 'rpg-manager-header-container-title-name'});
			titleEl.textContent = this.model.file.basename;

			this.titleContainerEl.addClass('rpg-manager-header-container-title-overlay');
			this.titleContainerEl.style.backgroundImage = 'url(\'' + this.model.images[0].src + '\')';
		}
	}
}
