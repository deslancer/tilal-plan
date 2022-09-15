import type { ShadowGenerator } from 'babylonjs';

export interface IShadowGenerator {
	createGenerator(): void;
	getGenerator(): ShadowGenerator;
}
