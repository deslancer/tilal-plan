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

            })
            const groundMaterial = this.scene.getMeshByName('Road_Plane_2500m_Web').material;

            const ground2KTexture = new BABYLON.Texture('/assets/models/Road_Web_2K_Color.jpg', this.scene);
            const ground8KTexture = new BABYLON.Texture('/assets/models/Road_Web_8K_Color.jpg', this.scene);
            BABYLON.Texture.WhenAllReady([ground2KTexture], () => {
                groundMaterial.baseTexture = ground2KTexture;

            })
            BABYLON.Texture.WhenAllReady([ground8KTexture], () => {
                groundMaterial.baseTexture = ground8KTexture;
                groundMaterial.freeze();
            })
        }
    }
}