import { App, TAbstractFile, TFile } from "obsidian";
import { RpgManagerInterface } from "src/RpgManagerInterface";
import { ElementInterface } from "src/data/interfaces/ElementInterface";
import { RpgManagerCodeblockService } from "src/services/RpgManagerCodeblockService";

export class FileUploadService {
	constructor(private _app: App, private _api: RpgManagerInterface) {}

	async uploadFileList(element: ElementInterface, files: FileList): Promise<void> {
		const codeblockService = new RpgManagerCodeblockService(this._app, this._api, element.file);

		const folderName =
			this._api.settings.assetsFolder !== undefined && this._api.settings.assetsFolder !== ""
				? this._api.settings.assetsFolder
				: "Assets";

		if (!this._app.vault.getAbstractFileByPath(folderName)) {
			try {
				await this._app.vault.createFolder(folderName);
			} catch (e) {
				//no need to catch any error here
			}
		}

		const availableFiles: TFile[] = this._app.vault
			.getFiles()
			.filter((file: TAbstractFile) => file.path.startsWith(folderName + "/" + element.name));

		const fs = require("fs");
		const imagesToAdd: { path: string; caption: string }[] = [];

		const copyPromises = Array.from(files).map((file: any, index: number) => {
			const extension: string = file.name.substring(file.name.lastIndexOf("."));

			const link: string = folderName + "/" + element.name + " " + (availableFiles.length + index + 1) + extension;

			const path = this._app.vault.adapter.basePath + "/" + link;

			imagesToAdd.push({ path: link, caption: "" });

			return new Promise((resolve, reject) => {
				fs.copyFile(file.path, path, (err: Error | undefined) => {
					if (err) reject(err);
					resolve(null);
				});
			});
		});

		return Promise.all(copyPromises).then(() => codeblockService.addImages(imagesToAdd));
	}
}
