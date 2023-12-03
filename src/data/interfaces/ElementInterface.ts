import { CachedMetadata, TFile } from "obsidian";
import { TaskInterface } from "../../services/taskService/interfaces/TaskInterface";
import { ElementType } from "../enums/ElementType";
import { SystemType } from "../enums/SystemType";
import { AttributeInterface } from "./AttributeInterface";
import { ImageInterface } from "./ImageInterface";
import { RelationshipInterface } from "./RelationshipInterface";

export interface ElementInterface {
	touch(): void;
	set codeblock(rpgManagerBlock: any);
	set metadata(metadata: CachedMetadata);
	get aliases(): string[];
	get file(): TFile;
	get id(): string;
	get type(): ElementType;
	get system(): SystemType;
	get campaignId(): string | undefined;
	get campaign(): ElementInterface | undefined;
	set campaign(value: ElementInterface);
	get parentId(): string | undefined;
	get parent(): ElementInterface | undefined;
	set parent(value: ElementInterface);
	get positionInParent(): number | undefined;
	get relationships(): RelationshipInterface[];
	set relationships(value: RelationshipInterface[]);
	get version(): number;
	get path(): string;
	get name(): string;
	get images(): ImageInterface[];
	get tasks(): TaskInterface[];

	get attributes(): AttributeInterface[];
	attribute(name: string): AttributeInterface | undefined;
}
