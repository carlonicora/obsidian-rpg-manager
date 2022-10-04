import {AbstractHeaderView} from "../../../abstracts/AbstractHeaderView";
import {HeaderResponseInterface} from "../../../responses/interfaces/HeaderResponseInterface";
import {HeadlessTableView} from "../../HeadlessTableView";
import {HeaderResponseElementInterface} from "../../../responses/interfaces/HeaderResponseElementInterface";
import {HeaderResponseType} from "../../../responses/enums/HeaderResponseType";
import {ContentInterface} from "../../../responses/contents/interfaces/ContentInterface";
import {TFile} from "obsidian";
import {Pronoun} from "../../../databases/enums/Pronoun";
import {CharacterInterface} from "../../../databases/components/interfaces/CharacterInterface";

export class CharacterHeaderView extends AbstractHeaderView {
	protected currentElement:CharacterInterface;

	public render(
		container: HTMLElement,
		data: HeaderResponseInterface,
	): void {
		super.internalRender(container, data);

		const headlessTable = new HeadlessTableView(this.app, this.sourcePath);

		data.elements.forEach((element: HeaderResponseElementInterface) => {
			switch (element.type){
				case HeaderResponseType.Pronoun:
					headlessTable.addRow(element, this.addPronoun.bind(this));
					break;
				default:
					element.value.fillContent(
						this.createContainerEl(element.type, element.title),
						this.sourcePath,
					);
					break;
			}
		});

		this.headerContainerEl.appendChild(headlessTable.tableEl as Node);
	}

	private addPronoun(
		contentEl: HTMLDivElement,
		data: HeaderResponseElementInterface,
	): any|ContentInterface|undefined {
		const pronounSelectorEl = contentEl.createEl("select");
		pronounSelectorEl.createEl("option", {
			text: "",
			value: ""
		}).selected = true;

		Object.keys(Pronoun).filter((v) => isNaN(Number(v))).forEach((type, index) => {
			const pronoun = Pronoun[type as keyof typeof Pronoun];
			const pronounOptionEl = pronounSelectorEl.createEl("option", {
				text: this.factories.pronouns.readPronoun(pronoun),
				value: type.toLowerCase(),
			});

			if (data.value.content === pronoun) {
				pronounOptionEl.selected = true;
			}
		});

		pronounSelectorEl.addEventListener("change", (e) => {
			const file: TFile|undefined = this.currentElement.file;

			if (file !== undefined){
				this.manipulators.codeblock.update(
					'data.pronoun',
					pronounSelectorEl.value,
				)
			}
		});

		return undefined;
	}
}
