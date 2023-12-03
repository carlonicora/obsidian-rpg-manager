import * as React from "react";
import { useTranslation } from "react-i18next";
import MarkdownComponent from "src/components/markdowns/MarkdownComponent";
import { useWizard } from "src/hooks/useWizard";
import { ChatGptNonPlayerCharacterModel } from "src/services/ChatGptService/models/ChatGptNonPlayerCharacterModel";

export default function NonPlayerCharacterWizardStakeStepComponent({
	name,
	campaignId,
	chatGpt,
	setOverlay,
}: {
	name: string;
	campaignId?: string;
	chatGpt?: ChatGptNonPlayerCharacterModel;
	setOverlay: (show: boolean) => void;
}): React.ReactElement {
	const { t } = useTranslation();
	const wizardData = useWizard();

	const [stake, setStake] = React.useState<number>(wizardData.stake ?? 0);

	const [widthPercentage, setWidthPercentage] = React.useState((stake / 10) * 100);

	React.useEffect(() => {
		setWidthPercentage((stake / 10) * 100);
	}, [stake]);

	const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
		const rect = event.currentTarget.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const newWidthPercentage = (x / rect.width) * 100;
		setWidthPercentage(newWidthPercentage);
	};

	const updateStake = () => {
		const newValue = Math.round((widthPercentage / 100) * 10);

		wizardData.stake = newValue;
		setStake(newValue);
	};

	return (
		<>
			<h3 className="!text-xl !font-extralight">{t("attributes.stake")}</h3>
			<div className="!mt-3 !mb-3">
				<MarkdownComponent value={t("wizards.npc.description", { context: "stake", name: name })} />
			</div>
			<div className="">
				<div className="w-full mt-3 cursor-pointer">
					<div
						className="relative mr-3 h-2 bg-[--background-primary-alt] rounded-full"
						onMouseMove={handleMouseOver}
						onClick={updateStake}
					>
						<div style={{ width: `${widthPercentage}%` }} className="absolute h-2 bg-[--text-accent] rounded-full" />
					</div>
					<div className="text-xs text-[--text-faint] text-center">{Math.round((widthPercentage / 100) * 10)}</div>
				</div>
			</div>
		</>
	);
}
