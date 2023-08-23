import * as React from "react";
import { useTranslation } from "react-i18next";
import { ElementInterface } from "src/data/interfaces/ElementInterface";

export default function SessionSelectionComponent({
	sessions,
	setSessionPath,
}: {
	sessions: ElementInterface[];
	setSessionPath: (path: string) => void;
}): React.ReactElement {
	const { t } = useTranslation();

	return (
		<div>
			<div>{t("session", { count: 1 })}</div>
			<div>
				<select onChange={(e) => setSessionPath(e.target.value)}>
					{sessions.length > 1 && <option value=""></option>}
					{sessions.map((session: ElementInterface) => (
						<option key={session.path} value={session.path}>
							{session.name}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
