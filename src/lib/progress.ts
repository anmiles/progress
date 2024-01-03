import { log, info } from '@anmiles/logger';

export class Progress {
	message: string;
	count: number;
	throttle: number;
	index: number;

	constructor(message: string, items: any[], options?: { limit: number }) {
		const limit = options?.limit ?? 10;
		this.index  = 0;

		this.message  = message;
		this.count    = items.length;
		this.throttle = this.count > limit
			? Math.ceil((this.count - 1) / (limit - 1))
			: 1;

		info(`${this.message}...`);
	}

	tick() {
		this.index++;

		if (this.throttle === 1 || (this.index - 1) % this.throttle === 0 || this.index === this.count) {
			log(`${this.message} (${this.index}/${this.count})...`);
		}
	}
}
