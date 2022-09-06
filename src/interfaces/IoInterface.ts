import {DataType} from "../enums/DataType";
import {ArrayFunc} from "obsidian-dataview/lib/api/data-array";
import {AdventureListInterface} from "./data/AdventureListInterface";
import {AdventureDataInterface} from "./data/AdventureDataInterface";
import {SessionDataInterface} from "./data/SessionDataInterface";
import {SessionListInterface} from "./data/SessionListInterface";
import {SceneListInterface} from "./data/SceneListInterface";
import {ClueDataInterface} from "./data/ClueDataInterface";
import {SceneDataInterface} from "./data/SceneDataInterface";
import {CharacterListInterface} from "./data/CharacterListInterface";
import {GenericImageDataInterface} from "./data/GenericImageDataInterface";
import {GenericSynopsisDataInterface} from "./data/GenericSynopsisDataInterface";
import {GenericDataListInterface} from "./data/GenericDataListInterface";
import {CampaignDataInterface} from "./data/CampaignDataInterface";

export interface IoInterface {
	getCampaign(
		campaignId: number,
	): CampaignDataInterface|null;

	getAdventureList(
	): AdventureListInterface;

	getAdventure(
		adventureId: number,
	): AdventureDataInterface|null;

	getSession(
		adventureId: number|null,
		sessionId: number,
	): SessionDataInterface|null;

	getSessionList(
	): SessionListInterface;

	getSessionList(
		adventureId: number|null,
	): SessionListInterface;

	getSceneList(
		adventureId: number,
		sessionId: number
	): SceneListInterface;

	getCharacterList(
	): CharacterListInterface;

	getClue(
	): ClueDataInterface;

	getImage(
		width: number,
		height: number,
	): GenericImageDataInterface;

	getSynopsis(
		title: string|null,
	): GenericSynopsisDataInterface;

	getScene(
		adventureId: number,
		sessionId: number,
		sceneId: number,
	): SceneDataInterface|null;

	getRelationshipList(
		type: DataType,
	): GenericDataListInterface;

	getRelationshipList(
		type: DataType,
		parentType: DataType|null,
	): GenericDataListInterface;

	getRelationshipList(
		type: DataType,
		parentType: DataType|null,
		sorting: ArrayFunc<any, any>|null,
	): GenericDataListInterface;
}
