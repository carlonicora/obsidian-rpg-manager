import { ElementInterface } from "@/data/interfaces/ElementInterface";
import { Plugin } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { AttributeComponentType } from "src/data/enums/AttributeComponentType";
import { ElementType } from "src/data/enums/ElementType";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { useApi } from "src/hooks/useApi";

export default function CustomAttributeComponent({
	attribute,
	onSaveAttribute,
}: {
	attribute?: AttributeInterface;
	onSaveAttribute: () => void;
}): React.ReactElement {
	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();

	const [name, setName] = React.useState<string>(attribute?.customName || "");
	const [type, setType] = React.useState<AttributeComponentType | undefined>(attribute?.type);
	const [options, setOptions] = React.useState<string[] | undefined>(
		attribute?.options ? [...attribute.options, ""] : [""]
	);
	const [customTypes, setCustomTypes] = React.useState<ElementType[] | undefined>(attribute?.customTypes ?? []);
	const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
	const [canBeDeleted] = React.useState(() => {
		if (!attribute) return false;

		return !(api.get() as ElementInterface[]).some(
			(element: ElementInterface) => element.attribute(attribute.id)?.isSet === true
		);
	});

	const handleCustomTypeChange = (value: ElementType, checked: boolean) => {
		if (checked && !customTypes?.includes(value)) {
			setCustomTypes((prev) => [...(prev || []), value]);
		} else if (!checked) {
			setCustomTypes((prev) => (prev || []).filter((item) => item !== value));
		}
	};

	const handleOptionChange = (index: number, value: string) => {
		const updatedOptions = [...(options || [])];
		updatedOptions[index] = value;
		setOptions(updatedOptions);

		if (index === updatedOptions.length - 1 && value !== "") {
			setOptions([...updatedOptions, ""]);
		}
	};

	const validate = (): boolean => {
		const newErrors: { [key: string]: string } = {};

		if (!name) newErrors.name = "Name is required.";
		if (!type) newErrors.type = "Type is required.";
		if (type === AttributeComponentType.Select) {
			const validOptions = options?.filter((option) => option.trim() !== "");
			if (!validOptions || validOptions.length === 0) newErrors.options = "At least one valid option is required.";
		}
		if (!customTypes || customTypes.length === 0) newErrors.customTypes = "At least one element type must be selected.";
		if (name.includes('"') || name.includes("\\")) newErrors.name = "Double quotes or back slashes are not allowed.";
		if (options.some((option) => option.includes('"') || option.includes("\\")))
			newErrors.options = "Double quotes or back slashes are not allowed in options.";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleDelete = async () => {
		const id = attribute?.id ?? "_" + name?.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
		const customAttributes = api.settings.customAttributes ?? [];

		const existingIndex = customAttributes.findIndex((attribute: AttributeInterface) => attribute.id === id);

		if (existingIndex !== -1) {
			customAttributes.splice(existingIndex, 1);
			api.settings = { ...api.settings, customAttributes: customAttributes };
			await (api as unknown as Plugin).saveData(api.settings);

			onSaveAttribute();
		}
	};

	const handleSave = async () => {
		if (!validate()) return;

		// Convert the name to lowercase, remove spaces and non-alphanumeric characters for id
		const id = attribute?.id ?? "_" + name?.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

		const updatedAttribute: AttributeInterface = {
			customName: name,
			type: type,
			id: id,
			isCustom: true,
		};

		// Add options if they are valid and non-empty
		if (type === AttributeComponentType.Select) {
			const filteredOptions = options?.filter((option) => option !== "");
			if (filteredOptions && filteredOptions.length) {
				updatedAttribute.options = filteredOptions;
			}
		}

		// Add customTypes if they are non-empty
		if (customTypes && customTypes.length) {
			updatedAttribute.customTypes = customTypes;
		}

		const customAttributes = api.settings.customAttributes ?? [];
		const existingIndex = customAttributes.findIndex(
			(attribute: AttributeInterface) => attribute.id === updatedAttribute.id
		);

		if (existingIndex === -1) {
			customAttributes.push(updatedAttribute);
		} else {
			customAttributes[existingIndex] = updatedAttribute;
		}

		api.settings = { ...api.settings, customAttributes: customAttributes };
		await (api as unknown as Plugin).saveData(api.settings);

		onSaveAttribute();
	};

	return (
		<div className="w-full">
			<h3>{name !== "" ? name : "New Custom Attribute"}</h3>
			<div className={`grid ${type === AttributeComponentType.Select ? "grid-cols-3" : "grid-cols-2"} gap-4`}>
				<div>
					<div>
						<div className="font-bold">{t("customattributes.name")}</div>
						<div>
							<input type="text" value={name} onChange={(e) => setName(e.target.value)} />
							{errors.name && <div className="text-[--text-error] text-sm">{errors.name}</div>}
						</div>
					</div>
					<div>
						<div className="font-bold">{t("customattributes.type")}</div>
						<div>
							<select defaultValue={type} onChange={(e) => setType(e.target.value as AttributeComponentType)}>
								<option></option>
								<option value={AttributeComponentType.Text}>{t("customattributes.text")}</option>
								<option value={AttributeComponentType.Number}>{t("customattributes.number")}</option>
								<option value={AttributeComponentType.Select}>{t("customattributes.option")}</option>
								<option value={AttributeComponentType.Boolean}>{t("customattributes.checkbox")}</option>
								<option value={AttributeComponentType.LongText}>{t("customattributes.longtext")}</option>
								<option value={AttributeComponentType.Date}>{t("customattributes.date")}</option>
								<option value={AttributeComponentType.Link}>{t("customattributes.link")}</option>
							</select>
							{errors.type && <div className="text-[--text-error] text-sm">{errors.type}</div>}
						</div>
					</div>
				</div>
				{type === AttributeComponentType.Select && (
					<div>
						<div>
							<div className="font-bold">{t("customattributes.options")}</div>
							<div>
								{(options || []).map((option, index) => (
									<input
										key={index}
										type="text"
										value={option}
										onChange={(e) => handleOptionChange(index, e.target.value)}
										className="mb-2"
									/>
								))}
							</div>
							{errors.options && <div className="text-[--text-error] text-sm">{errors.options}</div>}
						</div>
					</div>
				)}
				<div>
					<div className="font-bold">{t("customattributes.availableon")}</div>
					<div>
						{Object.values(ElementType).map((type) => (
							<label key={type} className="block">
								<input
									type="checkbox"
									checked={customTypes?.includes(type) || false}
									onChange={(e) => handleCustomTypeChange(type, e.target.checked)}
								/>
								{t(`elements.${type}`, { count: 2 })}
							</label>
						))}
					</div>
					{errors.customTypes && <div className="text-[--text-error] text-sm">{errors.customTypes}</div>}
				</div>
			</div>
			<div className="flex w-full justify-end">
				{canBeDeleted === true ? (
					<button className="rpgm-danger" onClick={handleDelete}>
						{t("buttons.delete")}
					</button>
				) : (
					<button
						className="text-[--text-faint] cursor-not-allowed"
						disabled={true}
						title={t("customattributes.cantdelete")}
					>
						{t("buttons.delete")}
					</button>
				)}
				<button className="rpgm-primary" onClick={handleSave}>
					{t("buttons.save")}
				</button>
			</div>
		</div>
	);
}
