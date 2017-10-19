import Tapable = require('tapable');

export interface Callback {
	(...args: any[]): any;
}

export interface Plugins {
	[name: string]: Callback[];
}

export default class Pluginable extends Tapable {
	get plugins(): Plugins {
		return (<any> this)._plugins as any;
	}

	mockApply(name: string, ...args: any[]) {
		const callbacks = (<any> this)._plugins[name];

		if (callbacks) {
			return callbacks.map((callback: Callback) => callback.apply(this, args));
		}

		return [];
	}
}
