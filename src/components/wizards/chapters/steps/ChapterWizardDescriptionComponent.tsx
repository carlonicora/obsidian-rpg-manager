import MarkdownEditorComponent from "@/components/editors/MarkdownEditorComponent";
import MarkdownComponent from "@/components/markdowns/MarkdownComponent";
import { useWizard } from "@/hooks/useWizard";
import * as React from "react";
import { useTranslation } from "react-i18next";

export default function ChapterWizardDescriptionComponent({
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
	const wizardData = useWizard();

	const updateDescription = (value: string) => {
		wizardData.description = value;
	};

	let error: string | undefined = undefined;
	if (errors !== undefined && errors.length > 0) {
		error = t("wizards.errors");
		errors.forEach((singleError: string) => (error += "\n- " + singleError));
	}

	return (
		<>
			<h3 className="!m-0 !text-xl !font-extralight">{t("attributes.description")}</h3>
			<div className="!mt-3 !mb-3">
				<MarkdownComponent value={t("wizards.chapter.description", { context: "description", name: name })} />
			</div>
			{error && (
				<div className="!mt-3 !mb-3 text-[--text-error]">
					<MarkdownComponent value={error} />
				</div>
			)}
			<div className="">
				<MarkdownEditorComponent
					initialValue={wizardData.description}
					campaignPath={campaignPath}
					onChange={updateDescription}
					className="w-full resize-none overflow-y-hidden border border-[--background-modifier-border] rounded-md"
				/>
			</div>
		</>
	);
}
