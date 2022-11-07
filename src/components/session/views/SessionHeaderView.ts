import {AbstractHeaderView} from "../../../managers/viewsManager/abstracts/AbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {SessionInterface} from "../interfaces/SessionInterface";
import {LongTextElement} from "../../../managers/viewsManager/elements/LongTextElement";
import {DateElement} from "../../../services/dateService/views/elements/DateElement";
import {TimeElement} from "../../../services/dateService/views/elements/TimeElement";
import {AnalyserInterface} from "../../../services/analyserService/interfaces/AnalyserInterface";
import {AnalyserService} from "../../../services/analyserService/AnalyserService";
import {AnalyserReportType} from "../../../services/analyserService/enums/AnalyserReportType";
import {CalendarType} from "../../../services/dateService/enums/CalendarType";
import {FantasyCalendarElement} from "../../../services/fantasyCalendarService/views/elements/FantasyCalendarElement";
import {StoryCircleStageElement} from "../../../services/plotsService/views/elements/StoryCircleStageElement";
import {AbtStageElement} from "../../../services/plotsService/views/elements/AbtStageElement";

export class SessionHeaderView extends AbstractHeaderView implements NewHeaderViewInterface {
	public model: SessionInterface;

	public render(
	): void {
		this.addBreadcrumb();
		this.addTitle();
		this.addComponentOptions();
		this.addGallery();
		this.addInfoElement(LongTextElement, {model: this.model, title: 'Description', values: this.model.synopsis ?? '<span class="missing">Synopsis Missing</span>', editableKey: 'data.synopsis'});

		this.addInfoElement(DateElement, {model: this.model, title: 'Session Date', values: this.model.irl, editableKey: 'data.irl'});

		if (this.api.settings.usePlotStructures)
			this.addInfoElement(AbtStageElement, {model: this.model, title: 'ABT Stage', values: this.model.abtStage, editableKey: 'data.abtStage'});

		if (this.api.settings.useSceneAnalyser) {
			this.addInfoElement(TimeElement, {
				model: this.model,
				title: 'Target Duration',
				values: this.model.targetDuration,
				editableKey: 'data.targetDuration'
			});

			const analyser: AnalyserInterface = this.api.service(AnalyserService).createSession(
				this.model,
				this.model.abtStage,
			);

			if (analyser.scenesCount > 0) {
				this.addAnalyser(analyser, AnalyserReportType.Visual);
				this.addAnalyser(analyser, AnalyserReportType.Extended);
			}
		}
	}
}
