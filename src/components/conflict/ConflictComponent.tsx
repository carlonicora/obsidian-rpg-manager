import { RpgManagerInterface } from "@/RpgManagerInterface";
import { NewRelationshipController } from "@/controllers/NewRelationshipController";
import { ElementType } from "@/data/enums/ElementType";
import { AttributeInterface } from "@/data/interfaces/AttributeInterface";
import { ConflictInterface, ConflictStake } from "@/data/interfaces/ConflictInterface";
import { ElementInterface } from "@/data/interfaces/ElementInterface";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/hooks/useApp";
import { HelperService } from "@/services/HelperService";
import { RpgManagerCodeblockService } from "@/services/RpgManagerCodeblockService";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { App } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import TextInputComponent from "../attributes/primitives/TextInputComponent";
import MarkdownEditorComponent from "../editors/MarkdownEditorComponent";
import MarkdownComponent from "../markdowns/MarkdownComponent";

export default function ConflictComponent({
	element,
	attribute,
	isEditable,
}: {
	element: ElementInterface;
	attribute: AttributeInterface;
	isEditable: boolean;
}): React.ReactElement {
	const api: RpgManagerInterface = useApi();
	const app: App = useApp();

	const [edit, setEdit] = React.useState<boolean>(false);

	const [conflictValue, setConflictValue] = React.useState<ConflictInterface>(
		attribute.value ?? {
			status: "planned",
		}
	);

	const save = () => {
		const codeblockService = new RpgManagerCodeblockService(app, api, element.file);

		attribute.value = conflictValue;

		codeblockService.updateCodeblockData(attribute.id, conflictValue).then(() => {
			setEdit(false);
		});
	};

	const remove = () => {
		const codeblockService = new RpgManagerCodeblockService(app, api, element.file);

		attribute.value = conflictValue;

		codeblockService.updateCodeblockData(attribute.id, undefined).then(() => {
			setEdit(false);
		});
	};

	const setValue = (subAttibute: string, newValue: string | string[]) => {
		setConflictValue({ ...conflictValue, [subAttibute]: newValue });
	};

	const reset = () => {
		setEdit(false);
	};

	const campaignPath = element.type === ElementType.Campaign ? element.path : element.campaignPath;

	if (edit)
		return (
			<Edit
				element={element}
				campaignPath={campaignPath}
				attribute={attribute}
				setValue={setValue}
				save={save}
				remove={remove}
				reset={reset}
			/>
		);

	if (isEditable) return <View attribute={attribute} campaignPath={campaignPath} setEdit={setEdit} />;

	return <Browse attribute={attribute} campaignPath={campaignPath} />;
}

function Edit({
	element,
	campaignPath,
	attribute,
	setValue,
	save,
	remove,
	reset,
}: {
	element: ElementInterface;
	campaignPath: string;
	attribute: AttributeInterface;
	setValue: (subAttibute: string, newValue: string) => void;
	save: () => void;
	remove: () => void;
	reset: () => void;
}): React.ReactElement {
	const { t } = useTranslation();

	return (
		<div className="rounded-lg border border-[--background-modifier-border] overflow-hidden bg-[--background-primary] mb-3 p-3">
			<h2 className="!m-0 !mb-6 !text-2xl !font-bold border-b border-b-[--background-modifier-border]">
				{t("attributes.conflict")}
			</h2>
			<div className="gap-3 grid grid-cols-7">
				<EditableTitleAttribute attribute={attribute} campaignPath={campaignPath} setValue={setValue} />
				<EditableStatusAttribute attribute={attribute} setValue={setValue} />
				<EditableCategoryAttribute attribute={attribute} setValue={setValue} />
				<EditableInvolvementAttribute attribute={attribute} setValue={setValue} />
				<EditableLongTextAttribute
					attribute={attribute}
					campaignPath={campaignPath}
					setValue={setValue}
					type="description"
				/>
				<EditableConflictStakesAttribute attribute={attribute} setValue={setValue} />
				<EditableRelationshipsAttribute
					attribute={attribute}
					type="opposingforces"
					campaignPath={campaignPath}
					setValue={setValue}
				/>
				<EditableRelationshipsAttribute
					attribute={attribute}
					type="events"
					campaignPath={campaignPath}
					setValue={setValue}
				/>
				<EditableLongTextAttribute
					attribute={attribute}
					campaignPath={campaignPath}
					setValue={setValue}
					type="outcome"
				/>
			</div>

			<div className="flex justify-end mt-3">
				<button className="rpgm-danger" onClick={remove}>
					{t("buttons.delete")}
				</button>
				<button className="rpgm-secondary" onClick={reset}>
					{t("buttons.cancel")}
				</button>
				<button className="rpgm-primary" onClick={save}>
					{t("buttons.save")}
				</button>
			</div>
		</div>
	);
}

function View({
	attribute,
	campaignPath,
	setEdit,
}: {
	attribute: AttributeInterface;
	campaignPath: string;
	setEdit: (editable: boolean) => void;
}): React.ReactElement {
	return (
		<div
			onClick={() => {
				setEdit(true);
			}}
			className="cursor-pointer hover:bg-[--background-secondary]"
		>
			<Browse attribute={attribute} campaignPath={campaignPath} />
		</div>
	);
}

function Browse({
	attribute,
	campaignPath,
}: {
	attribute: AttributeInterface;
	campaignPath: string;
}): React.ReactElement {
	const { t } = useTranslation();

	return (
		<div className="rounded-lg border border-[--background-modifier-border] overflow-hidden bg-[--background-primary] mb-3 p-3">
			<h2 className="!m-0 !mb-6 !text-2xl !font-bold border-b border-b-[--background-modifier-border]">
				{t("attributes.conflict")}
			</h2>
			<div className="gap-3 grid grid-cols-7">
				<EditableTitleAttribute attribute={attribute} campaignPath={campaignPath} />
				<EditableStatusAttribute attribute={attribute} />
				<EditableCategoryAttribute attribute={attribute} />
				<EditableInvolvementAttribute attribute={attribute} />
				<EditableLongTextAttribute attribute={attribute} campaignPath={campaignPath} type="description" />
				<EditableConflictStakesAttribute attribute={attribute} />
				<EditableRelationshipsAttribute attribute={attribute} type="opposingforces" />
				<EditableRelationshipsAttribute attribute={attribute} type="events" />
				<EditableLongTextAttribute attribute={attribute} campaignPath={campaignPath} type="outcome" />
			</div>
		</div>
	);
}

function EditableTitleAttribute({
	attribute,
	campaignPath,
	setValue,
}: {
	attribute: AttributeInterface;
	campaignPath: string;
	setValue?: (subAttibute: string, newValue: string) => void;
}): React.ReactElement {
	const { t } = useTranslation();

	const [showHelp, setShowHelp] = React.useState<boolean>(false);

	const setTitle = (newValue: string) => {
		setValue("title", newValue);
	};

	return (
		<>
			<div className="!font-bold col-span-1">
				<div>{t("conflict.title")}</div>
				{setValue && (
					<div
						className="text-xs cursor-pointer text-[--color-base-25] hover:text-[--text-accent-hover]"
						onClick={() => setShowHelp(!showHelp)}
					>
						<FontAwesomeIcon icon={faCircleQuestion} />
					</div>
				)}
			</div>
			<div className="col-span-6">
				{setValue ? (
					<TextInputComponent
						className="min-h-[2em] w-full resize-none overflow-y-hidden border border-[--background-modifier-border] active:border-[--background-modifier-border-hover] active:shadow-none rounded-md"
						onChange={setTitle}
						initialValue={attribute.value?.title ?? ""}
						campaignPath={campaignPath}
					/>
				) : (
					<div className="min-h-[2em] p-2 w-full resize-none overflow-y-hidden border border-[--background-modifier-border] active:border-[--background-modifier-border-hover] active:shadow-none rounded-md">
						<MarkdownComponent value={attribute.value.title} />
					</div>
				)}
			</div>
			{showHelp && (
				<div className="col-span-full mb-3 p-3 rounded-lg bg-[--background-primary-alt] text-sm">
					<MarkdownComponent value={t("conflict.description", { context: "title" })} />
				</div>
			)}
		</>
	);
}

function EditableRelationshipsAttribute({
	attribute,
	type,
	campaignPath,
	setValue,
}: {
	attribute: AttributeInterface;
	type: string;
	campaignPath?: string;
	setValue?: (subAttibute: string, newValue: string | string[]) => void;
}): React.ReactElement {
	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();
	const app: App = useApp();

	if (!setValue && !attribute.value[type]) return null;

	const [showHelp, setShowHelp] = React.useState<boolean>(false);
	const [relationships, setRelationships] = React.useState<string[]>(attribute.value[type] ?? []);

	const addRelationship = (newValue: string) => {
		const value = HelperService.extractPath(newValue);
		setRelationships((prevRelationships) => {
			const updatedRelationships = [...prevRelationships, value];
			setValue(type, updatedRelationships);

			return updatedRelationships;
		});
	};

	const removeRelationship = (value: string) => {
		setRelationships((prevRelationships) => {
			const updatedRelationships = prevRelationships.filter((relationship) => relationship !== value);
			setValue(type, updatedRelationships);

			return updatedRelationships;
		});
	};

	let rel = "";
	if (!setValue) {
		rel = relationships
			.map(
				(relationship: string) => "[[" + relationship + "|" + (api.get(relationship) as ElementInterface).name + "]]"
			)
			.join("\\\n");
	}

	const handleSearch = () => {
		const limits: ElementType[] =
			type === "opposingforces" ? [ElementType.NonPlayerCharacter, ElementType.Faction] : [ElementType.Event];

		const searcher = new NewRelationshipController(app, api, undefined, campaignPath, limits, addRelationship);
		searcher.open();
	};

	return (
		<>
			<div className="!font-bold col-span-1">
				<div>{t("conflict." + type)}</div>
				{setValue && (
					<div
						className="text-xs cursor-pointer text-[--color-base-25] hover:text-[--text-accent-hover]"
						onClick={() => setShowHelp(!showHelp)}
					>
						<FontAwesomeIcon icon={faCircleQuestion} />
					</div>
				)}
			</div>
			<div className="col-span-6">
				{setValue ? (
					<>
						{relationships && relationships.length > 0 && (
							<div className="mb-3">
								{relationships.map((relationship, index) => (
									<span key={index} className="mb-3">
										<a
											href={relationship}
											className="internal-link !no-underline cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover]"
										>
											{(api.get(relationship) as ElementInterface).name}
										</a>
										{" ("}
										<span
											className="cursor-pointer text-[--text-muted] text-sm"
											onClick={() => removeRelationship(relationship)}
										>
											{t("buttons.delete")}
										</span>
										{") "}
									</span>
								))}
							</div>
						)}
						<div key="new-relationship" className="flex mb-3">
							<span className="cursor-pointer text-[--text-muted] text-sm" onClick={() => handleSearch()}>
								Add {t("conflict." + type)}
							</span>
						</div>
					</>
				) : (
					<div className="min-h-[2em] p-2 w-full resize-none overflow-y-hidden border border-[--background-modifier-border] active:border-[--background-modifier-border-hover] active:shadow-none rounded-md">
						<MarkdownComponent value={rel} />
					</div>
				)}
			</div>
			{showHelp && (
				<div className="col-span-full mb-3 p-3 rounded-lg bg-[--background-primary-alt] text-sm">
					<MarkdownComponent value={t("conflict.description", { context: type })} />
				</div>
			)}
		</>
	);
}

function EditableCategoryAttribute({
	attribute,
	setValue,
}: {
	attribute: AttributeInterface;
	setValue?: (subAttibute: string, newValue: string) => void;
}): React.ReactElement {
	const { t } = useTranslation();

	if (!setValue && !attribute.value.category) return null;

	const [showHelp, setShowHelp] = React.useState<boolean>(false);

	const setCategory = (newValue: string) => {
		setValue("category", newValue);
	};

	return (
		<>
			<div className="!font-bold col-span-1">
				<div>{t("conflict.category")}</div>
				{setValue && (
					<div
						className="text-xs cursor-pointer text-[--color-base-25] hover:text-[--text-accent-hover]"
						onClick={() => setShowHelp(!showHelp)}
					>
						<FontAwesomeIcon icon={faCircleQuestion} />
					</div>
				)}
			</div>
			<div className="col-span-6">
				{setValue ? (
					<select
						defaultValue={attribute.value.category}
						onChange={(e) => setCategory(e.target.value)}
						className="!pl-2 !pr-4"
					>
						<option value=""></option>
						<option value="ambition">{t("conflict.category", { context: "ambition" })}</option>
						<option value="betrayal">{t("conflict.category", { context: "betrayal" })}</option>
						<option value="survival">{t("conflict.category", { context: "survival" })}</option>
						<option value="revenge">{t("conflict.category", { context: "revenge" })}</option>
						<option value="ideology">{t("conflict.category", { context: "ideology" })}</option>
						<option value="love">{t("conflict.category", { context: "love" })}</option>
						<option value="guilt">{t("conflict.category", { context: "guilt" })}</option>
						<option value="fear">{t("conflict.category", { context: "fear" })}</option>
					</select>
				) : (
					<div className="min-h-[2em] p-2 w-full resize-none overflow-y-hidden border border-[--background-modifier-border] active:border-[--background-modifier-border-hover] active:shadow-none rounded-md">
						{t("conflict.category", { context: attribute.value.category })}
					</div>
				)}
			</div>
			{showHelp && (
				<div className="col-span-full mb-3 p-2 rounded-lg bg-[--background-primary-alt] text-sm">
					<MarkdownComponent value={t("conflict.description", { context: "category" })} />
				</div>
			)}
		</>
	);
}

function EditableInvolvementAttribute({
	attribute,
	setValue,
}: {
	attribute: AttributeInterface;
	setValue?: (subAttibute: string, newValue: string) => void;
}): React.ReactElement {
	const { t } = useTranslation();

	if (!setValue && !attribute.value.involvement) return null;

	const [showHelp, setShowHelp] = React.useState<boolean>(false);

	const setCategory = (newValue: string) => {
		setValue("involvement", newValue);
	};

	return (
		<>
			<div className="!font-bold col-span-1">
				<div>{t("conflict.involvement")}</div>
				{setValue && (
					<div
						className="text-xs cursor-pointer text-[--color-base-25] hover:text-[--text-accent-hover]"
						onClick={() => setShowHelp(!showHelp)}
					>
						<FontAwesomeIcon icon={faCircleQuestion} />
					</div>
				)}
			</div>
			<div className="col-span-6">
				{setValue ? (
					<select
						defaultValue={attribute.value.involvement}
						onChange={(e) => setCategory(e.target.value)}
						className="!pl-2 !pr-4"
					>
						<option value=""></option>
						<option value="active">{t("conflict.involvement", { context: "active" })}</option>
						<option value="passive">{t("conflict.involvement", { context: "passive" })}</option>
						<option value="unaware">{t("conflict.involvement", { context: "unaware" })}</option>
						<option value="forced">{t("conflict.involvement", { context: "forced" })}</option>
						<option value="opportunistic">{t("conflict.involvement", { context: "opportunistic" })}</option>
					</select>
				) : (
					<div className="min-h-[2em] p-2 w-full resize-none overflow-y-hidden border border-[--background-modifier-border] active:border-[--background-modifier-border-hover] active:shadow-none rounded-md">
						{t("conflict.involvement", { context: attribute.value.involvement })}
					</div>
				)}
			</div>
			{showHelp && (
				<div className="col-span-full mb-3 p-3 rounded-lg bg-[--background-primary-alt] text-sm">
					<MarkdownComponent value={t("conflict.description", { context: "involvement" })} />
				</div>
			)}
		</>
	);
}

function EditableStatusAttribute({
	attribute,
	setValue,
}: {
	attribute: AttributeInterface;
	setValue?: (subAttibute: string, newValue: string) => void;
}): React.ReactElement {
	const { t } = useTranslation();

	if (!setValue && !attribute.value.status) return null;

	const [showHelp, setShowHelp] = React.useState<boolean>(false);

	const setStatus = (newValue: string) => {
		setValue("status", newValue);
	};

	return (
		<>
			<div className="!font-bold col-span-1">
				<div>{t("conflict.status")}</div>
				{setValue && (
					<div
						className="text-xs cursor-pointer text-[--color-base-25] hover:text-[--text-accent-hover]"
						onClick={() => setShowHelp(!showHelp)}
					>
						<FontAwesomeIcon icon={faCircleQuestion} />
					</div>
				)}
			</div>
			<div className="col-span-6">
				{setValue ? (
					<select
						defaultValue={attribute.value.status}
						onChange={(e) => setStatus(e.target.value)}
						className="!pl-2 !pr-4"
					>
						<option value=""></option>
						<option value="planned">{t("conflict.status", { context: "planned" })}</option>
						<option value="inprogress">{t("conflict.status", { context: "inprogress" })}</option>
						<option value="resolved">{t("conflict.status", { context: "resolved" })}</option>
					</select>
				) : (
					<div className="min-h-[2em] p-2 w-full resize-none overflow-y-hidden border border-[--background-modifier-border] active:border-[--background-modifier-border-hover] active:shadow-none rounded-md">
						{t("conflict.status", { context: attribute.value.status })}
					</div>
				)}
			</div>
			{showHelp && (
				<div className="col-span-full mb-3 p-3 rounded-lg bg-[--background-primary-alt] text-sm">
					<MarkdownComponent value={t("conflict.description", { context: "status" })} />
				</div>
			)}
		</>
	);
}

function EditableLongTextAttribute({
	attribute,
	campaignPath,
	setValue,
	type,
}: {
	attribute: AttributeInterface;
	campaignPath: string;
	setValue?: (subAttibute: string, newValue: string) => void;
	type: string;
}): React.ReactElement {
	const { t } = useTranslation();

	if (!setValue && !attribute.value[type]) return null;

	const [showHelp, setShowHelp] = React.useState<boolean>(false);

	const setSubAttributeValue = (newValue: string) => {
		setValue(type, newValue);
	};

	return (
		<>
			<div className="!font-bold col-span-1">
				<div>{t("conflict." + type)}</div>
				{setValue && (
					<div
						className="text-xs cursor-pointer text-[--color-base-25] hover:text-[--text-accent-hover]"
						onClick={() => setShowHelp(!showHelp)}
					>
						<FontAwesomeIcon icon={faCircleQuestion} />
					</div>
				)}
			</div>
			<div className="col-span-6">
				{setValue ? (
					<MarkdownEditorComponent
						className="min-h-[2em] w-full resize-none overflow-y-hidden border border-[--background-modifier-border] active:border-[--background-modifier-border-hover] active:shadow-none rounded-md"
						campaignPath={campaignPath}
						onChange={setSubAttributeValue}
						initialValue={attribute.value[type]}
					/>
				) : (
					<div className="min-h-[2em] p-2 w-full resize-none overflow-y-hidden border border-[--background-modifier-border] active:border-[--background-modifier-border-hover] active:shadow-none rounded-md">
						<MarkdownComponent value={attribute.value[type]} />
					</div>
				)}
			</div>
			{showHelp && (
				<div className="col-span-full mb-3 p-3 rounded-lg bg-[--background-primary-alt] text-sm">
					<MarkdownComponent value={t("conflict.description", { context: type })} />
				</div>
			)}
		</>
	);
}

function EditableConflictStakesAttribute({
	attribute,
	setValue,
}: {
	attribute: AttributeInterface;
	setValue?: (subAttibute: string, newValue: string | string[]) => void;
}): React.ReactElement {
	const { t } = useTranslation();

	if (!setValue && (!attribute.value.stakes || attribute.value.stakes.length === 0)) return null;

	const [showHelp, setShowHelp] = React.useState<boolean>(false);
	const [selectedStakes, setSelectedStakes] = React.useState<ConflictStake[]>(attribute.value.stakes ?? []);

	const setStakesValue = (newValue: ConflictStake) => {
		setSelectedStakes((prevStakes) => {
			let updatedStakes;

			if (prevStakes.includes(newValue)) {
				updatedStakes = prevStakes.filter((stake) => stake !== newValue);
			} else {
				updatedStakes = [...prevStakes, newValue];
			}

			setValue("stakes", updatedStakes);

			return updatedStakes;
		});
	};

	let stakes = "";
	if (selectedStakes) {
		stakes = selectedStakes.map((stake: string) => t("conflict.stake." + stake)).join("\\\n");
	}

	return (
		<>
			<div className="!font-bold col-span-1">
				<div>{t("conflict.stakes")}</div>
				{setValue && (
					<div
						className="text-xs cursor-pointer text-[--color-base-25] hover:text-[--text-accent-hover]"
						onClick={() => setShowHelp(!showHelp)}
					>
						<FontAwesomeIcon icon={faCircleQuestion} />
					</div>
				)}
			</div>
			<div className="col-span-6">
				{setValue ? (
					<>
						<label key={"lifeanddeath"} className="block">
							<input
								type="checkbox"
								checked={selectedStakes.includes("lifeanddeath") || false}
								onChange={(e) => setStakesValue("lifeanddeath")}
							/>
							{t("conflict.stake.lifeanddeath")}
						</label>
						<label key={"loveandrelationships"} className="block">
							<input
								type="checkbox"
								checked={selectedStakes.includes("loveandrelationships") || false}
								onChange={(e) => setStakesValue("loveandrelationships")}
							/>
							{t("conflict.stake.loveandrelationships")}
						</label>
						<label key={"powerandcontrol"} className="block">
							<input
								type="checkbox"
								checked={selectedStakes.includes("powerandcontrol") || false}
								onChange={(e) => setStakesValue("powerandcontrol")}
							/>
							{t("conflict.stake.powerandcontrol")}
						</label>
						<label key={"reputationandhonor"} className="block">
							<input
								type="checkbox"
								checked={selectedStakes.includes("reputationandhonor") || false}
								onChange={(e) => setStakesValue("reputationandhonor")}
							/>
							{t("conflict.stake.reputationandhonor")}
						</label>
						<label key={"wealthandresources"} className="block">
							<input
								type="checkbox"
								checked={selectedStakes.includes("wealthandresources") || false}
								onChange={(e) => setStakesValue("wealthandresources")}
							/>
							{t("conflict.stake.wealthandresources")}
						</label>
						<label key={"freedomandjustice"} className="block">
							<input
								type="checkbox"
								checked={selectedStakes.includes("freedomandjustice") || false}
								onChange={(e) => setStakesValue("freedomandjustice")}
							/>
							{t("conflict.stake.freedomandjustice")}
						</label>
						<label key={"knowledgeandinformation"} className="block">
							<input
								type="checkbox"
								checked={selectedStakes.includes("knowledgeandinformation") || false}
								onChange={(e) => setStakesValue("knowledgeandinformation")}
							/>
							{t("conflict.stake.knowledgeandinformation")}
						</label>
						<label key={"moralityandethics"} className="block">
							<input
								type="checkbox"
								checked={selectedStakes.includes("moralityandethics") || false}
								onChange={(e) => setStakesValue("moralityandethics")}
							/>
							{t("conflict.stake.moralityandethics")}
						</label>
						<label key={"beliefsandvalues"} className="block">
							<input
								type="checkbox"
								checked={selectedStakes.includes("beliefsandvalues") || false}
								onChange={(e) => setStakesValue("beliefsandvalues")}
							/>
							{t("conflict.stake.beliefsandvalues")}
						</label>
						<label key={"futureandlegacy"} className="block">
							<input
								type="checkbox"
								checked={selectedStakes.includes("futureandlegacy") || false}
								onChange={(e) => setStakesValue("futureandlegacy")}
							/>
							{t("conflict.stake.futureandlegacy")}
						</label>
					</>
				) : (
					<div className="min-h-[2em] p-2 w-full resize-none overflow-y-hidden border border-[--background-modifier-border] active:border-[--background-modifier-border-hover] active:shadow-none rounded-md">
						<MarkdownComponent value={stakes} />
					</div>
				)}
			</div>
			{showHelp && (
				<div className="col-span-full mb-3 p-3 rounded-lg bg-[--background-primary-alt] text-sm">
					<MarkdownComponent value={t("conflict.description", { context: "stakes" })} />
				</div>
			)}
		</>
	);
}
