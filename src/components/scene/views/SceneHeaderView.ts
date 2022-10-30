import {AbstractHeaderView} from "../../../managers/viewsManager/abstracts/AbstractHeaderView";
import {NewHeaderViewInterface} from "../../../managers/viewsManager/interfaces/NewHeaderViewInterface";
import {SceneInterface} from "../interfaces/SceneInterface";
import {LongTextElement} from "../../../managers/viewsManager/elements/LongTextElement";
import {DateElement} from "../../../services/dateService/views/elements/DateElement";
import {SessionSelectorElement} from "../../../managers/viewsManager/elements/SessionSelectorElement";
import {SessionInterface} from "../../session/interfaces/SessionInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {StoryCircleStageElement} from "../../../services/plotsServices/views/elements/StoryCircleStageElement";
import {SceneTypeElement} from "../../../services/analyserService/views/elements/SceneTypeElement";
import {CheckboxElement} from "../../../managers/viewsManager/elements/CheckboxElement";
import {RunElement} from "../../../services/runningTimeService/views/elements/RunElement";
import {RuntimeDurationElement} from "../../../services/runningTimeService/views/elements/RuntimeDurationElement";

export class SceneHeaderView extends AbstractHeaderView implements NewHeaderViewInterface {
	public model: SceneInterface;

	public render(
	): void {
		this.addBreadcrumb();
		this.addTitle();
		this.addComponentOptions();
		this.addGallery();
		this.addInfoElement(LongTextElement, {title: 'Description', values: this.model.synopsis ?? '<span class="missing">Synopsis Missing</span>', editableKey: 'data.synopsis'});
		this.addInfoElement(LongTextElement, {title: 'Trigger', values: this.model.trigger ?? '<span class="missing">Trigger Missing</span>', editableKey: 'data.trigger'});
		this.addInfoElement(LongTextElement, {title: 'Action', values: this.model.action ?? '<span class="missing">Action Missing</span>', editableKey: 'data.action'});

		this.addInfoElement(DateElement, {title: 'Scene Date', values: this.model.date, editableKey: 'data.date'});

		const sessions = this.api.database.read((session: SessionInterface) =>
			session.id.type === ComponentType.Session &&
			session.id.campaignId === this.model.id.campaignId
		);

		this.addInfoElement(SessionSelectorElement, {title: 'Session', values: {sessionId: this.model.session?.id.sessionId, sessions: sessions}, editableKey: 'data.sessionId'});

		if (this.api.settings.usePlotStructures)
			this.addInfoElement(StoryCircleStageElement, {title: 'Story Circle Stage', values: this.model.storyCircleStage, editableKey: 'data.storyCircleStage'});

		if (this.api.settings.useSceneAnalyser) {
			this.addInfoElement(SceneTypeElement, {
				title: 'Scene Type',
				values: this.model.sceneType,
				editableKey: 'data.sceneType'
			});

			this.addInfoElement(CheckboxElement,{
				title: 'External Actions?',
				values: this.model.isExciting,
				editableKey: 'data.isActedUpon',
			});

			this.addInfoElement(RunElement, {
				title: 'SceneRun',
				values: {isRunning: this.model.isCurrentlyRunning, scene: this.model}
			});

			if (this.model.currentDuration > 0)
				this.addInfoElement(RuntimeDurationElement, {
					title: 'Duration',
					values: {isRunning: this.model.isCurrentlyRunning, runtime: this.model.currentDuration, scene: this.model}
				});

		}
	}
}
