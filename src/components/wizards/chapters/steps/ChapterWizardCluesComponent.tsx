import { RpgManagerInterface } from "@/RpgManagerInterface";
import TextAreaComponent from "@/components/attributes/primitives/TextAreaComponent";
import MarkdownComponent from "@/components/markdowns/MarkdownComponent";
import { NewRelationshipController } from "@/controllers/NewRelationshipController";
import { ElementType } from "@/data/enums/ElementType";
import { ElementInterface } from "@/data/interfaces/ElementInterface";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/hooks/useApp";
import { useWizard } from "@/hooks/useWizard";
import { HelperService } from "@/services/HelperService";
import { App } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { ChapterCluesInterface } from "../interfaces/ChapterCluesInterface";

export default function ChapterWizardCluesComponent({
	name,
	campaignPath,
	chatGpt,
	setOverlay,
	errors,
}: {
	name: string;
	campaignPath?: string;
	chatGpt?: any;
	setOverlay: (show: boolean) => void;
	errors?: any[];
}): React.ReactElement {
	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();
	const app: App = useApp();
	const wizardData = useWizard();

	const [chapterClues, setChapterClues] = React.useState<ChapterCluesInterface[]>(
		wizardData.clues.length > 0 ? wizardData.clues : [{ id: uuidv4(), cluePath: "" }]
	);

	const handleInputChange = (
		index: number,
		field: keyof ChapterCluesInterface,
		value: string,
		isExistingClue?: boolean
	) => {
		const updatedClues = [...chapterClues];
		if (field === "cluePath" || field === "clueName" || field === "description") updatedClues[index][field] = value;

		if (isExistingClue !== undefined) {
			updatedClues[index].isExistingClue = isExistingClue;

			if (isExistingClue === true) {
				updatedClues[index].clueName =
					(api.get(updatedClues[index].cluePath) as ElementInterface | undefined)?.name ?? "";
			} else {
				updatedClues[index].cluePath = undefined;
			}
		}

		const isClueEmpty = (clue: ChapterCluesInterface) => !clue.clueName && !clue.description;

		if (index === chapterClues.length - 1) {
			updatedClues.push({ id: uuidv4(), clueName: "" });
		}

		const cleanedClues = updatedClues.filter((clue, idx) => idx === updatedClues.length - 1 || !isClueEmpty(clue));

		setChapterClues(cleanedClues);
		wizardData.clues = cleanedClues;
	};

	const removeExisting = (index: number) => {
		const updatedClues = [...chapterClues];
		updatedClues[index].clueName = undefined;
		handleInputChange(index, "cluePath", "", false);
	};

	const setExistingClue = (cluePath: string, params: any) => {
		cluePath = HelperService.extractPath(cluePath);
		handleInputChange(params.index, "cluePath", cluePath, true);
	};

	const selectExistingClue = (clueIndex: number) => {
		new NewRelationshipController(app, api, undefined, campaignPath, [ElementType.Clue], setExistingClue, {
			index: clueIndex,
		}).open();
	};

	let error: string | undefined = undefined;
	if (errors !== undefined && errors.length > 0) {
		error = t("wizards.errors");
		errors.forEach((singleError: string) => (error += "\n- " + singleError));
	}

	return (
		<>
			<h3 className="!m-0 !text-xl !font-extralight">{t("elements.clue", { count: 2 })}</h3>
			{error && (
				<div className="!mt-3 !mb-3 text-[--text-error]">
					<MarkdownComponent value={error} />
				</div>
			)}
			<div className="space-y-4">
				<div className="grid grid-cols-2 space-x-4">
					<div className="w-full font-bold">{t("elements.clue", { count: 1 })}</div>
					<div className="w-full font-bold">{t("wizards.chapter.cluesdescription")}</div>
				</div>
				{chapterClues.map((clue, index) => (
					<div
						key={clue.id}
						className={`grid grid-cols-2 p-3 min-h-[4rem] ${
							index % 2 === 0 ? "bg-[--background-primary-alt]" : "bg-[--background-primary]"
						}`}
					>
						<div className={`w-full relative group ${clue.isExistingClue && "col-span-2"}`}>
							{clue.isExistingClue ? (
								<>
									<div>{clue.clueName ?? ""}</div>
									<span
										className="text-xs cursor-pointer bottom-0 opacity-0 group-hover:opacity-100 hover:text-[--text-accent-hover]"
										onClick={() => removeExisting(index)}
									>
										{t("wizards.chapter.removeexistingclue")}
									</span>
								</>
							) : (
								<>
									<input
										key={clue.id}
										type="text"
										className="w-full resize-none overflow-y-hidden border border-[--background-modifier-border] active:border-[--background-modifier-border-hover] active:shadow-none rounded-md"
										value={clue.clueName || ""}
										onChange={(e) => handleInputChange(index, "clueName", e.target.value)}
									/>
									<span
										className="text-xs cursor-pointer bottom-0 opacity-0 group-hover:opacity-100 hover:text-[--text-accent-hover]"
										onClick={() => selectExistingClue(index)}
									>
										{t("wizards.chapter.selectexistingclue")}
									</span>
								</>
							)}
						</div>
						{!clue.isExistingClue && (
							<div className="w-full ml-3">
								<TextAreaComponent
									campaignPath={campaignPath}
									initialValue={clue.description}
									onChange={(value) => handleInputChange(index, "description", value)}
									className="w-full resize-none overflow-y-hidden border border-[--background-modifier-border] active:border-[--background-modifier-border-hover] active:shadow-none rounded-md"
								/>
							</div>
						)}
					</div>
				))}
			</div>
		</>
	);
}
