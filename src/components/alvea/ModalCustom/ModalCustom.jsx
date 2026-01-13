import React, { useState, useEffect } from "react";
import "./ModalCustom.css";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/Addons";
import {
  getFile,
  getUserPersonalization,
  saveUserPersonalization,
} from "@/lib/personalization";
import inputStyles from "@/styles/input-rounded.module.css";
import glassStyles from "@/styles/card-glass.module.css";
import LatButton from "../../common/Buttons/ButtonLat";
import ButtonClose from "../../common/Buttons/ButtonClose";
import { ContainerCenter, Divider } from "@/components/GeneralComp";
import { asset } from '@/utils/basePath';


/**
 * @component ModalCustom
 * @param {Object} props - Props del componente.
 * @param {boolean} props.isVisible - Indica si el modal está visible.
 * @param {Function} props.onOpen - Función para abrir/cerrar el modal.
 * @returns {JSX.Element} Componente del modal de personalización.
 */
const ModalCustom = ({ isVisible, onOpen }) => {
  const [userPreferences, setUserPreferences] = useState({});
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);

  useEffect(() => {
    const fetchAndApplyPreferences = async () => {
      try {
        const personalizationData = await getUserPersonalization();

        if (personalizationData) {
          const preferences = personalizationData.custom_values.reduce(
            (acc, item) => {
              acc[item.name] = item.value;
              return acc;
            },
            {}
          );

          const profilePhotoField = personalizationData.custom_values.find(
            (item) => item.name === "profilePhoto"
          );
          if (profilePhotoField) {
            const blob = await getFile(profilePhotoField);
            const data64 = await fileToBase64(blob);
            preferences.profilePhoto = data64;
            setProfilePhotoUrl(data64);
          }

          setUserPreferences(preferences);

          const applyPreferences = () => {
            const light = document.querySelector("#main-light");
            const sceneEl = document.querySelector("a-scene");
            const profileImg = document.querySelector("#profileImg");

            if (light && preferences["Luces"]) {
              changeLightColor(preferences["Luces"]);
            }

            if (sceneEl && preferences["Entorno"]) {
              changeEnvironment(preferences["Entorno"]);
            }
            if (profileImg && preferences["profilePhoto"]) {
              changeProfilePhoto(preferences["profilePhoto"]);
            }
          };

          const interval = setInterval(() => {
            if (
              document.querySelector("#main-light") &&
              document.querySelector("a-scene") &&
              document.querySelector("#profileImg")
            ) {
              applyPreferences();
              clearInterval(interval);
            }
          }, 1000);

          return () => clearInterval(interval);
        }
      } catch (error) {
        console.error("Error fetching preferences:", error);
      }
    };

    fetchAndApplyPreferences();
  }, []);

  /**
   * Guarda una preferencia del usuario.
   * @param {string} name - Nombre de la preferencia.
   * @param {string} value - Valor de la preferencia.
   */
  const savePreference = async (name, value) => {
    try {
      await saveUserPersonalization(name, value);
      setUserPreferences((prev) => ({
        ...prev,
        [name]: value,
      }));
    } catch (error) {
      console.error("Error al guardar la preferencia:", error);
    }
  };

    /**
   * Convierte un archivo Blob a una cadena base64.
   * @param {Blob} file - Archivo a convertir.
   * @returns {Promise<string>} Cadena base64 del archivo.
   */
  async function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        let result = reader.result;
        if (file instanceof Blob) {
          const mimeType = file.type || "image/jpeg";
          result = `data:${mimeType};base64,${result.split(",")[1]}`;
        }
        resolve(result);
      };

      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

   /**
   * Manejador para destacar botones seleccionados y guardar la preferencia.
   * @param {Function} actionFunction - Función a ejecutar.
   * @param {string} value - Valor seleccionado.
   * @param {string} name - Nombre de la preferencia.
   * @param {Event} event - Evento de clic.
   */
  const toggleHighlight = (actionFunction, value, name, event) => {
    const clickedElement = event.currentTarget;
    if (clickedElement.tagName === "BUTTON") {
      const divParent = document.getElementById("highlight");
      const buttons = divParent.querySelectorAll("button");
      buttons.forEach((button) => {
        button.classList.remove("highlighted");
      });
      clickedElement.classList.add("highlighted");
    }
    actionFunction(value);
    savePreference(name, value);
  };

    /**
   * Cambia la imagen de perfil en la escena 3D.
   * @param {string} url - URL o base64 de la imagen.
   */
  const changeProfilePhoto = (url) => {
    const scene = document.querySelector("a-scene");
    const existingProfileImg = document.querySelector("#profileImg");

    if (existingProfileImg) {
      existingProfileImg.remove();
    }

    const newProfileImg = document.createElement("a-image");
    newProfileImg.setAttribute("src", url || asset("img/profile-picture.svg"));
    newProfileImg.setAttribute("responsive-size", "maxSize: 2.1");
    newProfileImg.setAttribute("id", "profileImg");
    newProfileImg.setAttribute("position", "-10.9 2.23 -8.95");
    newProfileImg.setAttribute("rotation", "0 90 0");

    if (scene) {
      scene.appendChild(newProfileImg);
    } else {
      console.error(
        "No se encontró el elemento 'a-scene' para añadir la imagen."
      );
    }
  };

    /**
   * Cambia el color de la luz de la escena.
   * @param {string} colorHex - Color en formato HEX.
   */
  const changeLightColor = (colorHex) => {
    const light = document.querySelector("#main-light");
    if (light) {
      light.setAttribute("light", "color", colorHex);
    }
  };

  const changeEnvironment = (newPath) => {
    const sceneEl = document.querySelector("a-scene");
    if (!sceneEl) {
      return;
    }
    const threeScene = sceneEl.object3D;
    const renderer = sceneEl.renderer;
    if (!renderer) {
      return;
    }
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const hdriLoader = new RGBELoader();
    hdriLoader.load(
      newPath,
      (texture) => {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        texture.dispose();
        threeScene.environment = envMap;
        threeScene.background = envMap;
      },
      undefined
    );
  };

    /**
   * Manejador de subida de imagen de perfil.
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleProfilePhotoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      await saveUserPersonalization("profilePhoto", file);
      const base64Data = await fileToBase64(file);
      setProfilePhotoUrl(base64Data);
      changeProfilePhoto(base64Data);

      setUserPreferences((prev) => ({
        ...prev,
        profilePhoto: base64Data,
      }));
    } catch (error) {
      console.error("Error al guardar la foto de perfil:", error);
    }
  };

  const colorConfigs = [
    {
      label: "Luces",
      buttons: [
        { className: "bg-pink-200 color-picker", value: "#bf9b9b" },
        { className: "bg-foundation-1 color-picker", value: "#7B1AD8" },
        { className: "bg-foundation-2 color-picker", value: "#E50085" },
        { className: "bg-white color-picker", value: "#FFFFFF" },
      ],
      action: changeLightColor,
    },
    {
      label: "Entorno",
      buttons: [
        {
          className: "",
          value: asset("/img/equirectangular/rogland_clear_night_4k.hdr"),
          text: "Noche",
        },
        {
          className: "",
          value: asset("/img/equirectangular/sky-background-4.hdr"),
          text: "Mar y Montañas",
        },
      ],
      action: changeEnvironment,
    },
  ];

  return (
    <>
      <LatButton
        action={onOpen}
        imgURL="/img/icons/custom.svg"
        imgAlt="Icono de Personalización"
      />

      {isVisible && (
        <ContainerCenter>
          <div className={`${glassStyles["card-glass"]} mb-10 mt-10`}>
            <h2 className="text-xl lg:text-2xl font-bold text-center">Personalización</h2>
            <ButtonClose action={onOpen} />
            <div className="flex justify-center">
              <p>Luces:</p>
            </div>
            <div className="text-center">
              <div id="highlight">
                {colorConfigs[0].buttons.map((button, id) => (
                  <button
                    key={id}
                    className={`${button.className} ${
                      userPreferences["Luces"] === button.value
                        ? "highlighted"
                        : ""
                    }`}
                    onClick={(event) =>
                      toggleHighlight(
                        colorConfigs[0].action,
                        button.value,
                        "Luces",
                        event
                      )
                    }
                  >
                    {button.text || null}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <p>Entorno:</p>
            </div>
            <select
              className={`${inputStyles["input-rounded"]} text-center`}
              value={userPreferences["Entorno"] || ""}
              onChange={(e) => {
                const newValue = e.target.value;
                changeEnvironment(newValue);
                savePreference("Entorno", newValue);
              }}
            >
              {colorConfigs[1].buttons.map((button, id) => (
                <option key={id} value={button.value}>
                  {button.text || `Entorno ${id + 1}`}
                </option>
              ))}
            </select>
            <div className="flex justify-center">
              <p>Foto de perfil:</p>
            </div>

            {profilePhotoUrl ? (
              <div className="flex justify-center">
                <img
                  id="profileImg"
                  src={profilePhotoUrl}
                  alt="Foto de perfil"
                  className="lg:max-w-[200px] lg:max-h-[200px] max-h-[150px] max-w-[150px] w-auto h-auto"
                />
              </div>
            ) : (
              <p>No hay foto de perfil</p>
            )}
            <button
              className={`${inputStyles["input-rounded"]} flex justify-center`}
              onClick={() =>
                document.getElementById("profilePhotoInput").click()
              }
            >
              <p>
              Añadir foto de perfil
              </p>
            </button>
            <input
              id="profilePhotoInput"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleProfilePhotoUpload}
            />
          </div>
        </ContainerCenter>
      )}
    </>
  );
};

export default ModalCustom;