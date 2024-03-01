import {
	Plugin,
	parseYaml,
	MarkdownRenderer,
	MarkdownRenderChild,
	Notice,
} from "obsidian";
import { template } from "@zhouhua-dev/remark-media-card";

export default class MediaCardPlugin extends Plugin {
	async onload() {
		this.registerMarkdownCodeBlockProcessor("media-card", (source, el, ctx) => {
			console.log("render");
			try {
				el.innerHTML = template(parseYaml(source));
			} catch (e) {
				new Notice("Invalid YAML format.");
				MarkdownRenderer.render(
					this.app,
					["```yaml", source, "```"].join("\n"),
					el,
					ctx.sourcePath,
					new MarkdownRenderChild(el)
				);
			}
		});
	}

	onunload() {}
}
