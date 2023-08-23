import ChapterComponent from "src/components/elements/ChapterComponent";
import ClueComponent from "src/components/elements/ClueComponent";
import EventComponent from "src/components/elements/EventComponent";
import FactionComponent from "src/components/elements/FactionComponent";
import LocationComponent from "src/components/elements/LocationComponent";
import MonsterComponent from "src/components/elements/MonsterComponent";
import ObjectComponent from "src/components/elements/ObjectComponent";
import PlayerCharacterComponent from "src/components/elements/PlayerCharacterComponent";
import SceneComponent from "src/components/elements/SceneComponent";
import SessionComponent from "src/components/elements/SessionComponent";
import SubplotComponent from "src/components/elements/SubplotComponent";
import { ElementType } from "src/data/enums/ElementType";
import AdventureComponent from "../../elements/AdventureComponent";
import CampaignComponent from "../../elements/CampaignComponent";
import NonPlayerCharacterComponent from "../../elements/NonPlayerCharacterComponent";

export const agnosticComponents: Map<ElementType, React.FC> = new Map<ElementType, React.FC>([
	[ElementType.Campaign, CampaignComponent],
	[ElementType.Adventure, AdventureComponent],
	[ElementType.Chapter, ChapterComponent],
	[ElementType.Session, SessionComponent],
	[ElementType.Scene, SceneComponent],
	[ElementType.NonPlayerCharacter, NonPlayerCharacterComponent],
	[ElementType.Event, EventComponent],
	[ElementType.Location, LocationComponent],
	[ElementType.Faction, FactionComponent],
	[ElementType.Clue, ClueComponent],
	[ElementType.PlayerCharacter, PlayerCharacterComponent],
	[ElementType.Subplot, SubplotComponent],
	[ElementType.Object, ObjectComponent],
	[ElementType.Monster, MonsterComponent],
]);
