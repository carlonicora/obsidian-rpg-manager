import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "src/hooks/useApi";

export default function HeaderComponent({
	element,
	isInPopover,
}: {
	element: ElementInterface;
	isInPopover: boolean;
}): React.ReactElement {
	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();

	const siblings: ElementInterface[] = api.get(
		undefined,
		element.campaign,
		element.type,
		element.parent
	) as ElementInterface[];
	const previousElement: ElementInterface | undefined = siblings.find(
		(sibling: ElementInterface) => sibling.positionInParent === element.positionInParent - 1
	);
	const nextElement: ElementInterface | undefined = siblings.find(
		(sibling: ElementInterface) => sibling.positionInParent === element.positionInParent + 1
	);

	return (
		<>
			<div className="!m-0 flex justify-end p-1 text-[--text-faint] absolute right-0 !mt-[-1.25rem]">
				Rpg Manager {api.version}
			</div>
			<div className="!m-0 flex flex-col justify-center items-center">
				<h1 className="!text-4xl !font-extralight">{element.name}</h1>
				{!isInPopover && (
					<div className="!font-extralight text-[--text-faint] grid grid-cols-5">
						<div className="text-center">
							{previousElement ? (
								<a
									href={previousElement.path}
									className="internal-link !no-underline cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover]"
								>
									&lt;&nbsp;{previousElement.name}
								</a>
							) : (
								<>&nbsp;</>
							)}
						</div>
						<div className="text-center">{previousElement ? <>|</> : <>&nbsp;</>}</div>
						<div className="text-center">{t("elements." + element.type, { count: 1 })}</div>
						<div className="text-center">{nextElement ? <>|</> : <>&nbsp;</>}</div>
						<div className="text-center">
							{nextElement ? (
								<a
									href={nextElement.path}
									className="internal-link !no-underline cursor-pointer text-[--text-accent] hover:text-[--text-accent-hover]"
								>
									{nextElement.name}&nbsp;&gt;
								</a>
							) : (
								<>&nbsp;</>
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
}
