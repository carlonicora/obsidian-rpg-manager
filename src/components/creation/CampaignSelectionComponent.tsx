import * as React from "react";
import { useTranslation } from "react-i18next";
import { ElementType } from "src/data/enums/ElementType";
import { SystemType } from "src/data/enums/SystemType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";

export default function CampaignSelectionComponent({
	campaigns,
	setAsGlobal,
	setCampaign,
	setSystem,
}: {
	campaigns: ElementInterface[];
	setAsGlobal?: (asGlobal: boolean) => void;
	setCampaign: (path: string) => void;
	setSystem: (system: SystemType) => void;
}): React.ReactElement {
	const { t } = useTranslation();

	const setSelectedCampaign = (campaignPath: string) => {
		const campaign: ElementInterface | undefined = campaigns.find(
			(campaign: ElementInterface) => campaign.path === campaignPath
		);
		if (campaign === undefined) return;

		setCampaign(campaignPath);
		setSystem(campaign.system);
	};

	return (
		<div className="max-w-md mb-3">
			<div className="font-bold">{t("create.select", { context: ElementType.Campaign })}</div>
			<select onChange={(e) => setSelectedCampaign(e.target.value)} className="w-full">
				{campaigns.length > 1 && <option value=""></option>}
				{campaigns.map((campaign: ElementInterface) => (
					<option key={campaign.path} value={campaign.path}>
						{campaign.name}
					</option>
				))}
			</select>
			{setAsGlobal !== undefined && (
				<>
					<label key={"global"} className="block">
						<input type="checkbox" onChange={(e) => setAsGlobal(e.target.checked)} />
						{t("global_description")}
					</label>
				</>
			)}
		</div>
	);
}
