
import  "three";
import { EXRLoader, RGBELoader } from "three/examples/jsm/Addons";

AFRAME.registerComponent('exr-background', {
  init: function () {
    const sceneEl = this.el.sceneEl;
    const renderer = sceneEl.renderer;
    const scene = sceneEl.object3D;
    
    const loader = new EXRLoader();
    loader.load(
      '/img/equirectangular/evening_field_2k.exr',
      function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;

        scene.environment = texture;
        scene.background = texture;

        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.5
      }
    );
  }
});

AFRAME.registerComponent('responsive-size', {
  schema: {
    maxSize: { type: 'number', default: 2 }
  },
  init: function () {
    const el = this.el;

    el.addEventListener('materialtextureloaded', () => {
      const mesh = el.getObject3D('mesh');
      if (!mesh || !mesh.material || !mesh.material.map || !mesh.material.map.image) {
        return;
      }

      const image = mesh.material.map.image;
      const maxSize = this.data.maxSize;
      const aspectRatio = image.width / image.height;

      let newWidth, newHeight;
      if (aspectRatio > 1) {
        newWidth = maxSize;
        newHeight = maxSize / aspectRatio;
      } else {
        newHeight = maxSize;
        newWidth = maxSize * aspectRatio;
      }

      el.setAttribute('width', newWidth);
      el.setAttribute('height', newHeight);
    });
  }
});

AFRAME.registerComponent('hdri-environment', {
  schema: {
    path: { type: 'string', default: '' },
  },

  init: function () {
    if (!this.data.path) {
      console.error('El atributo "path" es necesario para el componente hdri-environment.');
      return;
    }

    const el = this.el;
    const sceneEl = el.sceneEl;
    const renderer = sceneEl.renderer;

    if (!renderer) {
      console.error('No se encontró el renderizador de THREE.js. Asegúrate de que A-Frame está inicializado correctamente.');
      return;
    }

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const hdriLoader = new RGBELoader();

    hdriLoader.load(this.data.path, (texture) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      texture.dispose();
      
      const threeScene = sceneEl.object3D;
      threeScene.environment = envMap;
      threeScene.background = envMap;
    },
    undefined,
    (error) => {
      console.error('Error al cargar la textura HDRI:', error);
    });
  }
});
