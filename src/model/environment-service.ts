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
		skybox.material = this.materialService.dynamicSkyMaterial;
		/*this.scene.registerAfterRender(() => {
			skybox.rotate(BABYLON.Axis.Y, +0.00015, BABYLON.Space.LOCAL);
		})*/
		const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this.scene);


		window.addEventListener("keydown",  (evt) => {
			switch (evt.keyCode) {
				case 49:
					this.setToDay(skybox, light);
					break;
				case 50:
					this.setToNight(skybox, light);
				break;
				default: break;
			}
		});

		return skybox
	}
	animateSky(property, from, to, skybox){
		const keys = [
			{ frame: 0, value: from },
			{ frame: 100, value: to }
		];

		const animation = new BABYLON.Animation("animation", property, 100,
			BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
		animation.setKeys(keys);

		this.scene.stopAnimation(skybox);
		this.scene.beginDirectAnimation(skybox, [animation], 0, 100, false, 1);
	}
	animateLight(from, to, light){
		const light_keys = [
			{ frame: 0, value: from },
			{ frame: 100, value: to }
		];

		const l_animation = new BABYLON.Animation("light_animation", 'intensity', 100,
			BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
		l_animation.setKeys(light_keys);
		light.animations.push(l_animation);
		this.scene.stopAnimation(light);
		this.scene.beginDirectAnimation(light, [l_animation], 0, 100, false, 1);
	}
	setToDay(skybox, light){
		this.animateSky("material.inclination", this.materialService.dynamicSkyMaterial.inclination, 0, skybox);
		this.animateLight(light.intensity, 1.0, light);
	}
	setToNight(skybox, light){
		this.animateSky("material.inclination", this.materialService.dynamicSkyMaterial.inclination, -0.6, skybox);
		this.animateLight(light.intensity, 0.05, light);
	}
	createSimpleFog(){
		this.scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
		this.scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
		this.scene.fogDensity = 0.001;
	}

}
