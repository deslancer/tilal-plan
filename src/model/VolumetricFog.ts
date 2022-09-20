import * as BABYLON from 'babylonjs';

export class VolumetricFogPluginMaterial extends BABYLON.MaterialPluginBase {
    center = new BABYLON.Vector3(0, 100, 0);
    radius = 300;
    color = new BABYLON.Color3(1, 1, 1);
    density = 3.5;

    get isEnabled() {
        return this._isEnabled;
    }

    set isEnabled(enabled) {
        if (this._isEnabled === enabled) {
            return;
        }
        this._isEnabled = enabled;
        this.markAllDefinesAsDirty();
        this._enable(this._isEnabled);
    }

    _isEnabled = false;

    constructor(material) {
        super(material, "VolumetricFog", 500, { "VOLUMETRIC_FOG": false });

        this._varColorName = material instanceof BABYLON.PBRBaseMaterial ? "finalColor" : "color";
    }

    prepareDefines(defines, scene, mesh) {
        defines.VOLUMETRIC_FOG = this._isEnabled;
    }

    getUniforms() {
        return {
            "ubo": [
                { name: "volFogCenter", size: 3, type: "vec3" },
                { name: "volFogRadius", size: 1, type: "float" },
                { name: "volFogColor", size: 3, type: "vec3" },
                { name: "volFogDensity", size: 1, type: "float" },
            ],
            "fragment":
                `#ifdef VOLUMETRIC_FOG
                            uniform vec3 volFogCenter;
                            uniform float volFogRadius;
                            uniform vec3 volFogColor;
                            uniform float volFogDensity;
                        #endif`,
        };
    }

    bindForSubMesh(uniformBuffer, scene, engine, subMesh) {
        if (this._isEnabled) {
            uniformBuffer.updateVector3("volFogCenter", this.center);
            uniformBuffer.updateFloat("volFogRadius", this.radius);
            uniformBuffer.updateColor3("volFogColor", this.color);
            uniformBuffer.updateFloat("volFogDensity", this.density);
        }
    }

    getClassName() {
        return "VolumetricFogPluginMaterial";
    }

    getCustomCode(shaderType) {
        return shaderType === "vertex" ? null : {
            "CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR": `
                        #ifdef VOLUMETRIC_FOG
                            float volFogRadius2 = volFogRadius * volFogRadius;
                            float distCamToPos = distance(vPositionW.xyz, vEyePosition.xyz);
                            vec3 dir = normalize(vPositionW.xyz - vEyePosition.xyz);
                            vec3 L = volFogCenter - vEyePosition.xyz;
                            float tca = dot(L, dir);
                            float d2 = dot(L, L) - tca * tca;
                            if (d2 < volFogRadius2) {
                                float thc = sqrt(volFogRadius2 - d2);
                                float t0 = tca - thc;
                                float t1 = tca + thc;
                                float dist = 0.0;
                                if (t0 < 0.0 && t1 > 0.0) {
                                    dist = min(distCamToPos, t1);
                                } else if (t0 > 0.0 && t1 > 0.0 && t0 < distCamToPos) {
                                    dist = min(t1, distCamToPos) - t0;
                                }
                                float distToCenter = length(cross(volFogCenter - vEyePosition.xyz, dir));
                                float fr = distToCenter < volFogRadius ? smoothstep(0.0, 1.0, cos(distToCenter/volFogRadius*3.141592/2.0)) : 0.0;
                                float e = dist/(volFogRadius*2.0);
                                e = 1.0 - exp(-e * volFogDensity);
                                ${this._varColorName} = mix(${this._varColorName}, vec4(volFogColor, ${this._varColorName}.a), clamp(e*fr, 0.0, 1.0));
                            }
                        #endif
                    `,
        };
    }
}