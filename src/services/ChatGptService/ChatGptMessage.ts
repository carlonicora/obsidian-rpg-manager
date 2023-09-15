import { ChatGptMessageInterface } from "./interfaces/ChatGptMessageInterface";

export class ChatGptMessage implements ChatGptMessageInterface {
	constructor(public role: "system" | "user" | "assistant", public content: string) {
		this.content = this._simplifyLinks(this.content);
	}

	private _simplifyLinks(input: string): string {
		const wikiLinkRegex = /\[\[(?:.*\/)?(.*?)(?:\.md)?(\|([^]]+))?\]\]/g;

		return input.replace(wikiLinkRegex, (_, link, __, alias) => (alias ? alias : link));
	}
}
