import { StepComponentInterface } from "@/data/interfaces/StepComponentInterface";
import * as React from "react";

export default function WizardNavigatorComponent({
	steps,
	step,
	setStep,
}: {
	steps: StepComponentInterface[];
	step: number;
	setStep: (step: number) => void;
}): React.ReactElement {
	return (
		<>
			<ul className="!p-0 !m-0 !mt-3 !mb-3">
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
							{stepComponent.name}
						</li>
					);
				})}
			</ul>
		</>
	);
}
