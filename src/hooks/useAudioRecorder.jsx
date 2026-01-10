import { useRef, useState, useCallback } from "react";
import * as alvy from "@/lib/alvy";

/**
 * @hook useAudioRecorder
 * @description Hook personalizado para grabar audio, detectar silencio y enviar el archivo grabado automáticamente.
 *
 * @returns {{
 *  isRecording: boolean,
 *  audioUrl: string | null,
 *  audioBlob: Blob | null,
 *  audioDuration: number | null,
 *  isSendingAudio: boolean,
 *  setIsSendingAudio: (state: boolean) => void,
 *  onRecordStart: () => Promise<void>,
 *  onRecordStop: () => void
 * }}
 */

function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioDuration, setAudioDuration] = useState(null);
  const [isSendingAudio, setIsSendingAudio] = useState(false);

  const audioChunksRef = useRef([]);
  const mediaRecorderRef = useRef(null);
  const silenceTimeoutRef = useRef(null);
  const audioContextRef = useRef(null);
  const workletNodeRef = useRef(null);

  const beepAudioRef = useRef(null);

  if (typeof window !== "undefined") {
    beepAudioRef.current = new Audio("/audio/beep.mp3");
  }

  const playBeep = useCallback(() => {
    if (beepAudioRef.current) {
      beepAudioRef.current.play();
    }
  }, []);

  const sendMessage = useCallback(async (blob) => {
    if (!blob) return;

    try {
      await alvy.sendAudio(blob);
    } catch (error) {
      console.error("Error enviando el audio:", error);
    }

    setIsSendingAudio(true);
    setAudioBlob(null);
    setAudioUrl(null);
    setAudioDuration(null);
  }, []);

  const onRecordStart = useCallback(async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return;
    }

    try {
      playBeep();
      await new Promise((resolve) => setTimeout(resolve, 500));

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.start();
      setIsRecording(true);

      const audioContext = new (window.AudioContext ||

        window.webkitAudioContext)();
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);

      await audioContext.audioWorklet.addModule("/silence-detector-worklet.js");
      const workletNode = new AudioWorkletNode(
        audioContext,
        "silence-detector"
      );
      workletNodeRef.current = workletNode;

      source.connect(workletNode);
      workletNode.connect(audioContext.destination);

      workletNode.port.onmessage = (event) => {
        const { averageVolume } = event.data;

        if (averageVolume < 0.1) {
          if (!silenceTimeoutRef.current) {
            silenceTimeoutRef.current = setTimeout(() => {
              onRecordStop();
            }, 2000);
          }
        } else {
          clearTimeout(silenceTimeoutRef.current);
          silenceTimeoutRef.current = null;
        }
      };

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        playBeep();
        await new Promise((resolve) => setTimeout(resolve, 500));

        const mimeType = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/mp4";
        const blob = new Blob(audioChunksRef.current, { type: mimeType });
        const compatibleBlob = new Blob(audioChunksRef.current, { type: "audio/mpeg" });
        console.log("Audio enviado:", mimeType, blob);
        const url = URL.createObjectURL(compatibleBlob);

        setAudioBlob(blob);
        setAudioUrl(url);
        audioChunksRef.current = [];
        setIsRecording(false);

        try {
          const arrayBuffer = await blob.arrayBuffer();
          const decodedData = await audioContext.decodeAudioData(arrayBuffer);
          setAudioDuration(decodedData.duration);
        } catch (error) {
          console.error("Error al calcular la duración del audio:", error);
          setAudioDuration(0);
        }

        sendMessage(blob);

        workletNode.disconnect();
        source.disconnect();
        audioContext.close();
      };
    } catch (error) {
      console.error("Error al iniciar la grabación:", error);
    }
  }, [sendMessage, playBeep]);

  const onRecordStop = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
  }, []);

  return {
    isRecording,
    audioUrl,
    audioBlob,
    audioDuration,
    isSendingAudio,
    setIsSendingAudio,
    onRecordStart,
    onRecordStop,
  };
}

export default useAudioRecorder;
