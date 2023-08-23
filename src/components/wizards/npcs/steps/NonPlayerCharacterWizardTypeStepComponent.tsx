import * as React from "react";
import { useTranslation } from "react-i18next";
import MarkdownComponent from "src/components/markdowns/MarkdownComponent";
import { NonPlayerCharacterType } from "src/data/enums/NonPlayerCharacterType";
import { useWizard } from "src/hooks/useWizard";
import { ChatGptNonPlayerCharacterModel } from "src/services/ChatGptService/models/ChatGptNonPlayerCharacterModel";

export default function NonPlayerCharacterWizardTypeStepComponent({
	name,
	campaignPath,
	chatGpt,
}: {
	name: string;
	campaignPath?: string;
	chatGpt?: ChatGptNonPlayerCharacterModel;
}): React.ReactElement {
	const { t } = useTranslation();
	const wizardData = useWizard();
	const [characterType, setCharacterType] = React.useState<NonPlayerCharacterType>(wizardData.nonplayercharactertype);

	const setType = (type: NonPlayerCharacterType) => {
		wizardData.nonplayercharactertype = type;

		setCharacterType(type);
	};

	const types = [
		{
			type: NonPlayerCharacterType.Main,
			name: t("npctype.npctype", { context: NonPlayerCharacterType.Main }),
			description: t("npctype.description", { context: NonPlayerCharacterType.Main }),
			selected: characterType === NonPlayerCharacterType.Main,
		},
		{
			type: NonPlayerCharacterType.Extra,
			name: t("npctype.npctype", { context: NonPlayerCharacterType.Extra }),
			description: t("npctype.description", { context: NonPlayerCharacterType.Extra }),
			selected: characterType === NonPlayerCharacterType.Extra,
		},
	];

	return (
		<>
			<h3 className="!m-0 !text-xl !font-extralight">{t("attributes.nonplayercharactertype")}</h3>
			<div className="!mt-3 !mb-3">
				<MarkdownComponent value={t("wizards.npc.description", { context: "type", name: name })} />
			</div>
			<div className="">
				{types.map((type, index) => {
					return (
						<div
							key={index}
							className="flex items-center rounded-lg border border-[--background-modifier-border] m-4 p-4 hover:bg-[--background-primary-alt] bg-transparent cursor-pointer"
							onClick={() => setType(type.type)}
						>
							<div className="flext min-w[50px] w-[50px] items-center justify-center">
								{type.selected && (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="30"
										height="30"
										fill="currentColor"
										viewBox="0 0 16 16"
									>
										<path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
									</svg>
								)}
							</div>
							<div>
								<h4>{type.name}</h4>
								<small>
									<MarkdownComponent value={type.description} />
								</small>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}
