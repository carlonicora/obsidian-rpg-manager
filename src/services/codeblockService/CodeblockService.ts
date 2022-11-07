import {CodeblockServiceInterface} from "./interfaces/CodeblockServiceInterface";
import {ServiceInterface} from "../../managers/servicesManager/interfaces/ServiceInterface";
import {TFile} from "obsidian";
import {RpgManagerApiInterface} from "../../api/interfaces/RpgManagerApiInterface";
import {ImageInterface} from "../galleryService/interfaces/ImageInterface";
import {RelationshipInterface} from "../relationshipsService/interfaces/RelationshipInterface";
import {AbstractService} from "../../managers/servicesManager/abstracts/AbstractService";
import {CodeblockDomainInterface} from "./interfaces/CodeblockDomainInterface";
import {CodeblockWorkerInterface} from "./interfaces/CodeblockWorkerInterface";
import {CodeblockWorker} from "./workers/CodeblockWorker";
import {CodeblockImageWorker} from "./workers/CodeblockImageWorker";
import {CodeblockRelationshipWorker} from "./workers/CodeblockRelationshipWorker";
import {CodeblockKeyWorker} from "./workers/CodeblockKeyWorker";
import {ImageService} from "../imageService/ImageService";
import {CodeblockRunningWorker} from "./workers/CodeblockRunningWorker";
import {Md5} from "ts-md5";
import {ModelInterface} from "../../managers/modelsManager/interfaces/ModelInterface";

export class CodeblockService extends AbstractService implements CodeblockServiceInterface, ServiceInterface {
	private _worker: CodeblockWorkerInterface;

	constructor(
		api: RpgManagerApiInterface,
	) {
		super(api);
		this._worker = new CodeblockWorker(this.api);
	}

	public async addOrUpdate(
		key: string,
		value?: string|boolean|number,
		file?: TFile,
	): Promise<void> {
		const domain: CodeblockDomainInterface | undefined = await this._worker.readContent(false, file);

		if (domain === undefined)
			return undefined;

		const dataWorker = await new CodeblockKeyWorker(this.api);
		await dataWorker.addOrUpdate(domain, {key: key, value: value});

		await this._worker.updateContent(domain);
	}

	public async addOrUpdateFrontmatter(
		key: string,
		value?: string|boolean|number,
		file?: TFile,
	): Promise<void> {
		const domain: CodeblockDomainInterface | undefined = await this._worker.readContent(true, file);

		if (domain === undefined)
			return undefined;

		const dataWorker = await new CodeblockKeyWorker(this.api);
		await dataWorker.addOrUpdate(domain, {key: key, value: value});

		await this._worker.updateContent(domain);
	}

	public async addOrUpdateImage(
		path: string,
		caption: string,
		file?: TFile,
	): Promise<ImageInterface | undefined> {
		const domain: CodeblockDomainInterface | undefined = await this._worker.readContent(false, file);
		if (domain === undefined)
			return undefined;

		const dataWorker = await new CodeblockImageWorker(this.api);
		await dataWorker.addOrUpdate(domain, {path: path, caption: caption});

		return this._worker.updateContent(domain)
			.then(() => {
				return this.api.service(ImageService).createImage(path, caption);
			});
	}

	public async addOrUpdateRelationship(
		relationship: RelationshipInterface,
		file?: TFile,
	): Promise<void> {
		const domain: CodeblockDomainInterface | undefined = await this._worker.readContent(false, file);
		if (domain === undefined)
			return;

		const dataWorker = await new CodeblockRelationshipWorker(this.api);
		await dataWorker.addOrUpdate(domain, relationship);

		this._worker.updateContent(domain);
	}

	public async replaceID(
		file: TFile,
		id: string,
	): Promise<void> {
		const domain: CodeblockDomainInterface | undefined = await this._worker.readContent(false, file, 'RpgManagerID');

		if (domain === undefined)
			return;

		const checksum: string = await Md5.hashStr(id);

		const dataWorker = await new CodeblockKeyWorker(this.api);
		await dataWorker.addOrUpdate(domain, {key: 'id', value: id});
		await dataWorker.addOrUpdate(domain, {key: 'checksum', value: checksum});

		const oldModel: ModelInterface | undefined = await this.api.database.readByPath(file.path);
		if (oldModel !== undefined)
			await this.api.database.delete(oldModel);

		await this._worker.updateContent(domain);
	}

	public async remove(
		key: string,
		file?: TFile,
	): Promise<void> {
		const domain: CodeblockDomainInterface | undefined = await this._worker.readContent(false, file);
		if (domain === undefined)
			return undefined;

		const dataWorker = await new CodeblockKeyWorker(this.api);
		await dataWorker.remove(domain, key);

		this._worker.updateContent(domain);
	}

	public async removeFrontmatter(
		key: string,
		file?: TFile,
	): Promise<void> {
		const domain: CodeblockDomainInterface | undefined = await this._worker.readContent(true, file);
		if (domain === undefined)
			return undefined;

		const dataWorker = await new CodeblockKeyWorker(this.api);
		await dataWorker.remove(domain, key);

		this._worker.updateContent(domain);
	}

	public async read(
		file?: TFile,
		codeblockName = 'RpgManagerData',
	): Promise<any> {
		const domain: CodeblockDomainInterface | undefined = await this._worker.readContent(false, file, codeblockName);

		return domain?.codeblock;
	}

	public async removeImage(
		path: string,
		file?: TFile,
	): Promise<void> {
		const domain: CodeblockDomainInterface | undefined = await this._worker.readContent(false, file);
		if (domain === undefined)
			return;

		const dataWorker = new CodeblockImageWorker(this.api);
		await dataWorker.remove(domain, path);

		this._worker.updateContent(domain);
	}

	public async removeRelationship(
		path: string,
		file?: TFile,
	): Promise<void> {
		const domain: CodeblockDomainInterface | undefined = await this._worker.readContent(false, file);
		if (domain === undefined)
			return;

		const dataWorker = await new CodeblockRelationshipWorker(this.api);
		await dataWorker.remove(domain, path);

		this._worker.updateContent(domain);
	}

	public async selectRpgManagerData(
	): Promise<void> {
		const domain: CodeblockDomainInterface | undefined = await this._worker.readContent(false);

		if (domain === undefined || domain.editor === undefined)
			return;

		domain.editor.setSelection(
			domain.codeblockStart,
			domain.codeblockEnd,
		);
		domain.editor.focus();
	}

	public async startRunningTime(
	): Promise<void> {
		const domain: CodeblockDomainInterface | undefined = await this._worker.readContent(false);

		if (domain === undefined || domain.editor === undefined)
			return;

		const dataWorker = await new CodeblockRunningWorker(this.api);
		dataWorker.addOrUpdate(domain, {});

		this._worker.updateContent(domain);
	}

	public async stopRunningTime(
		file?: TFile,
	): Promise<void> {
		let domain: CodeblockDomainInterface | undefined = undefined;

		if (file !== undefined)
			domain = await this._worker.tryReadOpenContent(file);

		if (domain === undefined)
			domain = await this._worker.readContent(false, file);

		if (domain === undefined)
			return;

		const dataWorker = await new CodeblockRunningWorker(this.api);
		dataWorker.remove(domain, '');

		this._worker.updateContent(domain);
	}
}
