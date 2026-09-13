import KickModule from "$kick/kick.module.ts";
import LatencySampler from "$kick/kick.latency-sampler.ts";
import type { KickModuleConfig } from "$types/shared/module/module.types.ts";

export default class StreamLatencyReducerModule extends KickModule {
	private updateInterval: NodeJS.Timeout | undefined;
	private latencySampler = new LatencySampler();

	readonly config: KickModuleConfig = {
		name: "stream-latency-reducer",
		appliers: [
			{
				type: "selector",
				key: "stream-latency-reducer",
				selectors: ["#channel-chatroom"],
				callback: this.run.bind(this),
				validateUrl: (url) => {
					return !url.includes("/videos/") && !url.includes("/clips/");
				},
				once: true,
			},
		],
		enabled: () => this.settings().streamLatencyReducerEnabled,
	};

	private run(): void {
		if (this.updateInterval) clearInterval(this.updateInterval);
		this.updateInterval = setInterval(() => {
			const videoPlayer = this.getPlayer();
			if (!videoPlayer) return;

			if (videoPlayer.paused) {
				this.latencySampler.clear();
				this.changePlaybackSpeed(videoPlayer, 1);
				return;
			}

			const latency = this.latencySampler.add(this.kickUtils().getLatency(videoPlayer));
			this.changePlaybackSpeed(videoPlayer, this.getTargetRate(latency));
		}, 1000);
	}

	private changePlaybackSpeed(video: HTMLVideoElement, rate: number) {
		video.playbackRate = rate;
	}

	private getTargetRate(latency: number | undefined): number {
		const { minRate, maxRate, minThreshold, maxThreshold } = this.getSettings();

		if (latency === undefined || latency <= minThreshold) return 1;
		if (latency >= maxThreshold) return maxRate;

		return minRate + ((maxRate - minRate) * (latency - minThreshold)) / (maxThreshold - minThreshold);
	}

	private getSettings() {
		const settings = this.settings();
		return {
			minRate: settings.streamLatencyReducerMinRate,
			maxRate: settings.streamLatencyReducerMaxRate,
			minThreshold: settings.streamLatencyReducerMinThreshold,
			maxThreshold: settings.streamLatencyReducerMaxThreshold,
		};
	}

	private getPlayer() {
		const video = document.querySelector<HTMLVideoElement>("video#video-player");
		if (!video || !this.kickUtils().isLiveVideo(video)) {
			return null;
		}
		return video;
	}
}
