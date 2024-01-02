import * as React from "react";
import { useTranslation } from "react-i18next";
import { AttributeComponentType } from "src/data/enums/AttributeComponentType";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import AbtStageAttributeComponent from "./types/AbtStageAttributeComponent";
import ArcAttributeComponent from "./types/ArcAttributeComponent";
import BooleanAttributeComponent from "./types/BooleanAttributeComponent";
import DateAttributeComponent from "./types/DateAttributeComponent";
import DefaultAttributeTypeComponent from "./types/DefaultAttributeTypeComponent";
import LinkAttributeTypeComponent from "./types/LinkAttributeComponent";
import LongTextAttributeComponent from "./types/LongTextAttributeComponent";
import MajorCluesAttributeComponent from "./types/MajorCluesAttributeComponent";
import MapAttributeComponent from "./types/MapAttributeComponent";
import NonPlayerCharacterTypeAttributeComponent from "./types/NonPlayerCharacterTypeAttributeComponent";
import NumberAttributeTypeComponent from "./types/NumberAttributeTypeComponent";
import PronounComponent from "./types/PronounComponent";
import ScaleTypeAttributeComponent from "./types/ScaleTypeAttributeComponent";
import SceneTypeAttributeComponent from "./types/SceneTypeAttributeComponent";
import SelectAttributeTypeComponent from "./types/SelectAttributeTypeComponent";
import StoryCircleStageAttributeComponent from "./types/StoryCircleStageAttributeComponent";
import StrengthsAttributeComponent from "./types/StrengthsAttributeComponent";
import WeaknessesAttributeComponent from "./types/WeaknessesAttributeComponent";

const ATTRIBUTES_TO_NOT_SHOW = [
	AttributeComponentType.Description,
	AttributeComponentType.StoryCircle,
	AttributeComponentType.Kishotenketsu,
	AttributeComponentType.Duration,
	AttributeComponentType.Parent,
	AttributeComponentType.Conflict,
	AttributeComponentType.SensoryImprint,
];

export default function AttributeListComponent({
	element,
	isEditable,
}: {
	element: ElementInterface;
	isEditable: boolean;
}): React.ReactElement {
	const { t } = useTranslation();

	const attributes = element.attributes.filter((attribute) => attribute.isSet && !ATTRIBUTES_TO_NOT_SHOW.contains(attribute.type));
	if (attributes.length === 0) return null;

	return (
		<div className="rounded-lg border border-[--background-modifier-border] bg-[--background-primary] relative p-3">
			<div>
				<h2 className="!text-2xl !font-bold border-b border-b-[--background-modifier-border]">
					{t("attributes.attribute", { count: 2 })}
				</h2>
			</div>
			<div>
				{attributes.map((attribute: AttributeInterface, index: number) => {
					let attributeComponent;

					switch (attribute.type) {
						case AttributeComponentType.Pronoun:
							attributeComponent = <PronounComponent element={element} attribute={attribute} isEditable={isEditable} />;
							break;
						case AttributeComponentType.Scale:
							attributeComponent = (
								<ScaleTypeAttributeComponent element={element} attribute={attribute} isEditable={isEditable} />
							);
							break;
						case AttributeComponentType.SceneType:
							attributeComponent = (
								<SceneTypeAttributeComponent element={element} attribute={attribute} isEditable={isEditable} />
							);
							break;
						case AttributeComponentType.Map:
							attributeComponent = (
								<MapAttributeComponent element={element} attribute={attribute} isEditable={isEditable} />
							);
							break;
						case AttributeComponentType.Arc:
							attributeComponent = (
								<ArcAttributeComponent element={element} attribute={attribute} isEditable={isEditable} />
							);
							break;
						case AttributeComponentType.Date:
							attributeComponent = (
								<DateAttributeComponent element={element} attribute={attribute} isEditable={isEditable} />
							);
							break;
						case AttributeComponentType.Strengths:
							attributeComponent = (
								<StrengthsAttributeComponent element={element} attribute={attribute} isEditable={isEditable} />
							);
							break;
						case AttributeComponentType.Weaknesses:
							attributeComponent = (
								<WeaknessesAttributeComponent element={element} attribute={attribute} isEditable={isEditable} />
							);
							break;
						case AttributeComponentType.LongText:
							attributeComponent = (
								<LongTextAttributeComponent element={element} attribute={attribute} isEditable={isEditable} />
							);
							break;
						case AttributeComponentType.StoryCircleStage:
							attributeComponent = (
								<StoryCircleStageAttributeComponent element={element} attribute={attribute} isEditable={isEditable} />
							);
							break;
						case AttributeComponentType.AbtStage:
							attributeComponent = (
								<AbtStageAttributeComponent element={element} attribute={attribute} isEditable={isEditable} />
							);
							break;
						case AttributeComponentType.Boolean:
							attributeComponent = (
								<BooleanAttributeComponent element={element} attribute={attribute} isEditable={isEditable} />
							);
							break;
						case AttributeComponentType.Number:
							attributeComponent = (
								<NumberAttributeTypeComponent element={element} attribute={attribute} isEditable={isEditable} />
							);
							break;
						case AttributeComponentType.Link:
							attributeComponent = (
								<LinkAttributeTypeComponent element={element} attribute={attribute} isEditable={isEditable} />
							);
							break;
						case AttributeComponentType.Select:
							attributeComponent = (
								<SelectAttributeTypeComponent element={element} attribute={attribute} isEditable={isEditable} />
							);
							break;
						case AttributeComponentType.MajorClues:
							attributeComponent = (
								<MajorCluesAttributeComponent element={element} attribute={attribute} isEditable={isEditable} />
							);
							break;
						case AttributeComponentType.NonPlayerCharacterType:
							attributeComponent = (
								<NonPlayerCharacterTypeAttributeComponent
									element={element}
									attribute={attribute}
									isEditable={isEditable}
								/>
							);
							break;
						case AttributeComponentType.Text:
						default:
							attributeComponent = (
								<DefaultAttributeTypeComponent element={element} attribute={attribute} isEditable={isEditable} />
							);
					}

					if (attributeComponent === undefined) return null;

					return (
						<div className="!mb-6" key={index}>
							{attributeComponent}
						</div>
					);
				})}
			</div>
		</div>
	);
}
