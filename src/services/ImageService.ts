import { App, TFile } from "obsidian";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { Image } from "src/data/classes/Image";
import { ImageInterface } from "src/data/interfaces/ImageInterface";

export class ImageService {
  static createImage(
    app: App,
    api: RpgManagerInterface,
    imageData: any,
  ): ImageInterface | undefined {
    const imageLocation = this._getImageLocation(app, api, imageData.path);

    if (imageLocation === undefined) return undefined;

    const response = new Image(imageData.path, imageLocation);

    if (imageData.caption !== undefined) response.caption = imageData.caption;

    return response;
  }

  private static _getImageLocation(
    app: App,
    api: RpgManagerInterface,
    path: string,
  ): string | undefined {
    if (path.trim().toLowerCase().startsWith("http")) return path;

    const file = app.vault.getAbstractFileByPath("/");
    let root: string = app.vault.getResourcePath(file as TFile);
    if (root.includes("?")) root = root.substring(0, root.lastIndexOf("?"));
    if (!root.endsWith("/")) root += "/";

    if (app.vault.getAbstractFileByPath(path) === undefined) return undefined;

    let response = root;
    if (api.settings.assetsFolder) response += api.settings.assetsFolder + "/";
    response += path;

    return response;
  }
}
