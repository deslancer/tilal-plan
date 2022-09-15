import * as BABYLON from 'babylonjs';
import type { ILoaderService } from "../interfaces/ILoaderService"
import type { MaterialsService } from './materials-service';


export class EnvironmentService {
	private readonly scene: any;
	private readonly materialService: any;
	private loaderService: ILoaderService;
	constructor(scene: BABYLON.Scene, materials: MaterialsService, loaderService: ILoaderService) {
		this.scene = scene;
		this.materialService = materials;
		this.loaderService = loaderService;
	}

	createHDREnvironment(): void {
		this.loaderService.getEnvTextureTask().onSuccess = (task) => {
			task.texture.setReflectionTextureMatrix(
				BABYLON.Matrix.RotationY(1.20)
			);
			this.scene.environmentTexture = task.texture;
		}
	}

	createSkyBox() {
		let skybox = BABYLON.Mesh.CreateBox("BackgroundSkybox", 30000, this.scene, undefined, BABYLON.Mesh.BACKSIDE);
		skybox.material = this.materialService.backgroundMaterial;
		this.scene.registerAfterRender(() => {
			skybox.rotate(BABYLON.Axis.Y, +0.00015, BABYLON.Space.LOCAL);
		})
		return skybox
	}



}
