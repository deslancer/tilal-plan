import * as BABYLON from 'babylonjs';
import {LoaderService} from "./loader-service";
import {EngineService} from "./engine-service";
import {CameraService} from "./camera-service";
import {EnvironmentService} from "./environment-service";
import {MaterialsService} from "./materials-service";
import {SetupMainScene} from "./setup-main-scene";


export const createScene = async (canvas): Promise<BABYLON.Scene> => {
    const engine = new EngineService(canvas).getEngine();
    const scene = new BABYLON.Scene(engine);
    const cameraService = new CameraService(canvas, scene);
    const loaderService = new LoaderService(scene);
    const materialService = new MaterialsService(scene);
    const envService = new EnvironmentService(scene, materialService, loaderService);
    const setupMainScene = new SetupMainScene(loaderService, scene);

    scene.clearColor = new BABYLON.Color4(1.0, 1.0, 1.0, 1.0).toLinearSpace();
    cameraService.createPerspectiveCam();

    loaderService.loadAll();
    materialService.createBackgroundMaterial();
    materialService.createDynamicSky();
    envService.createSkyBox();
    envService.createHDREnvironment();

    setupMainScene.setGroundTexture();


    //////Optimization
    scene.cleanCachedTextureBuffer();

    document.onkeyup = function (e) {
        const evt = window.event || e;
        //console.log(evt.keyCode);
        // @ts-ignore
        if (evt.keyCode == 73 && evt.ctrlKey && evt.altKey) {
            if (scene.debugLayer.isVisible()) {
                scene.debugLayer.hide();
            } else {
                scene.debugLayer.show({
                    globalRoot: document.body,
                    overlay: true,
                });
            }
        }
    };
    engine.runRenderLoop(() => {
        document.querySelector('.fps').innerHTML = engine.getFps().toFixed() + " fps";
        scene.render();
    });

    window.addEventListener('resize', () => {
        engine.resize();
    });
    return scene;
}