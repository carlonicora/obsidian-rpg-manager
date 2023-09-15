import * as React from "react";
import { StrengthType } from "src/data/enums/StrengthType";

export default function StrengthsComponent({
	initialValue,
	propagateValue,
}: {
	initialValue?: number;
	propagateValue: (value: number) => void;
}): React.ReactElement {
	const toggleStrength = (strength: StrengthType) => {
		propagateValue(strength);
	};

	return (
		<>
			<div className="flex flex-wrap">
				{Object.entries(StrengthType)
					.filter(([key]) => isNaN(Number(key)))
					.map(([key, value]) => {
						const strengthValue = value as unknown as StrengthType;
						return (
							<div
								key={key}
								className={`pl-2 pr-2 cursor-pointer hover:text-[--text-accent-hover] ${
									(initialValue & strengthValue) === strengthValue ? "text-[--text-accent]" : ""
								}`}
								onClick={() => toggleStrength(strengthValue)}
							>
								{key}
							</div>
						);
					})}
			</div>
		</>
	);
}
