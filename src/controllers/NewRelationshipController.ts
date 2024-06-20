import { App, FuzzyMatch, FuzzySuggestModal } from "obsidian";
import { createElement } from "react";
import { Root, createRoot } from "react-dom/client";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import FuzzyNewElementComponent from "src/components/search/FuzzyNewElementComponent";
import FuzzySearchResult from "src/components/search/FuzzySearchResult";
import { ElementType } from "src/data/enums/ElementType";
import { RelationshipType } from "src/data/enums/RelationshipType";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { RelationshipInterface } from "src/data/interfaces/RelationshipInterface";
import { SearchableElementInterface } from "src/data/interfaces/SearchableElementInterface";
import { RelationshipFactory } from "src/factories/RelationshipFactory";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";

export class NewRelationshipController extends FuzzySuggestModal<SearchableElementInterface> {
  constructor(
    private _app: App,
    private _api: RpgManagerInterface,
    private _element?: ElementInterface | undefined,
    private _campaign?: ElementInterface | undefined,
    private _typeLimit?: ElementType[] | undefined,
    private _callback?: (relationship: string, params?: any) => void,
    private _params?: any,
  ) {
    super(_app);
  }

  getSuggestions(query: string): FuzzyMatch<SearchableElementInterface>[] {
    const response: FuzzyMatch<SearchableElementInterface>[] =
      super.getSuggestions(query);

    if (response.length === 0) {
      const searchableElement: SearchableElementInterface = {
        name: query,
        id: "",
        type: ElementType.Campaign,
      };
      response.push({
        item: searchableElement,
        match: { score: 1, matches: [] },
      });
    }

    return response;
  }

  getItems(): SearchableElementInterface[] {
    let allCampaignElements: ElementInterface[];

    if (!this._element?.campaign && !this._campaign) {
      allCampaignElements = this._api.get({
        campaign: null,
      }) as ElementInterface[];
    } else {
      if (this._element !== undefined) {
        allCampaignElements = this._api.get({
          campaign: this._element.campaign ?? this._element,
        }) as ElementInterface[];
      } else if (this._campaign !== undefined) {
        const campaign: ElementInterface = this._api.get({
          id: this._campaign.id,
        }) as ElementInterface;
        allCampaignElements = this._api.get({
          campaign: campaign,
        }) as ElementInterface[];
      }

      const globalElements: ElementInterface[] = this._api.get(
        {},
      ) as ElementInterface[];
      allCampaignElements = allCampaignElements.concat(globalElements);
    }

    allCampaignElements = allCampaignElements.filter(
      (element: ElementInterface) =>
        element.type !== ElementType.Adventure &&
        element.type !== ElementType.Chapter &&
        element.type !== ElementType.Session &&
        element.type !== ElementType.Scene,
    );

    if (this._typeLimit) {
      allCampaignElements = allCampaignElements.filter(
        (element: ElementInterface) => this._typeLimit?.includes(element.type),
      );
    }

    const relatedPaths: string[] = this._element
      ? this._element.relationships.map(
          (relationship: RelationshipInterface) => relationship.id,
        )
      : [];

    const elementResponse: ElementInterface[] = allCampaignElements.filter(
      (element: ElementInterface) =>
        this._callback ||
        (!relatedPaths.includes(element.id) &&
          element.id !== this._element?.id &&
          element.type !== ElementType.Campaign),
    );

    const response: SearchableElementInterface[] = [];

    elementResponse.forEach((element: ElementInterface) => {
      const searchableElement: SearchableElementInterface = {
        name: element.name,
        id: element.id,
        type: element.type,
        image: element.images[0] ?? undefined,
        campaignName: element.campaign?.name ?? undefined,
      };
      response.push(searchableElement);

      if (
        element.aliases !== undefined &&
        Array.isArray(element.aliases) &&
        element.aliases.length > 0
      ) {
        element.aliases.forEach((alias: string) => {
          const searchableElementAlias: SearchableElementInterface = {
            name: element.name,
            id: element.id,
            type: element.type,
            alias: alias,
            image: element.images[0] ?? undefined,
            campaignName: element.campaign?.name ?? undefined,
          };
          response.push(searchableElementAlias);
        });
      }
    });

    if (this._element !== undefined || this._campaign !== undefined)
      response.push({
        name: "All player characters",
        id: "all-player-characters",
        type: ElementType.PlayerCharacter,
      } as SearchableElementInterface);

    return response;
  }

  getItemText(element: SearchableElementInterface): string {
    return (
      element.alias ||
      (element.name ? `${element.name} ${element.type}` : undefined) ||
      element.type ||
      element.id
    );
  }

  renderSuggestion(
    item: FuzzyMatch<SearchableElementInterface>,
    el: HTMLElement,
  ): void {
    const root: Root = createRoot(el);
    let reactComponent: React.ReactElement;

    if (item.item.id === "") {
      reactComponent = createElement(FuzzyNewElementComponent, {
        name: item.item.name,
      });
    } else {
      reactComponent = createElement(FuzzySearchResult, {
        searchableElement: item.item as SearchableElementInterface,
        hasCampaign:
          this._element !== undefined || this._campaign !== undefined,
      });
    }
    root.render(reactComponent);
  }

  async onChooseItem(
    found: SearchableElementInterface,
    evt: MouseEvent | KeyboardEvent,
  ) {
    if (found.id === "") {
      await this._app.vault.create(found.name + ".md", "");
      if (this._callback) {
        this._callback(
          "[[" + found.name + ".md|" + found.name + "]]",
          this._params,
        );
      }

      return;
    }

    if (this._callback) {
      const foundElement: ElementInterface = this._api.get({
        id: found.id,
      }) as ElementInterface;

      let alias: string = "";
      if (found.alias) alias = "|" + found.alias;

      const response = "[[@" + foundElement.id + alias + "]]";

      this._callback(response, this._params);
    } else if (this._element) {
      const rpgmCodeblock: RpgManagerCodeblockService =
        new RpgManagerCodeblockService(
          this._app,
          this._api,
          this._element.file,
        );
      if (found.id === "all-player-characters") {
        const allPlayerCharacters: ElementInterface[] = this._api.get({
          campaign: this._element.campaign,
          type: ElementType.PlayerCharacter,
        }) as ElementInterface[];

        if (allPlayerCharacters.length === 0) return;

        const relationships: RelationshipInterface[] = allPlayerCharacters.map(
          (playerCharacter: ElementInterface) => {
            return RelationshipFactory.createFromContent(
              RelationshipType.Bidirectional,
              playerCharacter.id,
            );
          },
        );

        rpgmCodeblock.addRelationships(relationships);
      } else {
        const relationship = RelationshipFactory.createFromContent(
          RelationshipType.Bidirectional,
          found.id,
        );
        rpgmCodeblock.addRelationship(relationship);
      }
    }
  }
}
