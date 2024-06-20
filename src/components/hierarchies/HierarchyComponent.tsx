import { useApp } from "@/hooks/useApp";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DropResult,
  Droppable,
  DroppableProvided,
} from "@hello-pangea/dnd";
import { App } from "obsidian";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { ElementType } from "src/data/enums/ElementType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { useApi } from "src/hooks/useApi";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";
import ContainerComponent from "../groups/ContainerComponent";
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

  const children: ElementInterface[] = api.get({
    campaign: type === ElementType.Campaign ? element : element.campaign,
    type: type,
    parent: element,
  }) as ElementInterface[];

  children.sort((a, b) => a.positionInParent - b.positionInParent);

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;
    const reorderedChildren = Array.from(children);
    const [reorderedItem] = reorderedChildren.splice(result.source.index, 1);
    reorderedChildren.splice(result.destination.index, 0, reorderedItem);

    reorderedChildren.map((element: ElementInterface, index: number) => {
      const codeblockService = new RpgManagerCodeblockService(
        app,
        api,
        element.file,
      );
      codeblockService.updateCodeblockId("positionInParent", index + 1);
    });
  }

  function getChildComponent(child: ElementInterface): React.ReactElement {
    switch (child.type) {
      case ElementType.Session:
        return (
          <ChildSessionComponent
            key={child.id}
            element={child}
            isInPopover={isInPopover}
          />
        );
      case ElementType.Scene:
        return (
          <ChildSceneComponent
            key={child.id}
            element={child}
            isInPopover={isInPopover}
          />
        );
      default:
        return (
          <ChildDefaultComponent
            key={child.id}
            element={child}
            isInPopover={isInPopover}
          />
        );
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
      <ContainerComponent title={t("elements." + type, { count: 2 })}>
        <div className="flex flex-col w-full">
          {getHeaderComponent()}
          {children.map((child: ElementInterface, index: number) =>
            getChildComponent(child),
          )}
          {newChild && !isInPopover && (
            <NewChildComponent
              key={Date.now()}
              parent={element}
              type={type}
              handleFileAdded={handleFileAdded}
            />
          )}
        </div>
        {!isInPopover && !newChild && (
          <div className="flex justify-end w-full text-sm mt-3">
            <button
              className="rpgm-secondary pl-3 pr-3"
              onClick={() => handleCreate()}
            >
              {t("create.new", { context: type })}
            </button>
          </div>
        )}
      </ContainerComponent>
    );
  }

  return (
    <ContainerComponent
      key={element.id + "draggable"}
      title={t("elements." + type, { count: 2 })}
    >
      {getHeaderComponent()}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable
          droppableId={element.id + "list"}
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
                <Draggable key={child.id} draggableId={child.id} index={index}>
                  {(
                    provided: DraggableProvided,
                    snapshot: DraggableStateSnapshot,
                  ) => {
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
        <NewChildComponent
          key={Date.now()}
          parent={element}
          type={type}
          handleFileAdded={handleFileAdded}
        />
      )}
      {!isInPopover && !newChild && (
        <div className="flex justify-end w-full text-sm mt-3">
          <button
            className="rpgm-secondary pl-3 pr-3"
            onClick={() => handleCreate()}
          >
            {t("create.new", { context: type })}
          </button>
        </div>
      )}
    </ContainerComponent>
  );
}
