import { App, TFile, parseYaml } from "obsidian";
import { v4 } from "uuid";

export class UpdaterService {
  private _total = 0;
  private _current = 0;

  constructor(
    private _app: App,
    private _updateView: (
      total: number,
      current: number,
      process: string,
    ) => void,
  ) {}

  async updateVault(): Promise<void> {
    const allFiles: TFile[] = this._app.vault.getFiles();

    this._total = allFiles.length;
    this._updateView(this._total, this._current, "Reading files...");

    const elementsMap: {
      id: string;
      codeblock: any;
      sanitisedContent: string;
      file: TFile;
    }[] = [];

    await Promise.all(
      allFiles.map(async (file: TFile) => {
        this._current++;
        this._updateView(this._total, this._current, "Reading files...");

        const newId: string = v4();
        const fileData = await this._readCodeblocks(file, newId);

        if (!fileData) return;

        elementsMap.push({
          id: newId,
          codeblock: fileData?.codeblock,
          sanitisedContent: fileData?.sanitisedFileContent,
          file: file,
        });
      }),
    );

    this._total = elementsMap.length;
    this._current = 0;
    this._updateView(
      this._total,
      this._current,
      "Converting RPG Manager Elements...",
    );

    // UPDATE CAMPAIGN
    // UPDATE PARENT
    // UPDATE RELATIONSHIPS
    // UPDATE CONTENT

    elementsMap.map((element) => {
      console.log(element.codeblock, element.sanitisedContent);
    });

    // await Promise.all(
    //   Array.from(elementsMap.entries()).map(
    //     async (value: [string, DataInterface]) => {
    //       this._current++;
    //       this._updateView(
    //         this._total,
    //         this._current,
    //         "Converting RPG Manager Elements...",
    //       );

    //       const codeblock = {
    //         id: this._convertId(value[0], value[1]),
    //         data: this._convertData(value[0], value[1]),
    //         relationships: this._convertRelationships(value[0], value[1]),
    //         images: this._convertImages(value[0], value[1]),
    //       };

    //       if (codeblock.images.length === 0) delete codeblock.images;
    //       if (codeblock.relationships.length === 0)
    //         delete codeblock.relationships;

    //       this._newElements.set(value[1].file, codeblock);
    //     },
    //   ),
    // );

    // await Promise.all(
    //   Array.from(elementsMap.entries()).map(
    //     async (value: [string, DataInterface]) => {
    //       this._current++;
    //       this._updateView(
    //         this._total,
    //         this._current,
    //         "Converting RPG Manager Elements...",
    //       );

    //       const codeblock = {
    //         id: this._convertId(value[0], value[1]),
    //         data: this._convertData(value[0], value[1]),
    //         relationships: this._convertRelationships(value[0], value[1]),
    //         images: this._convertImages(value[0], value[1]),
    //       };

    //       if (codeblock.images.length === 0) delete codeblock.images;
    //       if (codeblock.relationships.length === 0)
    //         delete codeblock.relationships;

    //       this._newElements.set(value[1].file, codeblock);
    //     },
    //   ),
    // );

    // this._current = 0;
    // this._updateView(this._total, this._current, "Updating files...");

    // await Promise.all(
    //   Array.from(this._newElements.entries()).map(
    //     async (value: [TFile, any]) => {
    //       await this._replaceCodeblock(value[0], value[1]);
    //       this._current++;
    //       return this._updateView(
    //         this._total,
    //         this._current,
    //         "Updating files...",
    //       );
    //     },
    //   ),
    // );
  }

  private async _readCodeblocks(
    file: TFile,
    newId: string,
  ): Promise<{ codeblock: any; sanitisedFileContent: string } | undefined> {
    const fileContent: string = await this._app.vault.read(file);
    const lines = fileContent.split("\n");

    let inRPGMCodeblock = false;
    let sanitisedFileContent = "";
    let codeblockContent = "";

    lines.forEach((line: string, index: number) => {
      if (line === "```RpgManagerData4") {
        sanitisedFileContent += "RpgManagerData4\n";
        inRPGMCodeblock = true;
        codeblockContent = "";
      } else if (line === "```" && inRPGMCodeblock) {
        inRPGMCodeblock = false;
      } else if (inRPGMCodeblock) {
        codeblockContent += line + "\n";
      } else if (!line.endsWith("|]]")) {
        sanitisedFileContent += line + "\n";
      }
    });

    if (codeblockContent === "") return undefined;

    const rgpManagerData: any = await parseYaml(codeblockContent);
    rgpManagerData.id.id = newId;

    return {
      codeblock: rgpManagerData,
      sanitisedFileContent: sanitisedFileContent,
    };
  }
}

// private _convertId(id: string, data: DataInterface): any {
//   const type = this._getType(data.metadata.ID.type);

//   const idData: any = {
//     type: type,
//   };

//   if (type !== ElementType.Campaign) {
//     const campaignData = this._elementsMap.get(data.metadata.ID.campaignId);

//     if (
//       type === ElementType.Adventure ||
//       type === ElementType.Session ||
//       type === ElementType.Chapter
//     ) {
//       const parentData = this._elementsMap.get(data.metadata.ID.parentId);

//       if (parentData !== undefined) {
//         idData.parent = parentData.file.path;
//         idData.positionInParent = data.metadata.ID.positionInParent;
//       }
//     } else if (type === ElementType.Scene) {
//       let parentData;
//       if (data.metadata.data.data.sessionId !== undefined)
//         parentData = this._elementsMap.get(data.metadata.data.data.sessionId);

//       if (data.metadata.data.data.positionInSession !== undefined)
//         idData.positionInParent = data.metadata.data.data.positionInSession;

//       if (parentData === undefined)
//         parentData = this._elementsMap.get(data.metadata.ID.parentId);

//       if (parentData !== undefined) {
//         idData.parent = parentData.file.path;
//         if (idData.positionInParent === undefined)
//           idData.positionInParent = data.metadata.ID.positionInParent;
//       }
//     }

//     if (campaignData !== undefined) idData.campaign = campaignData.file.path;
//   }

//   return idData;
// }

// private _convertRelationships(id: string, data: DataInterface): any[] {
//   const response: any[] = [];

//   const relationships: any[] | undefined = data.metadata.data?.relationships;

//   if (
//     relationships === undefined ||
//     !Array.isArray(relationships) ||
//     relationships.length === 0
//   )
//     return response;

//   relationships.forEach((relationship: any) => {
//     const newRelationship: any = {
//       path: relationship.path,
//       type: relationship.type,
//     };

//     if (relationship.description)
//       newRelationship.description = relationship.description;

//     response.push(newRelationship);
//   });

//   return response;
// }

// private async _replaceCodeblock(file: TFile, codeblock: any): Promise<void> {
//   const metadata: CachedMetadata | null =
//     this._app.metadataCache.getFileCache(file);

//   if (
//     metadata === null ||
//     metadata.sections == undefined ||
//     metadata.sections.length === 0
//   )
//     return;

//   let content = await this._app.vault.read(file);
//   const lines = content.split("\n");

//   let codeblockData: SectionCache | undefined = undefined;

//   const yamlService = new YamlService();

//   for (let index = 0; index < metadata.sections.length; index++) {
//     codeblockData = metadata.sections[index];

//     let type = "";

//     if (
//       codeblockData !== undefined &&
//       (lines[codeblockData.position.start.line] === "```RpgManagerData" ||
//         lines[codeblockData.position.start.line] === "```RpgManagerID" ||
//         lines[codeblockData.position.start.line] === "```RpgManager")
//     ) {
//       switch (lines[codeblockData.position.start.line]) {
//         case "```RpgManagerData":
//           type = "data";
//           break;
//         case "```RpgManagerID":
//           type = "ID";
//           break;
//         case "```RpgManager":
//           type = "codeblock";
//           break;
//       }

//       let codeblockContent = "";
//       for (
//         let lineIndex = codeblockData.position.start.line + 1;
//         lineIndex < codeblockData.position.end.line;
//         lineIndex++
//       ) {
//         codeblockContent += lines[lineIndex] + "\n";
//       }

//       if (codeblockContent !== undefined) {
//         switch (type) {
//           case "data":
//             content = content.replace(
//               "```RpgManagerData\n" + codeblockContent,
//               "\n```RpgManager4\n" + yamlService.stringify(codeblock),
//             );
//             break;
//           case "ID":
//             content = content.replace(
//               "```RpgManagerID\n" + codeblockContent + "```\n",
//               "",
//             );
//             content = content.replace(
//               "```RpgManagerID\n" + codeblockContent + "```",
//               "",
//             );
//             break;
//           case "codeblock":
//             content = content.replace(
//               "```RpgManager\n" + codeblockContent + "```\n",
//               "",
//             );
//             content = content.replace(
//               "```RpgManager\n" + codeblockContent + "```",
//               "",
//             );
//             break;
//         }
//       }

//       content = content.replace(/\[\[.*?\|\]\]\n/g, "");
//       content = content.replace(/\[\[.*?\|\]\]/g, "");
//     }
//   }

//   await this._app.vault.modify(file, content);
// }
