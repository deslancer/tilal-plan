import {ILoaderService} from "../interfaces/ILoaderService";

export class SetupMainScene {
    private loaderService: ILoaderService;
    private readonly scene;

    constructor(loaderService: ILoaderService, scene) {
        this.loaderService = loaderService;
        this.scene = scene;
    }

    setGroundTexture() {
        this.loaderService.getMainSceneTask().onSuccess = (task) => {
            let meshes = task.loadedMeshes;
            meshes.forEach((mesh) => {
                mesh.freezeWorldMatrix();
                mesh.doNotSyncBoundingInfo = true;
                mesh.isPickable = false;

            })
            const groundMaterial = this.scene.getMeshByName('Road_Plane_1400m_Web').material;

            const ground2KTexture = new BABYLON.Texture('/assets/models/Road_Web_Cut_2K_Color.jpg', this.scene);
            const ground4KTexture = new BABYLON.Texture('/assets/models/Road_Web_Cut_4K_Color.jpg', this.scene);
            BABYLON.Texture.WhenAllReady([ground2KTexture], () => {
                groundMaterial.baseTexture = ground2KTexture;

            })
            BABYLON.Texture.WhenAllReady([ground4KTexture], () => {
                groundMaterial.baseTexture = ground4KTexture;
                groundMaterial.freeze();
            })
        }
    }
}