import {
	Plugin,
	parseYaml,
	MarkdownRenderer,
	MarkdownRenderChild,
	sanitizeHTMLToDom,
} from "obsidian";
import { template } from "@zhouhua-dev/remark-media-card";

function appendErrorMsg(el: HTMLElement) {
	const container = el.querySelector("pre.language-yaml");
	if (container) {
		const errorMsg = container.createEl("div", {
			cls: "error-msg",
			text: "Invalid YAML format.",
		});
	}
}

export default class MediaCardPlugin extends Plugin {
	async onload() {
		this.registerMarkdownCodeBlockProcessor("media-card", (source, el, ctx) => {
			el.addClass("markdown-media-card-render");
			try {
				const html = template(parseYaml(source));
				const fragment = sanitizeHTMLToDom(html);
				el.appendChild(fragment);
			} catch (e) {
				MarkdownRenderer.render(
					this.app,
					["```yaml", source, "```"].join("\n"),
					el,
					ctx.sourcePath,
					new MarkdownRenderChild(el)
				);
				appendErrorMsg(el);
			}
		});
	}

	onunload() {}
}
