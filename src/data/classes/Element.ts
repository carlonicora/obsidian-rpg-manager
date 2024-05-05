import { attributes } from "@/data/attributes/attributes";
import _ from "lodash";
import { App, CachedMetadata, TFile } from "obsidian";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { ImageService } from "src/services/ImageService";
import { ElementType } from "../enums/ElementType";
import { SystemType } from "../enums/SystemType";
import { AttributeInterface } from "../interfaces/AttributeInterface";
import { ElementInterface } from "../interfaces/ElementInterface";
import { ImageInterface } from "../interfaces/ImageInterface";
import { RelationshipInterface } from "../interfaces/RelationshipInterface";

export class Element implements ElementInterface {
  private _relationships: RelationshipInterface[] = [];
  private _campaign: ElementInterface | undefined = undefined;
  private _parent: ElementInterface | undefined = undefined;
  private _version = Date.now();
  private _metadata: CachedMetadata | undefined = undefined;
  private _runningStart = 0;

  constructor(
    private _app: App,
    private _api: RpgManagerInterface,
    private _file: TFile,
    protected _rpgManagerBlock: any,
  ) {
    if (
      this._rpgManagerBlock.id.type === ElementType.Campaign ||
      this._rpgManagerBlock.id.type === ElementType.Adventure ||
      this._rpgManagerBlock.id.type === ElementType.Session ||
      this._rpgManagerBlock.id.type === ElementType.Scene
    )
      this.touch();
  }

  get id(): string {
    if (this._rpgManagerBlock.id.id === undefined)
      console.error(`${this._file.path} has no id`);
    return this._rpgManagerBlock.id.id ?? this._file.path;
  }

  get attributes(): AttributeInterface[] {
    const response: AttributeInterface[] = [];

    const customAttributes: AttributeInterface[] =
      this._api.settings.customAttributes.filter(
        (customAttribute: AttributeInterface) =>
          customAttribute.customTypes !== undefined &&
          customAttribute.customTypes.contains(this.type),
      );
    const elementAttributes: AttributeInterface[] = [];

    switch (this.system) {
      case SystemType.Agnostic:
        elementAttributes.push(...(attributes.get(this.type) ?? []));
        break;
    }

    elementAttributes.forEach((elementAttribute: AttributeInterface) => {
      const deepClone: AttributeInterface = JSON.parse(
        JSON.stringify(elementAttribute),
      );
      deepClone.value = this._rpgManagerBlock.data?.[elementAttribute.id];
      deepClone.isSet = deepClone.value !== undefined;

      response.push(deepClone);
    });

    customAttributes.forEach((customAttribute: AttributeInterface) => {
      const deepClone: AttributeInterface = JSON.parse(
        JSON.stringify(customAttribute),
      );
      deepClone.value = this._rpgManagerBlock.data?.[customAttribute.id];
      deepClone.isSet = deepClone.value !== undefined;

      response.push(deepClone);
    });

    return response;
  }

  attribute(id: string): AttributeInterface | undefined {
    let attribute: AttributeInterface | undefined = undefined;

    switch (this.system) {
      case SystemType.Agnostic:
        attribute = attributes
          .get(this.type)
          ?.find(
            (attribute: AttributeInterface) =>
              attribute.id === id.toLowerCase(),
          );
        break;
    }

    if (attribute === undefined) {
      attribute = this._api.settings.customAttributes.find(
        (customAttribute: AttributeInterface) =>
          customAttribute.customTypes !== undefined &&
          customAttribute.customTypes.contains(this.type) &&
          customAttribute.id === id.toLowerCase(),
      );
    }

    if (attribute === undefined) return undefined;

    const response: AttributeInterface = JSON.parse(JSON.stringify(attribute));

    response.value = this._rpgManagerBlock.data?.[attribute.id];

    response.isSet = response.value !== undefined;

    return response;
  }

  touch(): void {
    this._version = Date.now();
  }

  get aliases(): string[] {
    return this._metadata?.frontmatter?.aliases ?? [];
  }

  set metadata(metadata: CachedMetadata) {
    this._metadata = metadata;
  }

  get images(): ImageInterface[] {
    const response: ImageInterface[] = [];

    if (this._rpgManagerBlock.images == undefined) return response;

    this._rpgManagerBlock.images.forEach((imageData: any) => {
      const image: ImageInterface | undefined = ImageService.createImage(
        this._app,
        this._api,
        imageData,
      );

      if (image) response.push(image);
    });

    return response;
  }

  set codeblock(rpgManagerBlock: any) {
    if (_.isEqual(this._rpgManagerBlock, rpgManagerBlock)) return;

    this.touch();
    this._rpgManagerBlock = rpgManagerBlock;
  }

  get version(): number {
    return this._version;
  }

  get file(): TFile {
    return this._file;
  }

  get type(): ElementType {
    return this._rpgManagerBlock.id.type as ElementType;
  }

  get system(): SystemType {
    return this._rpgManagerBlock.id.system
      ? SystemType[this._rpgManagerBlock.id.system as keyof typeof SystemType]
      : SystemType.Agnostic;
  }

  get relationships(): RelationshipInterface[] {
    return this._relationships;
  }

  set relationships(value: RelationshipInterface[]) {
    this._version++;
    this._relationships = value;
  }

  get campaignId(): string | undefined {
    return this._rpgManagerBlock.id.campaign;
  }

  get campaign(): ElementInterface | undefined {
    return this._campaign;
  }

  set campaign(value: ElementInterface) {
    this._campaign = value;
  }

  get parentId(): string | undefined {
    return this._rpgManagerBlock.id.parent;
  }

  get parent(): ElementInterface | undefined {
    return this._parent;
  }

  set parent(value: ElementInterface) {
    this._parent = value;
  }

  get positionInParent(): number | undefined {
    return this._rpgManagerBlock.id.positionInParent;
  }

  get path(): string {
    return this._file.path;
  }

  get name(): string {
    return this._file.basename;
  }
}
