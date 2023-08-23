import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import MarkdownComponent from "src/components/markdowns/MarkdownComponent";
import { NewRelationshipController } from "src/controllers/NewRelationshipController";
import { ElementType } from "src/data/enums/ElementType";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { MajorClueInterface } from "src/data/interfaces/MajorClueInterface";
import { useApi } from "src/hooks/useApi";
import { HelperService } from "src/services/HelperService";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";
import AttributeTitleComponent from "../AttributeTitleComponent";
import TextInputComponent from "../primitives/TextInputComponent";

function MajorCluesEdit({
	element,
	attribute,
}: {
	element: ElementInterface;
	attribute: AttributeInterface;
}): React.ReactElement {
	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();

	const cluesData: any = attribute.value as MajorClueInterface[];
	const cl: MajorClueInterface[] = cluesData.map((clueData: any) => {
		return {
			clue: clueData.clue
				? (api.get(HelperService.extractPath(clueData.clue)) as ElementInterface | undefined)
				: undefined,
			description: clueData.description,
			destination: clueData.destination
				? (api.get(HelperService.extractPath(clueData.destination)) as ElementInterface | undefined)
				: undefined,
		};
	});

	const [clues, setClues] = React.useState<MajorClueInterface[]>(cl);

	const handleSave = () => {
		const value: any[] = [];
		clues.forEach((clue: MajorClueInterface) => {
			value.push({
				clue: "[[" + clue.clue.path + "]]",
				description: clue.description,
				destination: clue.destination ? "[[" + clue.destination.path + "]]" : "",
			});
		});

		const codeblockService = new RpgManagerCodeblockService(app, api, element.file);

		codeblockService.updateCodeblockData(attribute.id, value);
	};

	const handleReplaceClue = (value: string, params: any) => {
		if (params.clue === undefined) return;

		const newClue = api.get(HelperService.extractPath(value)) as ElementInterface;
		setClues(
			clues.map((currentClue: MajorClueInterface) => {
				if (currentClue.clue.path === params.clue) currentClue.clue = newClue;

				return currentClue;
			})
		);
	};

	const handleAddClue = (value: string) => {
		const clue = api.get(HelperService.extractPath(value)) as ElementInterface;
		setClues([...clues, { clue: clue, description: "", destination: undefined }]);
	};

	const handleReplaceDestination = (value: string, params?: any) => {
		if (params.clue === undefined) return;

		const destination = api.get(HelperService.extractPath(value)) as ElementInterface;
		setClues(
			clues.map((currentClue: MajorClueInterface) => {
				if (currentClue.clue.path === params.clue) currentClue.destination = destination;

				return currentClue;
			})
		);
	};

	const handleSearchClue = (type: "add" | "replace", clue?: MajorClueInterface) => {
		const searcher = new NewRelationshipController(
			app,
			api,
			element,
			undefined,
			[ElementType.Clue],
			type === "add" ? handleAddClue : handleReplaceClue,
			clue ? { clue: clue.clue.path } : undefined
		);
		searcher.open();
	};

	const handleSearchDestination = (clue: MajorClueInterface) => {
		const searcher = new NewRelationshipController(app, api, element, undefined, undefined, handleReplaceDestination, {
			clue: clue.clue.path,
		});
		searcher.open();
	};

	const handleDeleteClue = (clue: MajorClueInterface) => {
		setClues(clues.filter((currentClue: MajorClueInterface) => currentClue.clue.path !== clue.clue.path));
	};

	return (
		<div className="w-full p-3 border border-[--background-modifier-border] rounded-lg">
			<MajorClueHeader isEditing={true} />
			<div className="w-full">
				{clues.map((clue: MajorClueInterface, index: number) => (
					<div
						key={index}
						className="grid grid-cols-6 border-b border-b[--background-modifier-border] pt-2 pb-2 pr-1 group"
					>
						<div className="col-span-1">
							<a
								href={clue.clue.path}
								className="internal-link !no-underline cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover]"
							>
								{clue.clue.name}
							</a>
							{" ("}
							<span
								className="!no-underline cursor-pointer hover:text-[--text-accent-hover]"
								onClick={() => handleSearchClue("replace", clue)}
							>
								{t("buttons.replace")}
							</span>
							{")"}
						</div>
						<div className="col-span-3 pr-1">
							<TextInputComponent
								initialValue={clue.description}
								campaignPath={element.type === ElementType.Campaign ? element.path : element.campaign.path}
								className="w-full resize-none overflow-y-hidden border border-[--background-modifier-border] active:border-[--background-modifier-border-hover] active:shadow-none rounded-md"
								onChange={(value: string) => {
									setClues(
										clues.map((currentClue: MajorClueInterface) => {
											if (currentClue.clue.path === clue.clue.path) currentClue.description = value;

											return currentClue;
										})
									);
								}}
							/>
						</div>
						<div className="col-span-1 pr-1">
							{clue.destination ? (
								<>
									<a
										href={clue.destination.path}
										className="internal-link !no-underline cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover]"
									>
										{clue.destination.name}
									</a>
									{" ("}
									<span
										className="!no-underline cursor-pointer hover:text-[--text-accent-hover]"
										onClick={() => handleSearchDestination(clue)}
									>
										{t("buttons.replace")}
									</span>
									{")"}
								</>
							) : (
								<span
									className="!no-underline cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover]"
									onClick={() => handleSearchDestination(clue)}
								>
									{t("buttons.adddestination")}
								</span>
							)}
						</div>
						<div className="col-span-1 flex justify-end">
							<button className="rpgm-danger opacity-0 group-hover:opacity-100" onClick={() => handleDeleteClue(clue)}>
								{t("buttons.delete")}
							</button>
						</div>
					</div>
				))}
				<div className="grid grid-cols-5 border-b border-b[--background-modifier-border] pt-2 pb-2">
					<div className="col-span-1">
						<span
							className="!no-underline cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover]"
							onClick={() => handleSearchClue("add")}
						>
							{t("create.add", { context: "clue" })}
						</span>
					</div>
					<div className="col-span-3"></div>
					<div className="col-span-1"></div>
				</div>
				<div className="flex justify-end mt-3">
					<button className="rpgm-primary" onClick={handleSave}>
						{t("buttons.save")}
					</button>
				</div>
			</div>
		</div>
	);
}

function MajorCluesView({ attribute, edit }: { attribute: AttributeInterface; edit: () => void }): React.ReactElement {
	const { t } = useTranslation();

	return (
		<div className="w-full p-3 border border-[--background-modifier-border] rounded-lg hover:bg-[--background-secondary] cursor-pointer">
			<MajorCluesBrowse attribute={attribute} />
			<div className="w-full flex justify-end mt-3">
				<button className="rpgm-secondary" onClick={edit}>
					{t("buttons.edit")}
				</button>
			</div>
		</div>
	);
}

function MajorCluesBrowse({ attribute }: { attribute: AttributeInterface }): React.ReactElement {
	if (!attribute.isSet) return <></>;

	const api: RpgManagerInterface = useApi();

	const cluesData: MajorClueInterface[] = attribute.value as MajorClueInterface[];

	const clues: MajorClueInterface[] = cluesData.map((clueData: any) => {
		return {
			clue: clueData.clue ? (api.get(extractPath(clueData.clue)) as ElementInterface | undefined) : undefined,
			description: clueData.description,
			destination: clueData.destination
				? (api.get(extractPath(clueData.destination)) as ElementInterface | undefined)
				: undefined,
		};
	});

	function extractPath(input: string): string {
		const regex = /\[\[(.*?)(?:\|.*?)?\]\]/;
		const match = input.match(regex);

		if (match && match[1]) {
			return match[1];
		}

		return undefined;
	}

	return (
		<div className="w-full">
			<MajorClueHeader isEditing={false} />
			{clues.map((clue: MajorClueInterface, index: number) => (
				<div key={index} className="grid grid-cols-5 border-b border-b-[--background-modifier-border] pt-1 pb-1">
					<div className="col-span-1 pr-1">
						{clue.clue && (
							<a
								href={clue.clue.path}
								className="internal-link !no-underline cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover]"
							>
								{clue.clue.name}
							</a>
						)}
					</div>
					<div className="col-span-3 pr-1">
						<MarkdownComponent value={clue.description} />
					</div>
					<div className="col-span-1">
						{clue.destination && (
							<a
								href={clue.destination.path}
								className="internal-link !no-underline cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover]"
							>
								{clue.destination.name}
							</a>
						)}
					</div>
				</div>
			))}
		</div>
	);
}

function MajorClueHeader({ isEditing }: { isEditing: boolean }): React.ReactElement {
	const { t } = useTranslation();
	return (
		<div
			className={`grid ${
				isEditing ? "grid-cols-6" : "grid-cols-5"
			} border-b border-b-[--background-modifier-border] mb-2 pb-2`}
		>
			<div className="text-xs !text-[--text-faint] col-span-1 pr-1">{t("elements.clue", { count: 1 })}</div>
			<div className="text-xs !text-[--text-faint] col-span-3 pr-1">{t("clues.description")}</div>
			<div className={`text-xs !text-[--text-faint] ${isEditing ? "col-span-2" : "col-span-1"}`}>
				{t("clues.destination")}
			</div>
		</div>
	);
}

export default function MajorCluesAttributeComponent({
	element,
	attribute,
	isEditable,
}: {
	element: ElementInterface;
	attribute: AttributeInterface;
	isEditable: boolean;
}): React.ReactElement {
	const [editing, setEditing] = React.useState<boolean>(false);

	const handleEdit = () => {
		setEditing(true);
	};

	return (
		<>
			<AttributeTitleComponent attribute={attribute} />
			<div>
				{editing ? (
					<MajorCluesEdit element={element} attribute={attribute} />
				) : isEditable ? (
					<MajorCluesView attribute={attribute} edit={handleEdit} />
				) : (
					<MajorCluesBrowse attribute={attribute} />
				)}
			</div>
		</>
	);
}
