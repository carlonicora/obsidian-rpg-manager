import {AbstractHeaderSubModel} from "../../../abstracts/AbstractHeaderSubModel";
import {ResponseDataElementInterface} from "../../../interfaces/response/ResponseDataElementInterface";
import {ResponseHeader} from "../../../responses/ResponseHeader";
import {HeaderResponseInterface} from "../../../interfaces/response/subModels/HeaderResponseInterface";
import {ComponentType} from "../../../enums/ComponentType";
import {ResponseHeaderElement} from "../../../responses/ResponseHeaderElement";
import {HeaderResponseType} from "../../../enums/HeaderResponseType";
import {StoryCircleStage} from "../../../enums/StoryCircleStage";
import {SceneType} from "../../../enums/SceneType";
import {ResponseType} from "../../../enums/ResponseType";
import {SorterComparisonElement} from "../../../database/SorterComparisonElement";
import {SorterType} from "../../../enums/SorterType";
import {SceneAnalyser} from "../../../helpers/SceneAnalyser";
import {AbtStage} from "../../../enums/AbtStage";
import {SceneV2Interface} from "../../../_dbV2/components/interfaces/SceneV2Interface";
import {SessionV2Interface} from "../../../_dbV2/components/interfaces/SessionV2Interface";
import {RelationshipV2Interface} from "../../../_dbV2/relationships/interfaces/RelationshipV2Interface";

export class SceneHeaderSubModel extends AbstractHeaderSubModel {
	protected data: SceneV2Interface;

	public async generateData(
		relationship: RelationshipV2Interface,
		title:string|undefined,
		additionalInformation: any|undefined,
	): Promise<ResponseDataElementInterface|null> {
		if (!this.initialiseData(relationship)) return null;

		this.synopsisTitle = 'Scene Goal';

		const sessions: Array<SessionV2Interface> = this.database.read<SessionV2Interface>((session: SessionV2Interface) => session.id.type === ComponentType.Session && session.id.campaignId === this.data.id.campaignId)
			.sort(this.factories.sorter.create<SessionV2Interface>([
				new SorterComparisonElement((session: SessionV2Interface) => session.id.sessionId, SorterType.Descending)
			]));

		let response = await super.generateData(relationship, title, additionalInformation) as HeaderResponseInterface;

		if (response === null) response = new ResponseHeader(this.app, this.currentElement);

		response.type = ComponentType.Scene;
		response.responseType = ResponseType.SceneHeader;

		if (additionalInformation != null && additionalInformation.trigger != null && additionalInformation.trigger != ''){
			response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Trigger', additionalInformation.trigger, HeaderResponseType.Long));
		}

		if (this.data.action != null && this.data.action != ''){
			response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Action', this.data.action, HeaderResponseType.Long));
		} else if (additionalInformation != null && additionalInformation.action != null && additionalInformation.action != ''){
			response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Action', additionalInformation.action, HeaderResponseType.Long));
		}
		response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Session', (this.data.id.sessionId === undefined ? '' : this.data.id.sessionId.toString()), HeaderResponseType.SessionSelection, {sceneId: this.data.id, file: this.data.file, sessions: sessions}));
		if (this.settings.usePlotStructures) {
			response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Story Circle Stage', (this.data.storycircleStage !== undefined ? StoryCircleStage[this.data.storycircleStage] : ''), HeaderResponseType.StoryCircleSelector, {
				sceneId: this.data.id,
				file: this.data.file
			}));
		}
		if (this.settings.useSceneAnalyser) {
			response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Scene Type', (this.data.sceneType !== undefined ? SceneType[this.data.sceneType] : ''), HeaderResponseType.SceneTypeSelector, {
				sceneId: this.data.id,
				file: this.data.file
			}));
			response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'External actions?', this.data.isExciting, HeaderResponseType.SceneExcitment, {
				sceneId: this.data.id,
				file: this.data.file
			}));
			response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Scene Run', this.data.isCurrentlyRunning, HeaderResponseType.SceneRun));
			if (this.data.isCurrentlyRunning || this.data.currentDuration > 0) response.addElement(new ResponseHeaderElement(this.app, this.currentElement, 'Scene Duration', '', HeaderResponseType.SceneRunTime));
		}

		if (this.settings.useSceneAnalyser && this.data.sceneType !== undefined && this.data.storycircleStage !== undefined) {
			let stage: AbtStage|undefined=undefined;

			switch (this.data.storycircleStage){
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
				additionalInformation.analyser =  new SceneAnalyser(
					this.app,
					stage,
					this.data.id
				);
			}
		}

		response.metadata = {actId: this.data.id, sourceMeta: additionalInformation};

		return this.completeData(response);
	}
}
