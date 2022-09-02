import {ResponseDataInterface} from "../interfaces/response/ResponseDataInterface";
import {ModelInterface} from "../interfaces/ModelInterface";
import {CampaignDataInterface} from "../interfaces/data/CampaignDataInterface";
import {IoInterface} from "../interfaces/IoInterface";
import {DataviewInlineApi} from "obsidian-dataview/lib/api/inline-api";
import {IoFactory, SingleIoKey} from "../factories/Iofactory";
import {App, Component, MarkdownRenderer} from "obsidian";
import {CampaignSetting} from "../enums/CampaignSetting";
import {DataType} from "../enums/DataType";
import {GenericDataInterface} from "../interfaces/data/GenericDataInterface";
import {RpgFunctions} from "../RpgFunctions";
import {DataFactory, SingleDataKey} from "../factories/DataFactory";
import {SessionDataInterface} from "../interfaces/data/SessionDataInterface";
import {SceneDataInterface} from "../interfaces/data/SceneDataInterface";

export abstract class AbstractModel implements ModelInterface {
	protected io: IoInterface;

	protected dataType: DataType|null;
	protected specificData: GenericDataInterface;

	constructor(
		protected app: App,
		protected campaign: CampaignDataInterface,
		protected current: Record<string, any>,
		private dv: DataviewInlineApi,
		protected source: string,
		protected sourcePath: string,
		protected contentEl: HTMLElement,
	) {
		this.io = IoFactory.create(CampaignSetting[this.campaign.settings] + 'Io' as SingleIoKey<any>, this.app, this.campaign, this.dv, this.current);

		this.dataType = RpgFunctions.getDataType(this.current.tags)
		if (this.dataType != null) {
			this.specificData = DataFactory.create(
				CampaignSetting[this.campaign.settings] + DataType[this.dataType] as SingleDataKey<any>,
				this.current,
				this.campaign,
				'',
			);
		}

		if (this.dataType === DataType.Session) {
			(<SessionDataInterface>this.specificData).adventure = this.io.getAdventure((<SessionDataInterface>this.specificData).adventureId);
		} else if (this.dataType === DataType.Scene) {
			(<SceneDataInterface>this.specificData).adventure = this.io.getAdventure(
				(<SceneDataInterface>this.specificData).adventureId,
			);
			(<SceneDataInterface>this.specificData).session = this.io.getSession(
				(<SceneDataInterface>this.specificData).adventureId,
				(<SceneDataInterface>this.specificData).sessionId,
			);
			(<SceneDataInterface>this.specificData).previousScene = this.io.getScene(
				(<SceneDataInterface>this.specificData).adventureId,
				(<SceneDataInterface>this.specificData).sessionId,
				(<SceneDataInterface>this.specificData).id - 1,
			);
			(<SceneDataInterface>this.specificData).nextScene = this.io.getScene(
				(<SceneDataInterface>this.specificData).adventureId,
				(<SceneDataInterface>this.specificData).sessionId,
				(<SceneDataInterface>this.specificData).id + 1,
			);
		}
	}

	private generateBreadcrumb(
	): void{
		let breadcrumb: Element;
		if (this.contentEl.children[0].hasClass('rpgm-breadcrumb')) {
			breadcrumb = this.contentEl.children[0].children[0];
			breadcrumb.empty();
		} else {
			breadcrumb = document.createElement('div');
			breadcrumb.addClass('rpgm-breadcrumb');
			this.contentEl.prepend(breadcrumb);
		}

		const campaignBreadcrumb = breadcrumb.createSpan({cls: 'element'});
		MarkdownRenderer.renderMarkdown(
			this.campaign.link.toString(),
			campaignBreadcrumb,
			this.sourcePath,
			null as unknown as Component,
		);

		if (this.dataType !== DataType.Campaign){
			this.generateSeparator(breadcrumb);

			switch (this.dataType) {
				case DataType.Adventure:
					this.generateElement(breadcrumb, this.specificData);
					break;
				case DataType.Session:
					this.generateElement(breadcrumb, (<SessionDataInterface>this.specificData).adventure);
					this.generateSeparator(breadcrumb);
					this.generateElement(breadcrumb, this.specificData);
					break;
				case DataType.Scene:
					this.generateElement(breadcrumb, (<SceneDataInterface>this.specificData).adventure);
					this.generateSeparator(breadcrumb);
					this.generateElement(breadcrumb, (<SceneDataInterface>this.specificData).session);
					this.generateSeparator(breadcrumb);
					this.generateElement(breadcrumb, this.specificData);
					break;
				default:
					this.generateElement(breadcrumb, this.specificData);
					break;
			}
		}

		breadcrumb.createDiv().style.clear = 'both';
	}

	private generateSeparator(
		containerEl: Element,
	): void {
		const span = containerEl.createSpan({cls: 'separator'});
		const p = span.createEl('p');
		p.textContent = ' > ';
	}

	private generateElement(
		containerEl: Element,
		content: GenericDataInterface|null,
	): void {
		if (content != null) {
			const span = containerEl.createSpan({cls: 'element'});

			MarkdownRenderer.renderMarkdown(
				content.link.toString(),
				span,
				this.sourcePath,
				null as unknown as Component,
			);
		}
	}

	abstract generateData(
	): ResponseDataInterface;
}
