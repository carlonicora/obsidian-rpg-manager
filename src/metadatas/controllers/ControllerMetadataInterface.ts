import {AbtMetadataInterface} from "../plots/AbtMetadataInterface";
import {StoryCircleMetadataInterface} from "../plots/StoryCircleMetadataInterface";
import {RelationshipInterface} from "../../relationships/interfaces/RelationshipInterface";
import {CampaignMetadataInterface} from "../components/CampaignMetadataInterface";
import {AdventureMetadataInterface} from "../components/AdventureMetadataInterface";
import {ActMetadataInterface} from "../components/ActMetadataInterface";
import {SceneMetadataInterface} from "../components/SceneMetadataInterface";
import {SessionMetadataInterface} from "../components/SessionMetadataInterface";
import {SubplotMetadataInterface} from "../components/SubplotMetadataInterface";
import {CharacterMetadataInterface} from "../components/CharacterMetadataInterface";
import {ClueMetadataInterface} from "../components/ClueMetadataInterface";
import {EventMetadataInterface} from "../components/EventMetadataInterface";
import {FactionMetadataInterface} from "../components/FactionMetadataInterface";
import {LocationMetadataInterface} from "../components/LocationMetadataInterface";
import {MusicMetadataInterface} from "../components/MusicMetadataInterface";
import {ControllerMetadataModelInterface} from "./ControllerMetadataModelInterface";
import {ComponentDataMetadataInterface} from "../components/data/ComponentDataMetadataInterface";

export interface ControllerMetadataInterface {
	models: ControllerMetadataModelInterface;
	plot?: {
		abt?: AbtMetadataInterface;
		storycircle?: StoryCircleMetadataInterface;
	}
	relationships?: Array<RelationshipInterface>;
	data?: CampaignMetadataInterface |
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
