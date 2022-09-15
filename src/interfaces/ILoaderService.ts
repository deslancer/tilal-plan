import type {AbstractAssetTask} from 'babylonjs';

export interface ILoaderService {
	addMainSceneTask(): void;

	addEnvTextureTask(): void;

	getMainSceneTask(): AbstractAssetTask;

	getEnvTextureTask(): AbstractAssetTask;

	loadAll(): void;
}
