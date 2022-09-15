import * as BABYLON from 'babylonjs';

export class EngineService{
    private readonly engine: any;
    constructor(canvas){
        this.engine = new BABYLON.Engine(canvas, true, null, true);
        window.addEventListener('resize', () => {
            this.engine.resize();
          });
    }
    getEngine(){
        return this.engine;
    }

}
