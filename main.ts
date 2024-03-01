import { Plugin, parseYaml } from "obsidian";
import { template } from "@zhouhua-dev/remark-media-card";

export default class MediaCardPlugin extends Plugin {
	async onload() {
		this.registerMarkdownCodeBlockProcessor("media-card", (source, el) => {
			el.innerHTML = template(parseYaml(source));
		});
	}

	onunload() {}
}
