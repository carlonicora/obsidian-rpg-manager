import {AbstractFactory} from "../../../core/abstracts/AbstractFactory";
import {EditableContentValueFactoryInterface} from "../interfaces/EditableContentValueFactoryInterface";
import {ModelInterface} from "../../../api/modelsManager/interfaces/ModelInterface";
import {EditableContentType} from "../enums/EditableContentType";
import {CharacterInterface} from "../../../components/character/interfaces/CharacterInterface";
import {LocationInterface} from "../../../components/location/interfaces/LocationInterface";
import {SceneInterface} from "../../../components/scene/interfaces/SceneInterface";
import {MusicInterface} from "../../../components/music/interfaces/MusicInterface";
import {PlotsInterface} from "../../plots/interfaces/PlotsInterface";

export class EditableContentValueFactory extends AbstractFactory implements EditableContentValueFactoryInterface {
	read(
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

	public readRelatedPlot(
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
