import {
	Plugin,
	parseYaml,
	MarkdownRenderer,
	MarkdownRenderChild,
	sanitizeHTMLToDom,
} from "obsidian";
import { template } from "@zhouhua-dev/remark-media-card";
import { loadAllLocales } from "./i18n/i18n-util.sync";
import { i18n } from "./i18n/i18n-util";
import { Locales } from "./i18n/i18n-types";

loadAllLocales();

let locale: Locales = "en";
try {
	// @ts-ignore
	locale = /^zh/.test(global?.i18next?.language || "") ? "zh" : "en";
} catch (e) {
	/* empty */
}

const L = i18n()[locale];

function appendErrorMsg(el: HTMLElement) {
	const container = el.querySelector("pre.language-yaml");
	if (container) {
		container.createEl("div", {
			cls: "error-msg",
			text: L.invalid(),
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
