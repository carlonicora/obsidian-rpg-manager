import {AbstractHeaderView} from "../../../managers/viewsManager/abstracts/AbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {SceneInterface} from "../interfaces/SceneInterface";
import {LongTextElement} from "../../../managers/viewsManager/elements/LongTextElement";
import {DateElement} from "../../../services/dateService/views/elements/DateElement";
import {ModelSelectorElement} from "../../../managers/viewsManager/elements/ModelSelectorElement";
import {SessionInterface} from "../../session/interfaces/SessionInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {StoryCircleStageElement} from "../../../services/plotsService/views/elements/StoryCircleStageElement";
import {SceneTypeElement} from "../../../services/analyserService/views/elements/SceneTypeElement";
import {CheckboxElement} from "../../../managers/viewsManager/elements/CheckboxElement";
import {RunElement} from "../../../services/runningTimeService/views/elements/RunElement";
import {RuntimeDurationElement} from "../../../services/runningTimeService/views/elements/RuntimeDurationElement";
import {AnalyserInterface} from "../../../services/analyserService/interfaces/AnalyserInterface";
import {AnalyserService} from "../../../services/analyserService/AnalyserService";
import {AbtStage} from "../../../services/plotsService/enums/AbtStage";
import {AnalyserReportType} from "../../../services/analyserService/enums/AnalyserReportType";
import {StoryCircleStage} from "../../../services/plotsService/enums/StoryCircleStage";
import {CalendarType} from "../../../services/dateService/enums/CalendarType";
import {FantasyCalendarElement} from "../../../services/fantasyCalendarService/views/elements/FantasyCalendarElement";
import {FantasyCalendarCategory} from "../../../services/fantasyCalendarService/enums/FantasyCalendarCategory";

export class SceneHeaderView extends AbstractHeaderView implements NewHeaderViewInterface {
	public model: SceneInterface;

	public render(
	): void {
		this.addBreadcrumb();
		this.addTitle();
		this.addComponentOptions();
		this.addGallery();
		this.addInfoElement(LongTextElement, {model: this.model, title: 'Description', values: this.model.synopsis ?? '<span class="missing">Synopsis Missing</span>', editableKey: 'data.synopsis'});
		this.addInfoElement(LongTextElement, {model: this.model, title: 'Trigger', values: this.model.trigger ?? '<span class="missing">Trigger Missing</span>', editableKey: 'data.trigger'});
		this.addInfoElement(LongTextElement, {model: this.model, title: 'Action', values: this.model.action ?? '<span class="missing">Action Missing</span>', editableKey: 'data.action'});

		this.addInfoElement(this.model.campaign.calendar === CalendarType.Gregorian ? DateElement : FantasyCalendarElement, {model: this.model, title: 'Scene Date', values: this.model.date, category: FantasyCalendarCategory.Scene, editableKey: 'data.date'});

		const sessions = this.api.database.read((session: SessionInterface) =>
			session.id.type === ComponentType.Session &&
			session.id.campaignId === this.model.id.campaignId
		);

		this.addInfoElement(ModelSelectorElement, {model: this.model, title: 'Session', values: {id: this.model.session?.id, list: sessions}, editableKey: 'data.sessionId'});

		if (this.api.settings.usePlotStructures)
			this.addInfoElement(StoryCircleStageElement, {model: this.model, title: 'Story Circle Stage', values: this.model.storyCircleStage, editableKey: 'data.storyCircleStage'});

		if (this.api.settings.useSceneAnalyser) {
			this.addInfoElement(SceneTypeElement, {
				model: this.model,
				title: 'Scene Type',
				values: this.model.sceneType,
				editableKey: 'data.sceneType'
			});

			this.addInfoElement(CheckboxElement,{
				model: this.model,
				title: 'External Actions?',
				values: this.model.isExciting,
				editableKey: 'data.isActedUpon',
			});

			this.addInfoElement(RunElement, {
				model: this.model,
				title: 'SceneRun',
				values: {isRunning: this.model.isCurrentlyRunning, scene: this.model}
			});

			if (this.model.currentDuration > 0)
				this.addInfoElement(RuntimeDurationElement, {
					model: this.model,
					title: 'Duration',
					values: {isRunning: this.model.isCurrentlyRunning, runtime: this.model.currentDuration, scene: this.model}
				});

			let abtStage: AbtStage|undefined=undefined;

			switch (this.model.storyCircleStage){
				case StoryCircleStage.You:
				case StoryCircleStage.Need:
					abtStage = AbtStage.Need;
					break;
				case StoryCircleStage.Go:
				case StoryCircleStage.Search:
					abtStage = AbtStage.And;
					break;
				case StoryCircleStage.Find:
				case StoryCircleStage.Take:
					abtStage = AbtStage.But;
					break;
				case StoryCircleStage.Return:
				case StoryCircleStage.Change:
					abtStage = AbtStage.Therefore;
					break;
			}

			if (abtStage !== undefined) {
				const analyser: AnalyserInterface = this.api.service(AnalyserService).createScene(this.model, abtStage);

				this.addAnalyser(analyser, AnalyserReportType.Scene);
			}
		}
	}
}
