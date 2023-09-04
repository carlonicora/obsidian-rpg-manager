import { useApp } from "@/hooks/useApp";
import { App, TFile } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { RelationshipType } from "src/data/enums/RelationshipType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { RelationshipInterface } from "src/data/interfaces/RelationshipInterface";
import { useApi } from "src/hooks/useApi";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";
import RelationshipDescriptionComponent from "./RelationshipDescriptionComponent";

export default function RelationshipComponent({
	element,
	relationship,
}: {
	element: ElementInterface;
	relationship: RelationshipInterface;
}): React.ReactElement {
	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();
	const app: App = useApp();

	const removeRelationship = () => {
		let file: TFile;
		let relatedElementToRemove: ElementInterface;
		let currentElement: ElementInterface;

		if (relationship.type === RelationshipType.Reversed) {
			file = relationship.component.file;
			currentElement = relationship.component;
			relatedElementToRemove = element;
		} else {
			file = element.file;
			currentElement = element;
			relatedElementToRemove = relationship.component;
		}

		const codeblockService = new RpgManagerCodeblockService(app, api, file);
		codeblockService.removeRelationship(currentElement, relatedElementToRemove);
	};

	return (
		<div className="border border-[--background-modifier-border] rounded-lg flex flex-col">
			<div className="flex justify-center relative">
				<div className="w-full relative pb-[100%]">
					<div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-tl-lg rounded-tr-lg">
						<a
							href={relationship.component.file.path}
							className="w-full h-full internal-link flex items-center justify-center"
						>
							{relationship.component.images.length > 0 ? (
								<img
									src={relationship.component.images[0].src}
									alt={relationship.component.images[0].caption}
									className="min-w-full min-h-full object-cover !cursor-pointer"
								/>
							) : (
								<svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 16 16">
									<path
										d="m 4 1 c -1.644531 0 -3 1.355469 -3 3 v 1 h 1 v -1 c 0 -1.109375 0.890625 -2 2 -2 h 1 v -1 z m 2 0 v 1 h 4 v -1 z m 5 0 v 1 h 1 c 1.109375 0 2 0.890625 2 2 v 1 h 1 v -1 c 0 -1.644531 -1.355469 -3 -3 -3 z m -5 4 c -0.550781 0 -1 0.449219 -1 1 s 0.449219 1 1 1 s 1 -0.449219 1 -1 s -0.449219 -1 -1 -1 z m -5 1 v 4 h 1 v -4 z m 13 0 v 4 h 1 v -4 z m -4.5 2 l -2 2 l -1.5 -1 l -2 2 v 0.5 c 0 0.5 0.5 0.5 0.5 0.5 h 7 s 0.472656 -0.035156 0.5 -0.5 v -1 z m -8.5 3 v 1 c 0 1.644531 1.355469 3 3 3 h 1 v -1 h -1 c -1.109375 0 -2 -0.890625 -2 -2 v -1 z m 13 0 v 1 c 0 1.109375 -0.890625 2 -2 2 h -1 v 1 h 1 c 1.644531 0 3 -1.355469 3 -3 v -1 z m -8 3 v 1 h 4 v -1 z m 0 0"
										fill="#2e3434"
										fillOpacity="0.34902"
									/>
								</svg>
							)}
						</a>
					</div>
				</div>
			</div>

			<div className="flex justify-center p-2">
				<a href={relationship.component.file.path} className="internal-link !no-underline !text-[--text-normal]">
					<h4 className="!font-extralight !m-0 !text-base">{relationship.component.file.basename}</h4>
				</a>
			</div>

			<div className="flex p-2">
				<RelationshipDescriptionComponent element={element} relationship={relationship} />
			</div>

			<div className="flex align-bottom mt-auto w-full p-2">
				<button
					className={`w-full
							${
								relationship.isInContent ||
								relationship.isAlsoInContent ||
								relationship.type === RelationshipType.Reversed
									? "text-[--text-faint] cursor-not-allowed"
									: "rpgm-danger"
							}`}
					disabled={
						relationship.isInContent || relationship.isAlsoInContent || relationship.type === RelationshipType.Reversed
					}
					onClick={removeRelationship}
					title={
						relationship.isInContent || relationship.isAlsoInContent || relationship.type === RelationshipType.Reversed
							? relationship.type === RelationshipType.Reversed
								? "You cannot remove the relationship, as it is contained in the content of the related element"
								: "You cannot remove the relationship, as it is contained in the content"
							: "Remove relationship"
					}
				>
					{t("buttons.delete")}
				</button>
			</div>
		</div>
	);
}
