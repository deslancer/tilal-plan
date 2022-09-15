import * as BABYLON from 'babylonjs';

export class CameraService {
	private readonly canvas: any;
	private readonly scene: any;
	camera: BABYLON.ArcRotateCamera;
	constructor( canvas, scene ) {
		this.canvas = canvas;
		this.scene = scene;
	}

	createPerspectiveCam() {
		const camera = new BABYLON.ArcRotateCamera( "camera",
			-Math.PI / 1.8,
			Math.PI / 2.5,
			300,
			new BABYLON.Vector3( 0, 0, 0 ),
			this.scene );
		camera.attachControl( this.canvas, true );
		camera.minZ = 10;
		camera.maxZ = 100000;
		camera.target = new BABYLON.Vector3( 0, 0.8, 0 );
		camera.upperBetaLimit = Math.PI / 2.2;
		camera.lowerRadiusLimit = 100;
		camera.upperRadiusLimit = 1000;

		this.camera = camera;
		return camera
	}
	getCamera(){
		return this.camera;
	}
}
