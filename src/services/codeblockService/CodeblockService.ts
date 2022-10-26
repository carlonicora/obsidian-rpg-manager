import {CodeblockServiceInterface} from "./interfaces/CodeblockServiceInterface";
import {ServiceInterface} from "../../api/servicesManager/interfaces/ServiceInterface";
import {TFile} from "obsidian";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {ImageInterface} from "../galleryService/interfaces/ImageInterface";
import {RelationshipInterface} from "../relationshipsService/interfaces/RelationshipInterface";
import {AbstractService} from "../../api/servicesManager/abstracts/AbstractService";
import {CodeblockDomainInterface} from "./interfaces/CodeblockDomainInterface";
import {CodeblockWorkerInterface} from "./interfaces/CodeblockWorkerInterface";
import {CodeblockWorker} from "./workers/CodeblockWorker";
import {CodeblockImageWorker} from "./workers/CodeblockImageWorker";
import {GalleryService} from "../galleryService/GalleryService";
import {CodeblockRelationshipWorker} from "./workers/CodeblockRelationshipWorker";

export class CodeblockService extends AbstractService implements CodeblockServiceInterface, ServiceInterface {
	private _worker: CodeblockWorkerInterface;

	constructor(
		api: RpgManagerApiInterface,
	) {
		super(api);
		this._worker = new CodeblockWorker(this.api);
	}

	public async addOrUpdateImage(
		path: string,
		caption: string,
	): Promise<ImageInterface | undefined> {
		const domain: CodeblockDomainInterface | undefined = await this._worker.readContent();
		if (domain === undefined)
			return undefined;

		const dataWorker = await new CodeblockImageWorker();
		await dataWorker.addOrUpdate(domain, {path: path, caption: caption});

		return this._worker.updateContent(domain)
			.then(() => {
				return this.api.service(GalleryService)?.createImage(path, caption);
			});
	}

	public async addOrUpdateRelationship(
		relationship: RelationshipInterface,
	): Promise<void> {
		const domain: CodeblockDomainInterface | undefined = await this._worker.readContent();
		if (domain === undefined)
			return;

		const dataWorker = await new CodeblockRelationshipWorker(this.api);
		dataWorker.addOrUpdate(domain, relationship);
	}

	public async replaceID(
		file: TFile,
		id: string,
	): Promise<void> {
		const domain: CodeblockDomainInterface | undefined = await this._worker.readContent();
		if (domain === undefined)
			return;

	}

	public async read(
		file?: TFile,
		codeblockName = 'RpgManagerData',
	): Promise<any> {
		const domain: CodeblockDomainInterface | undefined = await this._worker.readContent(codeblockName, file);

		return domain?.codeblock;
	}

	public async removeImage(
		path: string,
	): Promise<void> {
		const domain: CodeblockDomainInterface | undefined = await this._worker.readContent();
		if (domain === undefined)
			return;

		const dataWorker = new CodeblockImageWorker();
		dataWorker.remove(domain, path);

		this._worker.updateContent(domain);
	}

	public async removeRelationship(
		path: string,
	): Promise<void> {
		const domain: CodeblockDomainInterface | undefined = await this._worker.readContent();
		if (domain === undefined)
			return;

		const dataWorker = await new CodeblockRelationshipWorker(this.api);
		dataWorker.remove(domain, path);
	}
}
