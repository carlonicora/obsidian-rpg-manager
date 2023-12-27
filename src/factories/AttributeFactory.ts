import { BooleanAttribute } from "src/attributes/Primitives/Boolean/BooleanAttribute";
import { DateAttribute } from "src/attributes/Primitives/Date/DateAttribute";
import { ElementAttribute } from "src/attributes/Primitives/Element/ElementAttribute";
import { LongTextAttribute } from "src/attributes/Primitives/LongText/LongTextAttribute";
import { NumberAttribute } from "src/attributes/Primitives/Number/NumberAttribute";
import { SelectAttribute } from "src/attributes/Primitives/Select/SelectAttribute";
import { SelectWithDescriptionAttribute } from "src/attributes/Primitives/SelectWithDescription/SelectWithDescriptionAttribute";
import { ShortTextAttribute } from "src/attributes/Primitives/ShortText/ShortTextAttribute";
import { SliderAttribute } from "src/attributes/Primitives/Slider/SliderAttribute";
import { ConflictAttribute } from "src/attributes/Specifics/Conflict/ConflictAttribute";
import { DurationAttribute } from "src/attributes/Specifics/Duration/DurationAttribute";
import { KishotenketsuAttribute } from "src/attributes/Specifics/Kishotenketsu/KishotenketsuAttribute";
import { LinkAttribute } from "src/attributes/Specifics/Link/LinkAttribute";
import { MajorCluesAttribute } from "src/attributes/Specifics/MajorClues/MajorCluesAttribute";
import { SensoryImprintAttribute } from "src/attributes/Specifics/SensoryImprint/SensoryImprintAttribute";
import { StoryCircleAttribute } from "src/attributes/Specifics/StoryCircle/StoryCircleAttribute";
import { StrengthsAttribute } from "src/attributes/Specifics/Strengths/StrengthsAttribute";
import { WeaknessesAttribute } from "src/attributes/Specifics/Weaknesses/WeaknessesAttribute";
import { ElementType } from "src/enums/ElementType";
import { Attribute } from "src/interfaces/Attribute";

const RpgManagerAttributesMap: { [key: string]: Attribute } = {
	StoryCircle: new StoryCircleAttribute({
		id: "StoryCircle",
		limitToTypes: [ElementType.Adventure, ElementType.Chapter, ElementType.Session],
	}),
	Conflict: new ConflictAttribute({
		id: "Conflict",
		limitToTypes: [ElementType.Adventure, ElementType.Session, ElementType.Scene],
	}),
	Duration: new DurationAttribute({
		id: "Duration",
		limitToTypes: [ElementType.Scene],
	}),
	Kishotenketsu: new KishotenketsuAttribute({
		id: "Kishotenketsu",
		limitToTypes: [ElementType.Adventure, ElementType.Session, ElementType.Scene],
	}),
	Link: new LinkAttribute({
		id: "Link",
	}),
	MajorClues: new MajorCluesAttribute({
		id: "MajorClues",
		limitToTypes: [ElementType.Adventure, ElementType.Chapter],
	}),
	NonPlayerCharacterType: new SelectAttribute({
		id: "NonPlayerCharacterType",
		limitToTypes: [ElementType.NonPlayerCharacter],
		options: ["Main", "as"],
	}),
	Parent: new ElementAttribute({
		id: "Parent",
	}),
	Pronoun: new SelectAttribute({
		id: "Pronoun",
		limitToTypes: [ElementType.PlayerCharacter, ElementType.NonPlayerCharacter],
		options: ["He", "She", "They"],
	}),
	SceneType: new SelectAttribute({
		id: "SceneType",
		limitToTypes: [ElementType.Scene],
		options: ["Action", "Dialogue", "Description", "Transition"],
	}),
	SensoryImprint: new SensoryImprintAttribute({
		id: "SensoryImprint",
	}),
	StoryCircleStage: new SelectAttribute({
		id: "StoryCircleStage",
		limitToTypes: [ElementType.Scene],
		options: ["You", "Need", "Go", "Search", "Find", "Take", "Change", "Return"],
	}),
	AbtStage: new SelectAttribute({
		id: "AbtStage",
		limitToTypes: [ElementType.Chapter, ElementType.Session],
		options: ["Need", "And", "But", "Therefore"],
	}),
	Description: new LongTextAttribute({
		id: "Description",
	}),
	Arc: new SelectWithDescriptionAttribute({
		id: "Arc",
		limitToTypes: [ElementType.NonPlayerCharacter],
		options: ["Hero", "Villain", "Mentor", "Trickster", "Herald", "Shapeshifter", "Shadow", "Ally"],
	}),
	Occupation: new ShortTextAttribute({
		id: "Occupation",
		limitToTypes: [ElementType.PlayerCharacter, ElementType.NonPlayerCharacter],
	}),
	Ghost: new LongTextAttribute({
		id: "Ghost",
		limitToTypes: [ElementType.PlayerCharacter, ElementType.NonPlayerCharacter],
	}),
	Lie: new LongTextAttribute({
		id: "Lie",
		limitToTypes: [ElementType.PlayerCharacter, ElementType.NonPlayerCharacter],
	}),
	Beliefs: new LongTextAttribute({
		id: "Beliefs",
		limitToTypes: [ElementType.PlayerCharacter, ElementType.NonPlayerCharacter],
	}),
	Need: new LongTextAttribute({
		id: "Need",
		limitToTypes: [ElementType.PlayerCharacter, ElementType.NonPlayerCharacter],
	}),
	Behaviour: new LongTextAttribute({
		id: "Behaviour",
		limitToTypes: [ElementType.PlayerCharacter, ElementType.NonPlayerCharacter],
	}),
	Want: new LongTextAttribute({
		id: "Want",
		limitToTypes: [ElementType.PlayerCharacter, ElementType.NonPlayerCharacter],
	}),
	Opposition: new LongTextAttribute({
		id: "Opposition",
		limitToTypes: [ElementType.PlayerCharacter, ElementType.NonPlayerCharacter],
	}),
	Stake: new SliderAttribute({
		id: "Stake",
		limitToTypes: [ElementType.NonPlayerCharacter],
	}),
	Strengths: new StrengthsAttribute({
		id: "Strengths",
		limitToTypes: [ElementType.PlayerCharacter, ElementType.NonPlayerCharacter],
	}),
	Weaknesses: new WeaknessesAttribute({
		id: "Weaknesses",
		limitToTypes: [ElementType.PlayerCharacter, ElementType.NonPlayerCharacter],
	}),
	Dob: new DateAttribute({
		id: "Dob",
		limitToTypes: [ElementType.PlayerCharacter, ElementType.NonPlayerCharacter],
	}),
	Dod: new DateAttribute({
		id: "Dod",
		limitToTypes: [ElementType.PlayerCharacter, ElementType.NonPlayerCharacter],
	}),
	Age: new NumberAttribute({
		id: "Age",
		limitToTypes: [ElementType.PlayerCharacter, ElementType.NonPlayerCharacter],
	}),
	Date: new DateAttribute({
		id: "Date",
		limitToTypes: [ElementType.Session, ElementType.Scene],
	}),
	SessionDate: new DateAttribute({
		id: "SessionDate",
		limitToTypes: [ElementType.Session],
	}),
	SceneAction: new LongTextAttribute({
		id: "SceneAction",
		limitToTypes: [ElementType.Scene],
	}),
	ExternalActions: new BooleanAttribute({
		id: "ExternalActions",
		limitToTypes: [ElementType.Scene],
	}),
	Address: new LongTextAttribute({
		id: "Address",
		limitToTypes: [ElementType.Location],
	}),
	Philosophy: new LongTextAttribute({
		id: "Philosophy",
		limitToTypes: [ElementType.Faction],
	}),
	Structure: new LongTextAttribute({
		id: "Structure",
		limitToTypes: [ElementType.Faction],
	}),
};

export class AttributeFactory {
	static create(id: string, value?: any): Attribute {
		const template = RpgManagerAttributesMap[id];

		if (template == null) throw new Error(`Attribute not found: ${id}`);

		return template.cloneWithValue(value);
	}

	static createList(type: ElementType, attributes: { [key: string]: any }): Attribute[] {
		const response: Attribute[] = [];

		const templates: Attribute[] = [];
		for (const key in RpgManagerAttributesMap) {
			const template = RpgManagerAttributesMap[key];
			if (template.limitToTypes == null || template.limitToTypes.includes(type)) {
				templates.push(template);
			}
		}

		templates.forEach((template: Attribute) => {
			response.push(template.cloneWithValue(attributes[template.id]));
		});

		return response;
	}
}
