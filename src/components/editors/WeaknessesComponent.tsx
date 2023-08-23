import * as React from "react";
import { WeaknessType } from "src/data/enums/WeaknessType";

export default function WeaknessesComponent({
	initialValue,
	propagateValue,
}: {
	initialValue?: number;
	propagateValue: (value: number) => void;
}): React.ReactElement {
	const toggleWeaknesses = (weakness: WeaknessType) => {
		propagateValue(weakness);
	};

	return (
		<>
			<div className="flex flex-wrap">
				{Object.entries(WeaknessType)
					.filter(([key]) => isNaN(Number(key)))
					.map(([key, value]) => {
						const weaknessValue = value as unknown as WeaknessType;
						return (
							<div
								key={key}
								className={`pl-2 pr-2 cursor-pointer hover:text-[--text-accent-hover] ${
									(initialValue & weaknessValue) === weaknessValue ? "text-[--text-accent]" : ""
								}`}
								onClick={() => toggleWeaknesses(weaknessValue)}
							>
								{key}
							</div>
						);
					})}
			</div>
		</>
	);
}
