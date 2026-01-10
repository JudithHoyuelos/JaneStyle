class SilenceDetector extends AudioWorkletProcessor {
    process(inputs) {
      const input = inputs[0];
      if (input && input[0]) {
        const channelData = input[0];
        const total = channelData.reduce((acc, val) => acc + Math.abs(val), 0);
        const averageVolume = total / channelData.length;
  
        this.port.postMessage({ averageVolume });
      }
      return true;
    }
  }
  
  registerProcessor('silence-detector', SilenceDetector);
  