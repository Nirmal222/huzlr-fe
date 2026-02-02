/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export class MediaHandler {
  constructor() {
    this.videoElement = null;
    this.currentStream = null;
    this.isWebcamActive = false;
    this.isScreenActive = false;
    this.frameCapture = null;
    this.frameCallback = null;
    this.usingFrontCamera = true;
  }

  initialize(videoElement) {
    this.videoElement = videoElement;
  }

  async startWebcam(useFrontCamera = true) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 1280,
          height: 720,
          facingMode: useFrontCamera ? "user" : "environment"
        }
      });
      this.handleNewStream(stream);
      this.isWebcamActive = true;
      this.usingFrontCamera = useFrontCamera;
      return true;
    } catch (error) {
      console.error('Error accessing webcam:', error);
      return false;
    }
  }

  async startScreenShare() {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true
      });

      // Create a hidden video element for screen sharing if none exists
      if (!this.videoElement) {
        console.log('📺 Creating video element for screen sharing');
        this.videoElement = document.createElement('video');
        this.videoElement.muted = true;
        this.videoElement.autoplay = true;
        this.videoElement.playsInline = true;
        this.videoElement.style.display = 'none';
        this.videoElement.style.position = 'absolute';
        this.videoElement.style.top = '-9999px';
        this.videoElement.style.left = '-9999px';

        // Add event listeners for debugging
        this.videoElement.addEventListener('loadedmetadata', () => {
          console.log('📺 Video metadata loaded:', {
            width: this.videoElement.videoWidth,
            height: this.videoElement.videoHeight,
            duration: this.videoElement.duration
          });
        });

        this.videoElement.addEventListener('loadeddata', () => {
          console.log('📺 Video data loaded - ready for capture');
        });

        this.videoElement.addEventListener('canplay', () => {
          console.log('📺 Video can play');
        });

        this.videoElement.addEventListener('playing', () => {
          console.log('📺 Video is playing');
        });

        this.videoElement.addEventListener('timeupdate', () => {
          console.log('📺 Video time update:', this.videoElement.currentTime);
        }, { once: true });

        document.body.appendChild(this.videoElement);
        console.log('✅ Hidden video element created and added to DOM');
      }

      this.handleNewStream(stream);
      this.isScreenActive = true;

      // Handle when user stops sharing via browser controls
      stream.getVideoTracks()[0].addEventListener('ended', () => {
        this.stopAll();
      });

      console.log('🎉 Screen sharing started with video element:', {
        hasVideoElement: !!this.videoElement,
        hasStream: !!this.currentStream
      });

      return true;
    } catch (error) {
      console.error('Error sharing screen:', error);
      return false;
    }
  }

  async switchCamera() {
    if (!this.isWebcamActive) return false;
    const newFacingMode = !this.usingFrontCamera;
    await this.stopAll();
    const success = await this.startWebcam(newFacingMode);
    if (success && this.frameCallback) {
      this.startFrameCapture(this.frameCallback);
    }
    return success;
  }

  handleNewStream(stream) {
    if (this.currentStream) {
      this.stopAll();
    }
    this.currentStream = stream;
    if (this.videoElement) {
      console.log('🔄 Setting stream as video source');
      this.videoElement.srcObject = stream;
      this.videoElement.classList.remove('hidden');

      // Ensure video plays for screen sharing
      if (this.isScreenActive || stream.getVideoTracks()[0]?.kind === 'video') {
        console.log('▶️ Starting video playback...');
        this.videoElement.play().catch((error) => {
          console.error('❌ Error playing video:', error);
        });
      }
    }
  }

  stopAll() {
    if (this.currentStream) {
      this.currentStream.getTracks().forEach(track => track.stop());
      this.currentStream = null;
    }
    if (this.videoElement) {
      this.videoElement.srcObject = null;
      // If this is a screen sharing video element (hidden), remove it from DOM
      if (this.isScreenActive && this.videoElement.style.position === 'absolute') {
        console.log('🗑️ Removing hidden screen sharing video element');
        if (document.body.contains(this.videoElement)) {
          document.body.removeChild(this.videoElement);
        }
        this.videoElement = null;
      } else {
        // For webcam, just hide it
        this.videoElement.classList.add('hidden');
      }
    }
    this.isWebcamActive = false;
    this.isScreenActive = false;
    this.stopFrameCapture();
  }

  startFrameCapture(onFrame) {
    console.log('🎬 startFrameCapture called with callback:', !!onFrame);
    this.frameCallback = onFrame;

    // Wait a bit for video to be ready before starting capture
    console.log('⏳ Waiting for video to be ready...');
    setTimeout(() => {
      console.log('⏰ Starting frame capture after delay');
      this.beginActualFrameCapture();
    }, 1000);
  }

  beginActualFrameCapture() {

    const captureFrame = () => {
      console.log('📹 captureFrame function called');
      console.log('📊 Stream and video state:', {
        hasCurrentStream: !!this.currentStream,
        hasVideoElement: !!this.videoElement,
        videoWidth: this.videoElement?.videoWidth,
        videoHeight: this.videoElement?.videoHeight,
        videoReadyState: this.videoElement?.readyState,
        streamActive: this.currentStream?.active,
        videoPaused: this.videoElement?.paused,
        videoEnded: this.videoElement?.ended,
        videoCurrentTime: this.videoElement?.currentTime
      });

      if (!this.currentStream || !this.videoElement) {
        console.warn('❌ Missing stream or video element, skipping frame');
        return;
      }

      // Check if video is ready for capture
      if (this.videoElement.readyState < 2) {
        console.warn('⏳ Video not ready yet, readyState:', this.videoElement.readyState);
        return;
      }

      // Check if video has valid dimensions
      const width = this.videoElement.videoWidth;
      const height = this.videoElement.videoHeight;

      if (!width || !height || width < 1 || height < 1) {
        console.warn('📐 Invalid video dimensions:', { width, height });
        return;
      }

      // Calculate scaled dimensions to fit within 1024x1024 while maintaining aspect ratio
      const MAX_SIZE = 1024;
      let scaledWidth = width;
      let scaledHeight = height;

      if (width > MAX_SIZE || height > MAX_SIZE) {
        if (width > height) {
          scaledWidth = MAX_SIZE;
          scaledHeight = Math.round((height * MAX_SIZE) / width);
        } else {
          scaledHeight = MAX_SIZE;
          scaledWidth = Math.round((width * MAX_SIZE) / height);
        }
      }

      // Ensure video is playing
      if (this.videoElement.paused) {
        console.log('▶️ Video is paused, trying to play...');
        this.videoElement.play().catch(console.error);
        return;
      }

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = scaledWidth;
      canvas.height = scaledHeight;

      console.log('🎨 Canvas created:', { width: canvas.width, height: canvas.height });

      // Fill with a test color first to see if canvas works
      context.fillStyle = 'red';
      context.fillRect(0, 0, 50, 50);

      // Draw the video
      context.drawImage(this.videoElement, 0, 0, canvas.width, canvas.height);
      console.log(123456765432, " frame captured")
      // Convert to JPEG and base64 encode
      const base64Image = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
      // Create download link for the captured frame
      // const blob = new Blob([Uint8Array.from(atob(base64Image), c => c.charCodeAt(0))], { type: 'image/jpeg' });
      // const url = URL.createObjectURL(blob);
      // const fileName = `screencap_${Date.now()}.jpg`;

      // const a = document.createElement('a');
      // a.href = url;
      // a.download = fileName;
      // a.click();
      // URL.revokeObjectURL(url);
      this.frameCallback(base64Image);
    };

    // Capture frames at 1fps
    console.log('⏰ Setting up interval for frame capture');
    this.frameCapture = setInterval(captureFrame, 1000);
    console.log('✅ Interval created with ID:', this.frameCapture);
  }

  stopFrameCapture() {
    if (this.frameCapture) {
      clearInterval(this.frameCapture);
      this.frameCapture = null;
    }
  }
} 