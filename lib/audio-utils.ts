export const WORKLET_CODE = `
class RecorderProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    const input = inputs[0];
    if (input.length > 0) {
      const channelData = input[0];
      this.port.postMessage(channelData);
    }
    return true;
  }
}
registerProcessor("recorder-processor", RecorderProcessor);
`;

export class AudioRecorder {
  private context: AudioContext | null = null;
  private stream: MediaStream | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private worklet: AudioWorkletNode | null = null;
  private onAudioData: (base64: string) => void;
  private sampleRate = 16000;

  constructor(onAudioData: (base64: string) => void) {
    this.onAudioData = onAudioData;
  }

  async start() {
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        channelCount: 1,
        echoCancellation: true,
        autoGainControl: true,
        noiseSuppression: true,
      },
    });

    this.context = new AudioContext({ sampleRate: this.sampleRate });
    
    // Fallback if sampleRate isn't supported (some browsers force hardware rate)
    // We handle resampling if needed, but Context sampleRate is the easiest way if supported.
    
    await this.context.audioWorklet.addModule(
      URL.createObjectURL(new Blob([WORKLET_CODE], { type: "application/javascript" }))
    );

    this.source = this.context.createMediaStreamSource(this.stream);
    this.worklet = new AudioWorkletNode(this.context, "recorder-processor");

    this.worklet.port.onmessage = (event) => {
      const float32Data = event.data;
      // Convert to Int16
      const int16Data = this.float32ToInt16(float32Data);
      // Convert to Base64
      const base64 = this.arrayBufferToBase64(int16Data.buffer);
      this.onAudioData(base64);
    };

    this.source.connect(this.worklet);
    this.worklet.connect(this.context.destination); // Necessary for processing to happen in some browsers
  }

  stop() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
    if (this.context) {
      this.context.close();
      this.context = null;
    }
    this.source = null;
    this.worklet = null;
  }

  private float32ToInt16(float32: Float32Array): Int16Array {
    const int16 = new Int16Array(float32.length);
    for (let i = 0; i < float32.length; i++) {
      const s = Math.max(-1, Math.min(1, float32[i]));
      int16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    return int16;
  }

  private arrayBufferToBase64(buffer: ArrayBuffer | SharedArrayBuffer): string {
    let binary = "";
    const bytes = new Uint8Array(buffer as ArrayBuffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}

export class AudioPlayer {
  private context: AudioContext;
  private sampleRate = 24000; // Gemini Output Rate
  private nextStartTime = 0;

  constructor() {
    this.context = new AudioContext();
  }

  play(base64Data: string) {
    const audioData = this.base64ToArrayBuffer(base64Data);
    const int16Data = new Int16Array(audioData);
    const float32Data = this.int16ToFloat32(int16Data);

    const buffer = this.context.createBuffer(1, float32Data.length, this.sampleRate);
    buffer.getChannelData(0).set(float32Data);

    const source = this.context.createBufferSource();
    source.buffer = buffer;
    source.connect(this.context.destination);

    // Schedule playback
    const currentTime = this.context.currentTime;
    if (this.nextStartTime < currentTime) {
      this.nextStartTime = currentTime;
    }
    source.start(this.nextStartTime);
    this.nextStartTime += buffer.duration;
  }

  stop() {
    if (this.context) {
      this.context.close(); // Or suspend
      this.context = new AudioContext();
      this.nextStartTime = 0;
    }
  }

  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  private int16ToFloat32(int16: Int16Array): Float32Array {
    const float32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) {
      const int = int16[i];
      float32[i] = int >= 0 ? int / 0x7fff : int / 0x8000;
    }
    return float32;
  }
}
