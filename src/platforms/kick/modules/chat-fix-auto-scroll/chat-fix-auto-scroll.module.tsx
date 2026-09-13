import KickModule from "$kick/kick.module.ts";
import type { KickChatMessageEvent } from "$types/platforms/kick/kick.events.types.ts";
import type { KickModuleConfig } from "$types/shared/module/module.types.ts";

export default class ChatFixAutoScrollModule extends KickModule {
	config: KickModuleConfig = {
		name: "chat-fix-auto-scroll",
		appliers: [
			{
				type: "event",
				key: "chat-fix-auto-scroll",
				event: "kick:chatMessage",
				callback: this.handleMessage.bind(this),
			},
		],
	};

	private frame: number | undefined;

	private handleMessage({ isRerender }: KickChatMessageEvent) {
		if (isRerender || this.frame !== undefined) return;
		this.frame = requestAnimationFrame(() => {
			this.frame = undefined;
			this.kickUtils().scrollToBottomOnChat();
		});
	}
}
