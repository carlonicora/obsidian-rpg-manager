import {AbtMetadataInterface} from "../../plots/interfaces/AbtMetadataInterface";
import {StoryCircleMetadataInterface} from "../../plots/interfaces/StoryCircleMetadataInterface";
import {ControllerMetadataRelationshipInterface} from "./ControllerMetadataRelationshipInterface";
import {CampaignMetadataInterface} from "../../components/components/campaign/interfaces/CampaignMetadataInterface";
import {AdventureMetadataInterface} from "../../components/components/adventure/interfaces/AdventureMetadataInterface";
import {ActMetadataInterface} from "../../components/components/act/interfaces/ActMetadataInterface";
import {SceneMetadataInterface} from "../../components/components/scene/interfaces/SceneMetadataInterface";
import {SessionMetadataInterface} from "../../components/components/session/interfaces/SessionMetadataInterface";
import {SubplotMetadataInterface} from "../../components/components/subplot/interfaces/SubplotMetadataInterface";
import {CharacterMetadataInterface} from "../../components/components/character/interfaces/CharacterMetadataInterface";
import {ClueMetadataInterface} from "../../components/components/clue/interfaces/ClueMetadataInterface";
import {EventMetadataInterface} from "../../components/components/event/interfaces/EventMetadataInterface";
import {FactionMetadataInterface} from "../../components/components/faction/interfaces/FactionMetadataInterface";
import {LocationMetadataInterface} from "../../components/components/location/interfaces/LocationMetadataInterface";
import {MusicMetadataInterface} from "../../components/components/music/interfaces/MusicMetadataInterface";
import {ComponentDataMetadataInterface} from "../../components/interfaces/ComponentDataMetadataInterface";
import {ComponentMetadataInterface} from "../../components/interfaces/ComponentMetadataInterface";

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
