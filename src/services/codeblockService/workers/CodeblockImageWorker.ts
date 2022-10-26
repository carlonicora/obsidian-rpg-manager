import {CodeblockDataWorkerInterface} from "../interfaces/CodeblockDataWorkerInterface";
import {CodeblockDomainInterface} from "../interfaces/CodeblockDomainInterface";
import {ComponentMetadataInterface} from "../../../core/interfaces/ComponentMetadataInterface";
import {ImageMetadataInterface} from "../../../core/interfaces/ImageMetadataInterface";

export class CodeblockImageWorker implements CodeblockDataWorkerInterface {
	public async addOrUpdate(
		domain: CodeblockDomainInterface,
		data: ImageMetadataInterface,
	): Promise<any> {
		if ((<ComponentMetadataInterface>domain.codeblock).data === undefined)
			(<ComponentMetadataInterface>domain.codeblock).data = {};

		if ((<ComponentMetadataInterface>domain.codeblock).data.images === undefined)
			(<ComponentMetadataInterface>domain.codeblock).data.images = [];

		let found: number | undefined;
		for (let index = 0; index < (<ComponentMetadataInterface>domain.codeblock).data.images.length; index++) {
			if (data.path === (<ComponentMetadataInterface>domain.codeblock).data.images[index].path) {
				found = index;
				break;
			}
		}

		if (found !== undefined) {
			(<ComponentMetadataInterface>domain.codeblock).data.images.splice(found, 1, data);
		} else {
			(<ComponentMetadataInterface>domain.codeblock).data.images.push(data);
		}
	}

	public async remove(
		domain: CodeblockDomainInterface,
		path: string,
	): Promise<void> {
		if ((<ComponentMetadataInterface>domain.codeblock).data.images === undefined)
			return;

		let found: number | undefined;
		for (let index = 0; index < (<ComponentMetadataInterface>domain.codeblock).data.images.length; index++) {
			if (path === (<ComponentMetadataInterface>domain.codeblock).data.images[index].path) {
				found = index;
				break;
			}
		}

		if (found !== undefined) {
			(<ComponentMetadataInterface>domain.codeblock).data.images.splice(found, 1);
		}
	}
}
