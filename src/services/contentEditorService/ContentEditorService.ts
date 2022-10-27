import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {ContentEditorServiceInterface} from "./interfaces/ContentEditorServiceInterface";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";
import {EditableContentType} from "./enums/EditableContentType";
import {ContentEditorModal} from "./modals/ContentEditorModal";
import {StoryCircleContentEditorModal} from "./modals/StoryCircleContentEditorModal";
import {RelationshipInterface} from "../relationshipsService/interfaces/RelationshipInterface";
import {RelationshipEditorModal} from "./modals/RelationshipEditorModal";
import {CharacterInterface} from "../../components/character/interfaces/CharacterInterface";
import {LocationInterface} from "../../components/location/interfaces/LocationInterface";
import {SceneInterface} from "../../components/scene/interfaces/SceneInterface";
import {MusicInterface} from "../../components/music/interfaces/MusicInterface";
import {PlotsInterface} from "../plotsServices/oldInterfaces/PlotsInterface";

export class ContentEditorService extends AbstractService implements ContentEditorServiceInterface, ServiceInterface {
	public async open(
		component: ModelInterface,
		editableField: string,
	): Promise<boolean> {
		const type: EditableContentType|undefined = await this._getContentType(editableField);
		let relatedComponent: RelationshipInterface[] = [];

		switch(type){
			case EditableContentType.Synopsis:
			case EditableContentType.Goals:
			case EditableContentType.Action:
			case EditableContentType.Trigger:
			case EditableContentType.AbtNeed:
			case EditableContentType.AbtAnd:
			case EditableContentType.AbtBut:
			case EditableContentType.AbtTherefore:
				new ContentEditorModal(this.api, component, type, editableField, true).open();
				return true;
				break;
			case EditableContentType.Address:
			case EditableContentType.Url:
				new ContentEditorModal(this.api, component, type, editableField, false).open();
				return true;
				break;
			case EditableContentType.StoryCircleYou:
			case EditableContentType.StoryCircleNeed:
			case EditableContentType.StoryCircleGo:
			case EditableContentType.StoryCircleSearch:
			case EditableContentType.StoryCircleFind:
			case EditableContentType.StoryCircleTake:
			case EditableContentType.StoryCircleReturn:
			case EditableContentType.StoryCircleChange:
				new StoryCircleContentEditorModal(this.api, component, type, editableField, this._readRelatedPlot(component, type)).open();
				break;
			default:
				relatedComponent = component.getRelationships().filter((relationship: RelationshipInterface) =>
					relationship.path === editableField
				);

				if (relatedComponent.length !== 1)
					return false;

				new RelationshipEditorModal(this.api, component, editableField, relatedComponent[0]).open();

				break;
		}

		return false;
	}

	public read(
		component: ModelInterface,
		type: EditableContentType,
	): string|boolean|number|undefined {
		let response: string|boolean|number|undefined = undefined;

		switch (type){
			case EditableContentType.Synopsis:
				response = component.synopsis;
				break;
			case EditableContentType.Goals:
				response = (<CharacterInterface>component).goals;
				break;
			case EditableContentType.Address:
				response = (<LocationInterface>component).address;
				break;
			case EditableContentType.Action:
				response = (<SceneInterface>component).action;
				break;
			case EditableContentType.Trigger:
				response = (<SceneInterface>component).trigger;
				break;
			case EditableContentType.Url:
				response = (<MusicInterface>component).url;
				break;
			case EditableContentType.AbtNeed:
				response = (<PlotsInterface>component).abt.need;
				break;
			case EditableContentType.AbtAnd:
				response = (<PlotsInterface>component).abt.and;
				break;
			case EditableContentType.AbtBut:
				response = (<PlotsInterface>component).abt.but;
				break;
			case EditableContentType.AbtTherefore:
				response = (<PlotsInterface>component).abt.therefore;
				break;
			case EditableContentType.StoryCircleYou:
				response = (<PlotsInterface>component).storyCircle.you;
				break;
			case EditableContentType.StoryCircleNeed:
				response = (<PlotsInterface>component).storyCircle.need;
				break;
			case EditableContentType.StoryCircleGo:
				response = (<PlotsInterface>component).storyCircle.go;
				break;
			case EditableContentType.StoryCircleSearch:
				response = (<PlotsInterface>component).storyCircle.search;
				break;
			case EditableContentType.StoryCircleFind:
				response = (<PlotsInterface>component).storyCircle.find;
				break;
			case EditableContentType.StoryCircleTake:
				response = (<PlotsInterface>component).storyCircle.take;
				break;
			case EditableContentType.StoryCircleReturn:
				response = (<PlotsInterface>component).storyCircle.return;
				break;
			case EditableContentType.StoryCircleChange:
				response = (<PlotsInterface>component).storyCircle.change;
				break;
		}

		return response;
	}

	private _getContentType(
		editableField: string,
	): EditableContentType|undefined {
		switch (editableField.toLowerCase()){
			case 'data.synopsis':
				return EditableContentType.Synopsis;
				break;
			case 'data.goals':
				return EditableContentType.Goals;
				break;
			case 'data.address':
				return EditableContentType.Address;
				break;
			case 'data.action':
				return EditableContentType.Action;
				break;
			case 'data.trigger':
				return EditableContentType.Trigger;
				break;
			case 'data.url':
				return EditableContentType.Url;
				break;
			case 'plot.abt.need':
				return EditableContentType.AbtNeed;
				break;
			case 'plot.abt.and':
				return EditableContentType.AbtAnd;
				break;
			case 'plot.abt.but':
				return EditableContentType.AbtBut;
				break;
			case 'plot.abt.therefore':
				return EditableContentType.AbtTherefore;
				break;
			case 'plot.storycircle.you':
				return EditableContentType.StoryCircleYou;
				break;
			case 'plot.storycircle.need':
				return EditableContentType.StoryCircleNeed;
				break;
			case 'plot.storycircle.go':
				return EditableContentType.StoryCircleGo;
				break;
			case 'plot.storycircle.search':
				return EditableContentType.StoryCircleSearch;
				break;
			case 'plot.storycircle.find':
				return EditableContentType.StoryCircleFind;
				break;
			case 'plot.storycircle.take':
				return EditableContentType.StoryCircleTake;
				break;
			case 'plot.storycircle.return':
				return EditableContentType.StoryCircleReturn;
				break;
			case 'plot.storycircle.change':
				return EditableContentType.StoryCircleChange;
				break;
		}

		return undefined;
	}

	private _readRelatedPlot(
		component: ModelInterface,
		type: EditableContentType.StoryCircleYou |
			EditableContentType.StoryCircleNeed |
			EditableContentType.StoryCircleGo |
			EditableContentType.StoryCircleSearch |
			EditableContentType.StoryCircleFind |
			EditableContentType.StoryCircleTake |
			EditableContentType.StoryCircleReturn |
			EditableContentType.StoryCircleChange,
	): string {
		switch (type){
			case EditableContentType.StoryCircleYou:
			case EditableContentType.StoryCircleNeed:
				return (<PlotsInterface>component).abt.need ?? '';
			case EditableContentType.StoryCircleGo:
			case EditableContentType.StoryCircleSearch:
				return (<PlotsInterface>component).abt.and ?? '';
			case EditableContentType.StoryCircleFind:
			case EditableContentType.StoryCircleTake:
				return (<PlotsInterface>component).abt.but ?? '';
			case EditableContentType.StoryCircleReturn:
			case EditableContentType.StoryCircleChange:
				return (<PlotsInterface>component).abt.therefore ?? '';
		}
	}
}
