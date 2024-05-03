import { RpgManagerInterface } from "@/RpgManagerInterface";
import { ElementType } from "@/data/enums/ElementType";
import { ElementInterface } from "@/data/interfaces/ElementInterface";
import { App, Plugin, TFile } from "obsidian";
import { RpgManagerCodeblockService } from "../RpgManagerCodeblockService";

export class CustomAttribtuesUpdater {
  static async update(app: App, api: RpgManagerInterface) {
    const campaigns: ElementInterface[] = (
      api.get({}) as ElementInterface[]
    ).filter(
      (element: ElementInterface) => element.type === ElementType.Campaign,
    );
    if (campaigns.length === 0) return;

    const campaignFiles: TFile[] = campaigns.map(
      (campaign: ElementInterface) => campaign.file,
    );

    const customAttributesContainerPromises: Promise<any[]>[] =
      campaignFiles.map(async (campaignFile: TFile) => {
        const codeblockService = new RpgManagerCodeblockService(
          app,
          api,
          campaignFile,
        );
        const codeblock: any = await codeblockService.readCodeblock();

        if (!codeblock) return undefined;

        if (!codeblock.attributes || codeblock.attributes.length === 0)
          return undefined;

        return codeblock.attributes.map((customAttribute: any) => {
          return { ...customAttribute, isCustom: true };
        });
      });

    const customAttributesContainer = await Promise.all(
      customAttributesContainerPromises,
    );

    const customAttributes = customAttributesContainer.flat().filter(Boolean);

    if (customAttributes.length === 0) return;

    api.settings = {
      ...api.settings,
      ...{ customAttributes: customAttributes },
    };
    await (api as unknown as Plugin).saveData(api.settings);

    campaignFiles.map(async (campaignFile: TFile) => {
      const codeblockService = new RpgManagerCodeblockService(
        app,
        api,
        campaignFile,
      );
      const codeblock: any = await codeblockService.readCodeblock();

      if (!codeblock) return;

      if (!codeblock.attributes || codeblock.attributes.length === 0) return;

      codeblockService.deleteAttributes();
    });
  }
}
