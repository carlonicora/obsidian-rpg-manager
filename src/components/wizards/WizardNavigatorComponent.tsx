import { StepComponentInterface } from "@/data/interfaces/StepComponentInterface";
import * as React from "react";
import { useTranslation } from "react-i18next";

export default function WizardNavigatorComponent({
	steps,
	step,
	setStep,
}: {
	steps: StepComponentInterface[];
	step: number;
	setStep: (step: number) => void;
}): React.ReactElement {
	const { t } = useTranslation();

	return (
		<>
			<ul className="!p-0 !m-0 !mt-3 !mb-3 !pl-4">
				{steps.map((stepComponent: StepComponentInterface, index: number) => {
					return (
						<li
							key={index}
							className={`${
								stepComponent.errors !== undefined && stepComponent.errors.length > 0
									? "text-[--text-error]"
									: step > index
									? "text-[--text-normal]"
									: "text-[--text-muted]"
							} hover:text-[--text-accent] cursor-pointer`}
							onClick={() => {
								setStep(index + 1);
							}}
						>
							{t(stepComponent.name)}
						</li>
					);
				})}
			</ul>
		</>
	);
}
