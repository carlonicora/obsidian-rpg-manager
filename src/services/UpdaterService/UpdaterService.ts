import { YamlService } from "@/services/YamlService";
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
    const allFiles: TFile[] = this._app.vault
      .getFiles()
      .filter((file: TFile) => file.extension === "md");

    this._total = allFiles.length;
    this._updateView(this._total, this._current, "Reading files...");

    const elementsMap: {
      id: string;
      codeblock: any;
      sanitisedContent: string;
      file: TFile;
    }[] = [];

    const results = await Promise.all(
      allFiles.map(async (file: TFile) => {
        this._current++;
        this._updateView(this._total, this._current, "Reading files...");

        const newId: string = v4();
        const fileData = await this._readCodeblocks(file, newId);

        if (!fileData) return null;

        return {
          id: newId,
          codeblock: fileData?.codeblock,
          sanitisedContent: fileData?.sanitisedFileContent,
          file: file,
        };
      }),
    );

    results.forEach((result) => {
      if (result) elementsMap.push(result);
    });

    this._total = elementsMap.length;
    this._current = 0;
    this._updateView(
      this._total,
      this._current,
      "Converting RPG Manager Elements...",
    );

    await Promise.all(
      elementsMap.map(async (element) => {
        if (element.codeblock.id.campaign) {
          element.codeblock.id.campaign = elementsMap.find(
            (item) => item.file.path === element.codeblock.id.campaign,
          )?.id;
        }
        if (element.codeblock.id.parent) {
          element.codeblock.id.parent = elementsMap.find(
            (item) => item.file.path === element.codeblock.id.parent,
          )?.id;
        }

        if (element.codeblock.relationships) {
          element.codeblock.relationships.map((relationship: any) => {
            relationship.id = elementsMap.find(
              (item) => item.file.path === relationship.path,
            )?.id;
            delete relationship.path;
          });
        }
        delete element.codeblock.tasks;

        this._replaceLinksInCodeBlock(element.codeblock, elementsMap);

        element.codeblock = this._replaceLinksInCodeBlock(
          element.codeblock,
          elementsMap,
        );
      }),
    );

    const yamlService = new YamlService();

    await Promise.all(
      elementsMap.map(async (element) => {
        this._current++;
        this._updateView(
          this._total,
          this._current,
          "Converting RPG Manager Elements...",
        );

        const codeblock = yamlService.stringify(element.codeblock);
        const updatedContent = element.sanitisedContent.replace(
          "RpgManager4",
          "```RpgManager5\n" + codeblock + "```",
        );
        await this._app.vault.modify(element.file, updatedContent);
      }),
    );
  }

  private _replaceLinksInCodeBlock(codeblock: any, elementsMap: any[]): any {
    const pattern = /\[\[(.*?)\]\]/g;

    function replaceString(value: string): string {
      return value.replace(pattern, (match, p1) => {
        const parts = p1.split("|");
        const element = elementsMap.find(
          (item) =>
            item.file.path === parts[0] || item.file.basename === parts[1],
        );

        if (!element) console.warn(parts[0], parts[1]);

        if (element) {
          const newId: string = element.codeblock.id.id;

          if (parts.length == 1) {
            return `[[@${newId}]]`;
          } else {
            const name: string = element.file.basename;
            if (parts[1] === name) return `[[@${newId}]]`;
            return `[[${newId}|${parts[1]}]]`;
          }
        }

        return value;
      });
    }

    function traverse(value: any): any {
      if (typeof value === "string") {
        return replaceString(value);
      } else if (Array.isArray(value)) {
        return value.map(traverse);
      } else if (value !== null && typeof value === "object") {
        const newValue: any = {};
        for (const key in value) {
          newValue[key] = traverse(value[key]);
        }
        return newValue;
      } else {
        return value;
      }
    }

    return traverse(codeblock);
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
      if (line === "```RpgManager4") {
        sanitisedFileContent += "RpgManager4\n";
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
