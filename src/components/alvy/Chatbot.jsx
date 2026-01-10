import React, { useState, useEffect, useRef } from "react";
import useAudioRecorder from "@/hooks/useAudioRecorder";
import * as alvy from "@/lib/alvy";
import inputStyles from "@/styles/input-rounded.module.css";
import ButtonMicrophone from "../common/Buttons/ButtonMicrophone";
import ButtonClose from "../common/Buttons/ButtonClose";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Robot, RobotAnim } from "./Robot";
import DotsLoader2 from "../GeneralComp";
import CustomAudioPlayer from "./CustomAudioPlayer";


const Chatbot = ({ showCanvas = true }) => {
  const {
    isRecording,
    audioUrl,
    onRecordStart,
    onRecordStop,
    isSendingAudio,
    setIsSendingAudio,
    audioDuration,
  } = useAudioRecorder();
  const [animation, setAnimation] = useState(null);
  const [textQuestion, setTextQuestion] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { message: "¡Hola! 👋 ¿En qué puedo ayudarte?", isUser: false },
  ]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const messagesEndRef = useRef(null);

  const isMutedRef = useRef(isMuted);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  /**
   * Verifica si la conexión con Alvy está activa, y si no, intenta reconectarla
   * @returns {Promise<void>}
   */
  const checkAndReconnect = async () => {
    if (!alvy.isConnected()) {
      await alvy.startConnection();
      await new Promise((resolve) => {
        const checkConnection = setInterval(() => {
          if (alvy.isConnected()) {
            clearInterval(checkConnection);
            resolve();
          }
        }, 100);
      });
    }
  };

  /**
   * Maneja el envio de mensajes de texto por el usuario
   * @param {React.FormEvent} e - Evento de envio del formulario
   * @returns {Promise<void>}
   */
  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (textQuestion.trim() === "") return;

    setLoading(true);
    setIsButtonDisabled(true);
    await checkAndReconnect();

    if (alvy.isConnected()) {
      const questionMessage = alvy.sendMessage(textQuestion);
      setChatMessages([
        ...chatMessages,
        {
          ...questionMessage,
          isUser: true,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setTextQuestion("");
    } else {
      console.error(
        "No se pudo enviar el mensaje. La conexión WebSocket no está abierta."
      );
    }
  };

  /**
   * Alterna el inicio o la detención de la grabación de audio
   * @returns {Promise<void>}
   */
  const handleRecordingToggle = async () => {
    await checkAndReconnect();

    if (!audioRef.current) {
      // Preparamos el audio con interacción directa del usuario
      audioRef.current = new Audio();
    }

    if (isRecording) {
      onRecordStop();
    } else {
      onRecordStart();
    }
  };


  /**
   * Maneja la respuesta recibida desde Alvy y actualiza la interfaz 
   * @param {Object} alvyMessage - Mensaje recibido desde Alvy
   */
  const onAlvyResponseReceived = (alvyMessage) => {
    setIsSendingAudio(false);

    const randomAnimation = Math.random() < 0.5 ? "9" : "10";
    setAnimation(randomAnimation);

    setTimeout(() => {
      setAnimation(null);
    }, 1000);

    if (alvyMessage.command === "audio" && alvyMessage.message) {
      const audioUrl = URL.createObjectURL(alvyMessage.message);
      console.log("Respuesta:", alvyMessage.message);
      console.log("Tipo de audio recibido:", alvyMessage.message);

      const audioMessage = {
        message: audioUrl,
        isUser: false,
        type: "audio",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setChatMessages((prevMessages) => [...prevMessages, audioMessage]);

      // Asegúrate de tener un Audio creado por interacción previa del usuario
      if (!audioRef.current) {
        audioRef.current = new Audio();
      } else {
        audioRef.current.pause();
      }

      // Reutiliza el objeto Audio y actualiza la fuente
      audioRef.current.src = audioUrl;
      audioRef.current.load();

      if (!isMutedRef.current) {
        audioRef.current
          .play()
          .catch((error) =>
            console.error("Error al reproducir el audio en iOS:", error)
          );
      }
    } else {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        {
          ...alvyMessage,
          isUser: false,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }

    setLoading(false);
    setIsButtonDisabled(false);
  };


  useEffect(() => {
    alvy.startConnection();
    alvy.onResponse(onAlvyResponseReceived);
    return () => {
      alvy.closeConnection();
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  useEffect(() => {
    if (audioUrl && audioDuration !== null) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        {
          message: audioUrl,
          isUser: true,
          type: "audio",
          duration: audioDuration,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }
  }, [audioUrl, audioDuration]);

  /**
   * Alterna la visibilidad del panel del chatbot
   */
  const toggleVisibility = () => {
    setAnimation("7");
    setTimeout(() => {
      setAnimation(null);
    }, 1000);
    setIsVisible((prev) => {
      if (!prev) setIsHidden(false);
      return !prev;
    });
  };

  /**
   * Alterna entre mostrar u ocultar completamente el chatbot
   */
  const toggleHidden = () => {
    setIsHidden((prev) => {
      if (prev) {
        setAnimation("11");
        setTimeout(() => {
          setAnimation(null);
        }, 1000);
      }
      if (!prev) setIsVisible(false);
      return !prev;
    });
  };

  /**
   * Alterna el estado de mute para la reproducción de audios
   */
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const [isAlvyLoaded, setIsAlvyLoaded] = useState(false);

  /**
   * Callback cuando el componente de alvy ha terminado de cargar
   */
  const handleLoadComplete = () => {
    setIsAlvyLoaded(true);
    console.log("ey");
    setAnimation("1");
    setTimeout(() => {
      setAnimation(null);
    }, 1000);
  };

  return (
    <>
      {showCanvas && (
        <div>
          <button
            className={`fixed bottom-[20px] right-[80px] z-30 lg:w-10 lg:h-10 w-8 h-8 rounded-full flex items-center bg-[#373E65] ease-in-out shadow-lg transition-all duration-[2s] ${isVisible
              ? "max-lg:opacity-0 max-lg:translate-y-[150%]"
              : "max-lg:opacity-100 max-lg:translate-y-0"
              } ${isHidden
                ? " translate-x-[150%] rotate-180 "
                : "  translate-x-0 rotate-0"
              }`}
            onClick={toggleHidden}
          >
            <img src="/img/icons/chevrons.svg" className="p-2 lg:p-3" />
          </button>
        </div>
      )}
      <button
        onClick={toggleVisibility}
        className={`fixed bottom-[20px] right-[20px] lg:w-14 lg:h-14 w-12 h-12 bg-[#727DEF] text-white rounded-full p-3 shadow-lg z-30 transition-all duration-[2s] ${isVisible
          ? "max-lg:opacity-0 max-lg:translate-y-[150%]"
          : "max-lg:opacity-100 max-lg:translate-y-0"
          } ${isHidden
            ? " translate-x-[150%] rotate-180"
            : "  translate-x-0 rotate-0"
          }`}
      >
        <img src="/img/icons/chatbot.svg" />
      </button>
      <div
        className={`overflow-hidden fixed bottom-0 right-0 lg:bottom-[50px] lg:right-[50px] shadow-lg lg:rounded-xl lg:max-w-[400px] lg:h-[calc(100vh-150px)] max-lg:h-[75%] h-full w-full
          transition-all duration-[2s] ease-in-out transform max-lg:w-full
          ${isVisible
            ? "translate-x-0 scale-100"
            : "translate-x-[150%] scale-50"
          }`}
      >
        <div className="bg-white bg-opacity-40 backdrop-blur-sm p-4 border-2 border-white lg:rounded-2xl flex flex-col items-center justify-center h-full">
          <ButtonClose action={toggleVisibility} />
          <div className="flex justify-center items-center mt-4">
            <img
              src="/img/logos/favicon.png"
              alt="Imagen de bienvenida"
              className="w-[60px] max-lg:w-[0px] h-auto mb-4 rounded-lg"
            />
          </div>
          <div
            id="messages"
            className="flex-1 w-full overflow-y-auto space-y-4 px-3"
          >
            {chatMessages.map((chatMessage, index) => (
              <React.Fragment key={chatMessage.id || index}>
                {chatMessage.type !== "audio" && (
                  <div
                    key={chatMessage.id || `text-${index}`}
                    className={`p-2 text-sm break-words rounded-lg max-w-[75%] px-4 text-left w-fit shadow-lg shadow-black/20 ${chatMessage.isUser
                      ? "bg-purple-200 ml-auto"
                      : "bg-gray-200 mr-auto"
                      }`}
                  >
                    <p>{chatMessage.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {chatMessage.timestamp}
                    </p>
                  </div>
                )}

                {chatMessage.type === "audio" && (
                  <div
                    key={chatMessage.id || `audio-${index}`}
                    className={` rounded-lg max-w-[75%]  p-4 text-left shadow-lg shadow-black/20 ${chatMessage.isUser
                      ? "bg-purple-200 ml-auto"
                      : "bg-gray-200 mr-auto"
                      }`}
                  >
                    <CustomAudioPlayer
                      src={chatMessage.message}
                      calculatedDuration={chatMessage.duration}
                    />
                    <span className="text-xs text-gray-500 mt-1">
                      {chatMessage.timestamp}
                    </span>
                  </div>
                )}
              </React.Fragment>
            ))}

            <DotsLoader2 isVisible={loading || isSendingAudio} />

            <div ref={messagesEndRef} />
          </div>

          <form
            id="text-input"
            onSubmit={handleTextSubmit}
            className="gap-2 w-full items-center flex text-center mt-4"
          >
            <div>
              <button
                type="button"
                className="bg-foundation-1 lg:hover:bg-foundation-3 rounded-full lg:w-10 lg:h-10 w-8 h-8 rounded-full flex items-center"
                onClick={toggleMute}
              >
                <img
                  src={
                    isMuted
                      ? "/img/icons/sound-off.svg"
                      : "/img/icons/sound.svg"
                  }
                  alt="Enviar"
                  className="p-2 lg:p-3"
                />
              </button>
            </div>
            <input
              type="text"
              value={textQuestion}
              onChange={(e) => setTextQuestion(e.target.value)}
              autoComplete="off"
              className={inputStyles["input-rounded"]}
              placeholder="Escribe tu mensaje aquí..."
            />

            <div>
              <button
                className="bg-foundation-1 lg:hover:bg-foundation-3 rounded-full lg:w-10 lg:h-10 w-8 h-8 rounded-full flex items-center"
                disabled={isButtonDisabled}
              >
                <img
                  src="/img/icons/send.svg"
                  alt="Enviar"
                  className="p-2 lg:p-3"
                />
              </button>
            </div>

            <ButtonMicrophone
              onClick={handleRecordingToggle}
              isRecording={isRecording}
            />
          </form>
        </div>
      </div>
      {showCanvas && (
        <div
          className={` bottom-16 right-16 fixed transition-all max-lg:bottom-8 max-lg:right-0  ease-in-out duration-[2s] ${isHidden
            ? "duration-[2s] lg:translate-x-[60%] max-lg:translate-x-[30%] -rotate-45"
            : "duration-[2s] translate-x-0 rotate-0"
            } ${isVisible
              ? " duration-[2s] lg:-translate-x-[300px] max-lg:translate-x-[150%] lg:-translate-y-[100%] rotate-0"
              : "duration-[2s] translate-x-0 translate-y-0"
            }
          ${isAlvyLoaded ? " opacity-100" : "opacity-0"}`}
        >
          <Canvas
            style={{
              background: "transparent",
              width: "200px",
              height: "200px",
              zIndex: 0,
            }}
            gl={{ alpha: true }}
          >
            <ambientLight intensity={1} />
            <Environment background={false} preset="sunset" />
            <RobotAnim
              injectAnimation={animation}
              action={handleRecordingToggle}
              onLoadComplete={handleLoadComplete}
            />
          </Canvas>
        </div>
      )}
    </>
  );
};

export default Chatbot;
