import {AbstractHeaderSubModel} from "../../../REFACTOR/models/abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../../../responses/interfaces/ResponseDataElementInterface";
import {ResponseHeader} from "../../../responses/ResponseHeader";
import {HeaderResponseInterface} from "../../../responses/interfaces/HeaderResponseInterface";
import {ComponentType} from "../../../core/enums/ComponentType";
import {ResponseHeaderElement} from "../../../responses/ResponseHeaderElement";
import {HeaderResponseType} from "../../../responses/enums/HeaderResponseType";
import {StoryCircleStage} from "../../../services/plots/enums/StoryCircleStage";
import {ResponseType} from "../../../responses/enums/ResponseType";
import {SorterComparisonElement} from "../../../database/SorterComparisonElement";
import {SorterType} from "../../../database/enums/SorterType";
import {AbtStage} from "../../../services/plots/enums/AbtStage";
import {SceneInterface} from "../interfaces/SceneInterface";
import {SessionInterface} from "../../session/interfaces/SessionInterface";
import {RelationshipInterface} from "../../../services/relationshipsService/interfaces/RelationshipInterface";
import {DateService} from "../../../services/date/DateService";

export class SceneHeaderSubModel extends AbstractHeaderSubModel {
	protected data: SceneInterface;

	public async generateData(
		relationship: RelationshipInterface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (!this.initialiseData(relationship)) return null;

		this.synopsisTitle = 'SceneModel Goal';

		const sessions: SessionInterface[] = this.database.read<SessionInterface>((session: SessionInterface) => session.id.type === ComponentType.Session && session.id.campaignId === this.data.id.campaignId)
			.sort(this.factories.sorter.create<SessionInterface>([
				new SorterComparisonElement((session: SessionInterface) => session.id.sessionId, SorterType.Descending)
			]));

		let response = await super.generateData(relationship, title, additionalInformation) as HeaderResponseInterface;

		if (response === null) response = new ResponseHeader(this.app, this.currentComponent);

		response.type = ComponentType.Scene;
		response.responseType = ResponseType.SceneHeader;

		let trigger = this.data?.trigger;
		if (this.data.trigger == null || this.data.trigger === '') trigger = '<span class="rpgm-missing">SceneModel trigger missing</span>';
		response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'Trigger', trigger, HeaderResponseType.Long, {editableField: 'data.trigger'}));

		let action = this.data?.action;
		if (this.data.action == null || this.data.action === '') action = '<span class="rpgm-missing">SceneModel action missing</span>';
		response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'Action', action, HeaderResponseType.Long, {editableField: 'data.action'}));

		response.addElement(
			new ResponseHeaderElement(
				this.app,
				this.currentComponent,
				'SceneModel Date',
				this.api.services.get<DateService>(DateService)?.getReadableDate(this.data.date, this.data),
				(this.data.campaign.fantasyCalendar !== undefined ? HeaderResponseType.FantasyDateSelector : HeaderResponseType.DateSelector)
			)
		);

		if (sessions.length > 0) {
			response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'Session', (this.data.session === undefined ? '' : this.data.session?.id?.sessionId?.toString()), HeaderResponseType.SessionSelection, {
				sceneId: this.data.id,
				file: this.data.file,
				sessions: sessions
			}));
		}

		if (this.settings.usePlotStructures) {
			response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'Story Circle Stage', (this.data.storyCircleStage !== undefined ? this.data.storyCircleStage : ''), HeaderResponseType.StoryCircleSelector, {
				sceneId: this.data.id,
				file: this.data.file
			}));

		}
		if (this.settings.useSceneAnalyser) {
			response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'SceneModel Type', (this.data.sceneType !== undefined ?this.data.sceneType : ''), HeaderResponseType.SceneTypeSelector, {
				sceneId: this.data.id,
				file: this.data.file
			}));
			response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'External actions?', this.data.isExciting, HeaderResponseType.SceneExcitment, {
				sceneId: this.data.id,
				file: this.data.file
			}));
			response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'SceneModel Run', this.data.isCurrentlyRunning, HeaderResponseType.SceneRun));
			if (this.data.isCurrentlyRunning || this.data.currentDuration > 0) response.addElement(new ResponseHeaderElement(this.app, this.currentComponent, 'SceneModel Duration', '', HeaderResponseType.SceneRunTime));
		}

		if (this.settings.useSceneAnalyser && this.data.sceneType !== undefined && this.data.storyCircleStage !== undefined) {
			let stage: AbtStage|undefined=undefined;

			switch (this.data.storyCircleStage){
				case StoryCircleStage.You:
				case StoryCircleStage.Need:
					stage = AbtStage.Need;
					break;
				case StoryCircleStage.Go:
				case StoryCircleStage.Search:
					stage = AbtStage.And;
					break;
				case StoryCircleStage.Find:
				case StoryCircleStage.Take:
					stage = AbtStage.But;
					break;
				case StoryCircleStage.Return:
				case StoryCircleStage.Change:
					stage = AbtStage.Therefore;
					break;
			}

			if (stage !== undefined) {
				if (additionalInformation == null) additionalInformation = {};

				additionalInformation.analyser = this.factories.analyser.createScene(
					this.data,
					stage,
				);
			}
		}

		response.metadata = {actId: this.data.id, sourceMeta: additionalInformation};

		return this.completeData(response);
	}
}
