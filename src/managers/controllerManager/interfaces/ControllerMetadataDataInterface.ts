import {AbtMetadataInterface} from "../../../services/plotsServices/interfaces/AbtMetadataInterface";
import {StoryCircleMetadataInterface} from "../../../services/plotsServices/interfaces/StoryCircleMetadataInterface";
import {ControllerMetadataRelationshipInterface} from "./ControllerMetadataRelationshipInterface";
import {CampaignMetadataInterface} from "../../../components/campaign/interfaces/CampaignMetadataInterface";
import {AdventureMetadataInterface} from "../../../components/adventure/interfaces/AdventureMetadataInterface";
import {ActMetadataInterface} from "../../../components/act/interfaces/ActMetadataInterface";
import {SceneMetadataInterface} from "../../../components/scene/interfaces/SceneMetadataInterface";
import {SessionMetadataInterface} from "../../../components/session/interfaces/SessionMetadataInterface";
import {SubplotMetadataInterface} from "../../../components/subplot/interfaces/SubplotMetadataInterface";
import {CharacterMetadataInterface} from "../../../components/character/interfaces/CharacterMetadataInterface";
import {ClueMetadataInterface} from "../../../components/clue/interfaces/ClueMetadataInterface";
import {EventMetadataInterface} from "../../../components/event/interfaces/EventMetadataInterface";
import {FactionMetadataInterface} from "../../../components/faction/interfaces/FactionMetadataInterface";
import {LocationMetadataInterface} from "../../../components/location/interfaces/LocationMetadataInterface";
import {MusicMetadataInterface} from "../../../components/music/interfaces/MusicMetadataInterface";
import {ComponentDataMetadataInterface} from "../../../core/interfaces/ComponentDataMetadataInterface";
import {ComponentMetadataInterface} from "../../../core/interfaces/ComponentMetadataInterface";

export interface ControllerMetadataDataInterface {
	plot?: {
		abt?: AbtMetadataInterface;
		storycircle?: StoryCircleMetadataInterface;
	}
	relationships?: ControllerMetadataRelationshipInterface[];
	data?: ComponentMetadataInterface |
		CampaignMetadataInterface |
		AdventureMetadataInterface |
		ActMetadataInterface |
		SceneMetadataInterface |
		SessionMetadataInterface |
		SubplotMetadataInterface |
		CharacterMetadataInterface |
		ClueMetadataInterface |
		EventMetadataInterface |
		FactionMetadataInterface |
		LocationMetadataInterface |
		MusicMetadataInterface |
		ComponentDataMetadataInterface;
}
