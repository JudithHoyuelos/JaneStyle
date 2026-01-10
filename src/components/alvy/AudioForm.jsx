import React, { useEffect } from "react";
import useAudioRecorder from "@/hooks/useAudioRecorder";
import * as alvy from "@/lib/alvy";

function AudioRecorder() {
  const { isRecording, audioUrl, audioBlob, onRecordStart, onRecordStop, sendMessage } = useAudioRecorder();

  useEffect(() => {
    alvy.onResponse((message) => {
      if (message.command === 'audio') {
        const audioElement = new Audio(URL.createObjectURL(message.message));
        audioElement.play().catch((error) => console.error('Error al reproducir el audio:', error));
      }
    });

    alvy.startConnection();

    return () => {
      alvy.closeConnection();
    };
  }, []);

  const handleStartRecording = () => {
    onRecordStart();
  };

  const handleStopRecording = () => {
    onRecordStop();
  };

  const handleSendRecording = () => {
    sendMessage();
  };

  return (
    <div className="absolute top-0 right-0 z-10 p-4 bg-white bg-opacity-75 shadow-lg rounded-lg">
      <h1 className="text-xl font-semibold">Grabadora de Audio</h1>
      <div className="mt-4 space-x-2">
        <button
          onClick={handleStartRecording}
          disabled={isRecording}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Empezar grabación
        </button>
        <button
          onClick={handleStopRecording}
          disabled={!isRecording}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
        >
          Parar grabación
        </button>
        <button
          onClick={handleSendRecording}
          disabled={!audioBlob}
          className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-300"
        >
          Enviar grabación
        </button>
      </div>

      {audioUrl && (
        <div className="mt-4">
          <h2 className="text-lg">Reproducir grabación</h2>
          <audio controls className="w-full mt-2">
            <source src={audioUrl} type="audio/wav" />
            Tu navegador no soporta el elemento de audio.
          </audio>
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;