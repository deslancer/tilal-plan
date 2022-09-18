import * as BABYLON from 'babylonjs';
import * as Materials from 'babylonjs-materials'

import type { IMaterialService } from '../interfaces/IMaterialService';

export class MaterialsService implements IMaterialService{
	private readonly scene: any;
	private backgroundMat: any;
	private dynamicSky: any;
	constructor( scene ) {
		this.scene = scene;
	}


	createBackgroundMaterial() {
		let backgroundMaterial = new BABYLON.BackgroundMaterial( "backgroundMaterial", this.scene );
		backgroundMaterial.reflectionTexture = new BABYLON.CubeTexture( "assets/textures/TropicalSunnyDay", this.scene );
		backgroundMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
		this.backgroundMat = backgroundMaterial;
	}
	createDynamicSky(){
		const skyboxMaterial = new Materials.SkyMaterial("skyMaterial", this.scene);
		skyboxMaterial.backFaceCulling = false;
		skyboxMaterial.inclination = 0;
		this.dynamicSky = skyboxMaterial;

	}

	setupExistsMaterials() {


	}


	get backgroundMaterial() {
		return this.backgroundMat;
	}

	get dynamicSkyMaterial(){
		return this.dynamicSky;
	}
}
