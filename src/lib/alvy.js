import { getAccessToken, saveAccessToken } from './auth';
import { envs } from './constants';

/** @type {WebSocket} */
let ws = null;
/** @type {(response: AlvyMessage) => viod?} */
let onResponseCallback = null;


class AlvyMessage {
  VALID_COMMANDS = Object.freeze({
    ERROR: 'error',
    COMMAND: 'command',
    MESSAGE: 'message',
    USER_MESSAGE: 'user-message',
    AUDIO: 'audio',
    USER_AUDIO: 'user-audio',
  })

  /** @type {String} */
  command;
  /** @type {any} */
  message;

  constructor({ command, message }) {
    if (command === undefined || !Object.values(this.VALID_COMMANDS).includes(command))
      throw new TypeError('Paramter "command" is required and only can be '
        + Object.values(this.VALID_COMMANDS).reduce((c, e) => c += ` ${e}`), '');
    if (message === undefined)
      throw new TypeError('Paramter "message" is required');

    this.command = command;
    this.message = message;
  }
}


function startConnection() {
  ws = new WebSocket(`${envs.DOMAIN_WS}/ai_integrations/alvy/chat/?translator=gemini`);
  let first = true;
  ws.onmessage = function (event) {
    // console.log('onmessage');
    let alvyMessage;
    try {
      alvyMessage = new AlvyMessage(JSON.parse(event.data));
    } catch (e) {
      console.log('Error parsing AlvyMessage');
      console.error(e);
    }

    if (alvyMessage.command === alvyMessage.VALID_COMMANDS.AUDIO) {
      alvyMessage.message = base64ToBlob(alvyMessage.message);
    }

    if (onResponseCallback === null) {
      console.error('Alvy.onResponseCallback no defined!\nMessage: ', alvyMessage);
      return;
    }

    if (alvyMessage.command === alvyMessage.VALID_COMMANDS.ERROR &&
      alvyMessage.message.includes('Invalid JWT or Bad Permissions')) {
      saveAccessToken('');
      location.reload();

    }

    if (first) {
      first = false;
      return;

    }

    onResponseCallback(alvyMessage);
  };

  ws.onopen = () => {
    // console.log('onopen');
    const userMessage = new AlvyMessage({
      command: 'command',
      message: getAccessToken()
    })
    ws.send(JSON.stringify(userMessage));
  }

  // ws.onclose = (event) => {
  //   console.log('WebSocket closed: ', event);

  //   if (ws.readyState === WebSocket.CLOSING || ws.readyState === WebSocket.CLOSED) {
  //     alert("La conexión ha sido cerrada o está en proceso de cierre. Reinicie la página para empezar la conexión de nuevo.");
  //   }
  // }
}



function closeConnection() {
  if (ws === null) return;

  ws.close()
}


/**
 * 
 * @param {String} message 
 */
function sendMessage(message) {
  if (ws === null)
    throw new Error('Alvy error: WebSocket connection no started.');

  const userMessage = new AlvyMessage({
    command: 'message',
    message: message
  })
  ws.send(JSON.stringify(userMessage));

  return new AlvyMessage({
    command: 'user-message',
    message: message
  });
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result.split(',')[1]); // Remove the Data URL prefix
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function base64ToBlob(base64content) {
  // Decode base64 to binary string
  const binaryString = atob(base64content);

  // Convert binary string to array of bytes
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Create a Blob from the byte array
  return new Blob([bytes], { type: "audio/mpeg" });
}

async function sendAudio(file) {
  if (ws === null)
    throw new Error('Alvy error: WebSocket connection no started.');

  const userMessage = new AlvyMessage({
    command: 'audio',
    message: await blobToBase64(file),
  });
  // console.log(userMessage)
  ws.send(JSON.stringify(userMessage));

  return new AlvyMessage({
    command: 'user-audio',
    message: file
  });
}

function onResponse(callback) {
  onResponseCallback = callback;
}

function isConnected() {
  return ws !== null && ws.readyState === WebSocket.OPEN;
}

export {
  AlvyMessage,
  sendMessage,
  sendAudio,
  startConnection,
  closeConnection,
  onResponse,
  isConnected,
}