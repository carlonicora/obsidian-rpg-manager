import { useApp } from "@/hooks/useApp";
import { App } from "obsidian";
import * as React from "react";
import {
	DragDropContext,
	Draggable,
	DraggableProvided,
	DraggableStateSnapshot,
	DropResult,
	Droppable,
	DroppableProvided,
} from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { ElementType } from "src/data/enums/ElementType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "src/hooks/useApi";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";
import SceneAnalyserComponent from "../analyser/SceneAnalyserComponent";
import ChildDefaultComponent from "./ChildDefaultComponent";
import ChildDefaultHeadersComponent from "./ChildDefaultHeadersComponent";
import ChildSceneComponent from "./ChildSceneComponent";
import ChildSceneHeadersComponent from "./ChildSceneHeadersComponent";
import ChildSessionComponent from "./ChildSessionComponent";
import ChildSessionHeadersComponent from "./ChildSessionHeadersComponent";
import NewChildComponent from "./NewChildComponent";

export default function HierarchyComponent({
	element,
	type,
	isInPopover,
	isDraggable,
}: {
	element: ElementInterface;
	type: ElementType;
	isInPopover: boolean;
	isDraggable: boolean;
}): React.ReactElement {
	const { t } = useTranslation();
	const api: RpgManagerInterface = useApi();
	const app: App = useApp();

	const [newChild, setNewChild] = React.useState<boolean>(false);

	const children: ElementInterface[] = api.get(
		undefined,
		type === ElementType.Campaign ? element : element.campaign,
		type,
		element
	) as ElementInterface[];

	children.sort((a, b) => a.positionInParent - b.positionInParent);

	function handleOnDragEnd(result: DropResult) {
		if (!result.destination) return;
		const reorderedChildren = Array.from(children);
		const [reorderedItem] = reorderedChildren.splice(result.source.index, 1);
		reorderedChildren.splice(result.destination.index, 0, reorderedItem);

		reorderedChildren.map((element: ElementInterface, index: number) => {
			const codeblockService = new RpgManagerCodeblockService(app, api, element.file);
			codeblockService.updateCodeblockId("positionInParent", index + 1);
		});
	}

	function getChildComponent(child: ElementInterface): React.ReactElement {
		switch (child.type) {
			case ElementType.Session:
				return <ChildSessionComponent key={child.path} element={child} isInPopover={isInPopover} />;
			case ElementType.Scene:
				return <ChildSceneComponent key={child.path} element={child} isInPopover={isInPopover} />;
			default:
				return <ChildDefaultComponent key={child.path} element={child} isInPopover={isInPopover} />;
		}
	}

	function getHeaderComponent(): React.ReactElement {
		switch (type) {
			case ElementType.Session:
				return <ChildSessionHeadersComponent isInPopover={isInPopover} />;
			case ElementType.Scene:
				return <ChildSceneHeadersComponent isInPopover={isInPopover} />;
			default:
				return <ChildDefaultHeadersComponent isInPopover={isInPopover} />;
		}
	}

	function handleCreate(): void {
		setNewChild(true);
	}

	function handleFileAdded(): void {
		setNewChild(false);
	}

	if (!isDraggable) {
		return (
			<div className="rounded-lg border border-[--background-modifier-border] bg-[--background-primary] p-3">
				<h2 className="!m-0 !mb-3">{t("elements." + type, { count: 2 })}</h2>
				<>
					{getHeaderComponent()}
					{children.map((child: ElementInterface, index: number) => getChildComponent(child))}
					{newChild && !isInPopover && (
						<NewChildComponent key={Date.now()} parent={element} type={type} handleFileAdded={handleFileAdded} />
					)}
					{!isInPopover && !newChild && (
						<div className="flex justify-end w-full text-sm mt-3">
							<button className="rpgm-secondary pl-3 pr-3" onClick={() => handleCreate()}>
								{t("create.new", { context: type })}
							</button>
						</div>
					)}
					{!isInPopover && type === ElementType.Scene && <SceneAnalyserComponent element={element} />}
				</>
			</div>
		);
	}

	return (
		<div
			key={element.path + "draggable"}
			className="rounded-lg border border-[--background-modifier-border] bg-[--background-primary] p-3"
		>
			<h2 className="!m-0 !mb-3">{t("elements." + type, { count: 2 })}</h2>
			<>
				{getHeaderComponent()}
				<DragDropContext onDragEnd={handleOnDragEnd}>
					<Droppable
						droppableId={element.path + "list"}
						renderClone={(provided, snapshot, rubric) => (
							<div
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								style={provided.draggableProps.style}
							>
								{getChildComponent(children[rubric.source.index])}
							</div>
						)}
					>
						{(provided: DroppableProvided) => (
							<div {...provided.droppableProps} ref={provided.innerRef}>
								{children.map((child: ElementInterface, index: number) => (
									<Draggable key={child.path} draggableId={child.path} index={index}>
										{(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
											return (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													style={{
														...provided.draggableProps.style,
														zIndex: snapshot.isDragging ? 9999 : "auto",
													}}
												>
													{getChildComponent(child)}
												</div>
											);
										}}
									</Draggable>
								))}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
				{newChild && !isInPopover && (
					<NewChildComponent key={Date.now()} parent={element} type={type} handleFileAdded={handleFileAdded} />
				)}
				{!isInPopover && !newChild && (
					<div className="flex justify-end w-full text-sm mt-3">
						<button className="rpgm-secondary pl-3 pr-3" onClick={() => handleCreate()}>
							{t("create.new", { context: type })}
						</button>
					</div>
				)}
				{!isInPopover && type === ElementType.Scene && api.settings.useSceneAnalyser && (
					<SceneAnalyserComponent element={element} />
				)}
			</>
		</div>
	);
}
