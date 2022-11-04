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

export class CampaignHeaderView extends AbstractHeaderView implements NewHeaderViewInterface {
	public model: CampaignInterface;

	public render(
	): void {
		this.addTitle();
		this.addComponentOptions();

		const adventures = this.api.database.readList<AdventureInterface>(ComponentType.Adventure, this.model.id)
			.sort(this.api.service(SorterService).create<AdventureInterface>([
				new SorterComparisonElement((component: ModelInterface) => component.file.stat.mtime, SorterType.Descending),
			]));
		this.addInfoElement(ModelSelectorElement, {model: this.model, title: 'Current Adventure', values: {id: this.model.currentAdventureId, list: adventures}, editableKey: 'data.currentAdventureId'});

		let acts = this.api.database.readList<ActInterface>(ComponentType.Act, this.model.id)
			.sort(this.api.service(SorterService).create<ActInterface>([
				new SorterComparisonElement((component: ModelInterface) => component.file.stat.mtime, SorterType.Descending),
			]));

		if (this.model.currentAdventureId != undefined)
			acts = acts.filter((act: ActInterface) => act.id.adventureId === this.model.currentAdventureId?.adventureId);

		this.addInfoElement(ModelSelectorElement, {model: this.model, title: 'Current Act', values: {id: this.model.currentActId, list: acts}, editableKey: 'data.currentActId'});

		const sessions = this.api.database.readList<SessionInterface>(ComponentType.Session, this.model.id)
			.sort(this.api.service(SorterService).create<SessionInterface>([
				new SorterComparisonElement((component: ModelInterface) => component.file.stat.mtime, SorterType.Descending),
			]));
		this.addInfoElement(ModelSelectorElement, {model: this.model, title: 'Current Session', values: {id: this.model.currentSessionId, list: sessions}, editableKey: 'data.currentSessionId'});

		this.addInfoElement(DateElement, {model: this.model, title: 'Current Date', values: this.model.date, editableKey: 'data.date'});

		if (this.api.settings.usePlotStructures)
			this.addPlot();
	}

	protected addTitle(
	): void {
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
