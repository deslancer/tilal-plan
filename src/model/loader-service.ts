import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import type {ILoaderService} from "../interfaces/ILoaderService";


export class LoaderService implements ILoaderService{
    private url: string = './assets/models/';
    assetsManager;
    private mainScene;
    private envTextureTask;

    constructor(scene) {
        this.assetsManager = new BABYLON.AssetsManager(scene);
    }

    addMainSceneTask() {
        this.mainScene = this.assetsManager.addMeshTask("main scene task", "", this.url, "GenPlan_Web_with_mats.babylon");
    }

    addEnvTextureTask() {
        this.envTextureTask = this.assetsManager.addCubeTextureTask('cube texture', "./assets/textures/environment.env", null, false, null, true)
    }


    getMainSceneTask() {
        return this.mainScene;
    }

    getEnvTextureTask() {
        return this.envTextureTask;
    }



    loadAll() {
        this.addMainSceneTask();
        this.addEnvTextureTask();
        this.assetsManager.load();
    }



    /*  loadModel(scene) {
         let meshes;
         BABYLON.SceneLoader.ImportMeshAsync("", "/assets/models/", 'GenPlan_Web_with_mats.babylon', scene).then((result) => {
             meshes = result.meshes[0];
             meshes.forEach((mesh)=>{
                 mesh.isPickable = false;
             })
         });
     }*/
}
