import {
	Plugin,
	parseYaml,
	MarkdownRenderer,
	MarkdownRenderChild,
	sanitizeHTMLToDom,
	Notice,
} from "obsidian";
import { template } from "@zhouhua-dev/remark-media-card";

export default class MediaCardPlugin extends Plugin {
	async onload() {
		this.registerMarkdownCodeBlockProcessor("media-card", (source, el, ctx) => {
			try {
				const html = template(parseYaml(source));
				const fragment = sanitizeHTMLToDom(html);
				el.appendChild(fragment);
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
