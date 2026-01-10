import { useCameraContext } from "@/contexts/CameraContext";
import { useFrame } from "@react-three/fiber";

// Componente para mostrar texto animado
/**
 * Se usa para mostrar el texto animado de cada una de las escenas
 *
 * @param {{ title: any; content: any; opacity: any; }} param0
 * @param {string} [title] - El titulo del texto
 * @param {string} [content] - El contenido
 * @param {number} [opacity] - La opacidad que se quiere 
 * @returns {div} - El contenido del texto
 */
export const AnimatedText = ({ title, content, opacity }) => {
  return (
    <div
      className={`
        fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        text-white text-center p-12 pointer-events-none
        transition-opacity duration-150 ease-in-out
      `}
      style={{ opacity: opacity }}
    >
      {title && (
        <h1 className="text-4xl font-bold mb-4 animate-fade-in-down">
          {title}
        </h1>
      )}
      {content && <p className="text-lg animate-fade-in-up">{content}</p>}
    </div>
  );
};

// Función para determinar qué texto mostrar en base a la posición en Z
/**
 * Funcion para poner el texto de cada escena correspondiente.
 * Se usa la posicion de la z para que pille cual es la escena donde se encuentra la 
 * camara y asi mostrar el texto correspondiente.
 *
 * @export
 * @param {number} [zPosition] - Es la posicion en la z de la camara
 * @returns {{ title: any; content: string; opacity: number; }}
 */
export function getDisplayText(zPosition) {
  const wrappedZ = zPosition % 160;
  const fadeDistance = 5; // Distancia de desvanecimiento

  if (wrappedZ > 0) {
    return { title: "", content: "", opacity: 0 };
  }

  const scenes = [
    { start: 0, end: -15, title: "Nacimiento, equipo, visión, misión, valores" },
    { start: -40, end: -57, title: "Premios, subvenciones, ENISA" },
    { start: -80, end: -95, title: "Portfolio" },
    { start: -120, end: -135, title: "La plataforma" },
  ];

  for (let scene of scenes) {
    if (
      wrappedZ >= scene.end - fadeDistance &&
      wrappedZ <= scene.start + fadeDistance
    ) {
      let opacity = 1;
      if (wrappedZ > scene.start) {
        opacity = 1 - (wrappedZ - scene.start) / fadeDistance;
      } else if (wrappedZ < scene.end) {
        opacity = 1 - (scene.end - wrappedZ) / fadeDistance;
      }
      opacity = Math.max(0, Math.min(1, opacity));

      return {
        title: scene.title,
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida,",
        opacity: opacity,
      };
    }
  }

  return { title: "", content: "", opacity: 0 };
}

// Componente para monitorear la posición de la cámara y actualizar el texto mostrado
/**
 * Funcion que controla donde esta la camara para mostrar los textos o cambiar 
 * el contenido de los circulos. 
 *
 * @export
 * @param {{ onPositionChange: any; }} param0
 * @param {Function} [onPositionChange] - Funcion que se le pasa cada vez que cambia de escena para mostrar el texto y los circulos correspondientes 
 * @returns {null}
 */
export function CameraPositionWatcher({ onPositionChange }) {
  const { cameraRef } = useCameraContext();


  useFrame(() => {
    if (cameraRef.current) {
      const zPosition = cameraRef.current.position.z;
      const text = getDisplayText(zPosition);
      onPositionChange({
        title: text.title,
        content: text.content,
        opacity: text.opacity,
        z: zPosition,
    });
    }
  });

  return null;
}