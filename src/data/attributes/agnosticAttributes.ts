import { AttributeComponentType } from "src/data/enums/AttributeComponentType";
import { ElementType } from "src/data/enums/ElementType";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { AttributeType } from "../enums/AttributeType";

const description = { id: AttributeType.Description, type: AttributeComponentType.Description };
const ghost = { id: AttributeType.Ghost, type: AttributeComponentType.LongText };
const lie = { id: AttributeType.Lie, type: AttributeComponentType.LongText };
const arc = { id: AttributeType.Arc, type: AttributeComponentType.Arc };
const beliefs = { id: AttributeType.Beliefs, type: AttributeComponentType.LongText };
const need = { id: AttributeType.Need, type: AttributeComponentType.LongText };
const behaviour = { id: AttributeType.Behaviour, type: AttributeComponentType.LongText };
const want = { id: AttributeType.Want, type: AttributeComponentType.LongText };
const opposition = { id: AttributeType.Opposition, type: AttributeComponentType.LongText };
const strengths = { id: AttributeType.Strengths, type: AttributeComponentType.Strengths };
const weaknesses = { id: AttributeType.Weaknesses, type: AttributeComponentType.Weaknesses };
const storycircle = { id: AttributeType.StoryCircle, type: AttributeComponentType.StoryCircle };
const type = { id: AttributeType.SceneType, type: AttributeComponentType.SceneType };
const dob = { id: AttributeType.Dob, type: AttributeComponentType.Date };
const dod = { id: AttributeType.Dod, type: AttributeComponentType.Date };
const occupation = { id: AttributeType.Occupation, type: AttributeComponentType.Text };
const sceneaction = { id: AttributeType.SceneAction, type: AttributeComponentType.LongText };
const date = { id: AttributeType.Date, type: AttributeComponentType.Date };
const sessiondate = { id: AttributeType.SessionDate, type: AttributeComponentType.Date };
const storycirclestage = { id: AttributeType.StoryCircleStage, type: AttributeComponentType.StoryCircleStage };
const abtstage = { id: AttributeType.AbtStage, type: AttributeComponentType.AbtStage };
const externalactions = { id: AttributeType.ExternalActions, type: AttributeComponentType.Boolean };
const address = { id: AttributeType.Address, type: AttributeComponentType.LongText };
const location = { id: AttributeType.Location, type: AttributeComponentType.Map };
const duration = { id: AttributeType.Duration, type: AttributeComponentType.Duration };
const philosophy = { id: AttributeType.Philosophy, type: AttributeComponentType.LongText };
const majorclues = { id: AttributeType.MajorClues, type: AttributeComponentType.MajorClues };
const factionstructure = { id: AttributeType.FactionStructure, type: AttributeComponentType.LongText };
const nonplayercharactertype = {
	id: AttributeType.NonPlayerCharacterType,
	type: AttributeComponentType.NonPlayerCharacterType,
};
const sensoryimprint = { id: AttributeType.SensoryImprint, type: AttributeComponentType.SensoryImprint };
const stake = { id: AttributeType.Stake, type: AttributeComponentType.Scale };

export const agnosticAttributes: Map<ElementType, AttributeInterface[]> = new Map<ElementType, AttributeInterface[]>([
	[ElementType.Campaign, [description, storycircle]],
	[ElementType.Adventure, [description, storycircle, majorclues]],
	[ElementType.Chapter, [description, abtstage, storycircle, majorclues]],
	[ElementType.Session, [description, storycircle, abtstage, sessiondate]],
	[ElementType.Scene, [description, storycirclestage, sceneaction, type, date, externalactions, duration]],
	[
		ElementType.NonPlayerCharacter,
		[
			description,
			sensoryimprint,
			nonplayercharactertype,
			occupation,
			ghost,
			lie,
			arc,
			beliefs,
			need,
			behaviour,
			want,
			stake,
			opposition,
			strengths,
			weaknesses,
			dob,
			dod,
		],
	],
	[ElementType.Event, [description, date]],
	[ElementType.Location, [sensoryimprint, description, address, location]],
	[ElementType.Faction, [description, philosophy, factionstructure]],
	[ElementType.Clue, [description]],
	[ElementType.PlayerCharacter, [description, beliefs, lie, need, want, strengths, weaknesses, dob]],
	[ElementType.Subplot, [description, storycircle]],
	[ElementType.Object, [sensoryimprint, description]],
	[ElementType.Monster, [sensoryimprint, description]],
]);
