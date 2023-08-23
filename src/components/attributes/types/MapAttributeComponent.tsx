import * as React from "react";
import { useTranslation } from "react-i18next";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { AttributeType } from "src/data/enums/AttributeType";
import { AttributeInterface } from "src/data/interfaces/AttributeInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "src/hooks/useApi";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";

export default function MapAttributeComponent({
	element,
	attribute,
	isEditable,
}: {
	element: ElementInterface;
	attribute: AttributeInterface;
	isEditable: boolean;
}): React.ReactElement {
	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();

	const containerRef = React.useRef(null);

	const [editing, setEditing] = React.useState<boolean>(false);
	const [attributeValue, setAttributeValue] = React.useState<string>(attribute.value);

	const [isTooltipVisible, setIsTooltipVisible] = React.useState(false);
	const [tooltipContent, setTooltipContent] = React.useState<string>("");
	const [tooltipX, setTooltipX] = React.useState(0);
	const [tooltipY, setTooltipY] = React.useState(0);

	const renderTooltip = () => {
		if (!isTooltipVisible) return null;

		return (
			<div
				style={{
					position: "absolute",
					top: tooltipY,
					left: tooltipX,
					background: "white",
					padding: "5px",
					border: "1px solid black",
					borderRadius: "3px",
					transform: "translate(-50%, -100%)",
					pointerEvents: "none",
				}}
			>
				{tooltipContent}
			</div>
		);
	};

	const [latitude, longitude] = attribute?.value ? attribute.value.split(",") : [0, 0];

	const allLocations: ElementInterface[] = (api.get(undefined, element.campaign) as ElementInterface[]).filter(
		(otherElement: ElementInterface) =>
			otherElement.attribute(AttributeType.Location)?.value !== undefined && otherElement.path !== element.path
	);

	async function handleLinkClick(element: ElementInterface): Promise<void> {
		app.workspace.openLinkText(element.path, "", false);
	}

	function removeAttribute(): void {
		const codeblockService = new RpgManagerCodeblockService(app, api, element.file);
		codeblockService.updateCodeblockData(attribute.id, undefined).then(() => {
			setEditing(false);
		});
	}

	function saveAttribute(): void {
		const codeblockService = new RpgManagerCodeblockService(app, api, element.file);
		codeblockService.updateCodeblockData(attribute.id, attributeValue).then(() => {
			setEditing(false);
		});
	}

	const map = (
		<ComposableMap
			projection="geoMercator"
			projectionConfig={{
				scale: 1000,
			}}
		>
			<ZoomableGroup center={[longitude, latitude]} zoom={2}>
				<Geographies
					geography="https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"
					fill="#D6D6DA"
					stroke="#FFFFFF"
					strokeWidth={0.5}
				>
					{({ geographies }) => geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} />)}
				</Geographies>
				<Marker key={element.path} coordinates={[longitude, latitude]}>
					<circle r={3} fill="#FF5533" />
				</Marker>
				{allLocations.map((location: ElementInterface) => {
					const [latitude, longitude] = location.attribute(AttributeType.Location)?.value?.split(",") ?? [0, 0];
					return (
						<Marker
							key={location.path}
							coordinates={[longitude, latitude]}
							className="hover:cursor-pointer"
							onClick={() => handleLinkClick(location)}
							onMouseEnter={(e) => {
								const { top, left } = containerRef.current.getBoundingClientRect();
								const x = e.clientX - left;
								const y = e.clientY - top;

								setTooltipX(x);
								setTooltipY(y);
								setIsTooltipVisible(true);
								setTooltipContent(location.name);
							}}
							onMouseLeave={() => {
								setIsTooltipVisible(false);
							}}
						>
							<circle r={3} fill="#5533ff" />
						</Marker>
					);
				})}
			</ZoomableGroup>
		</ComposableMap>
	);

	let content;

	if (editing) {
		content = (
			<div>
				<div className="grid grid-cols-1 lg:grid-cols-4">
					<div className="!font-bold col-span-1">{t("attributes.coordinates")}</div>
					<div className="col-span-3 pl-0 lg:pl-3">
						<div>
							<input
								type="text"
								defaultValue={attribute.value}
								onChange={(e) => setAttributeValue(e.target.value)}
								className="!pl-2 !pr-4"
							/>
						</div>
						<div className="flex mt-3">
							<button className="rpgm-danger !ml-0" onClick={removeAttribute}>
								{t("buttons.delete")}
							</button>
							<button className="rpgm-secondary" onClick={() => setEditing(false)}>
								{t("buttons.cancel")}
							</button>
							<button className="rpgm-primary" onClick={saveAttribute}>
								{t("buttons.save")}
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	} else if (isEditable) {
		content = (
			<div>
				<div>{map}</div>
				<div className="flex justify-end ml-3 mt-3">
					<button className="rpgm-secondary" onClick={() => setEditing(true)}>
						{t("buttons.edit")}
					</button>
				</div>
			</div>
		);
	} else {
		content = map;
	}

	return (
		<div ref={containerRef}>
			{renderTooltip()}
			{content}
		</div>
	);
}
