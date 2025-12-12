import { useRef } from "react";

const keyboardSounds = [
  "/sounds/key1.mp3",
  "/sounds/key2.mp3",
  "/sounds/key3.mp3",
];

export default function useKeyboardSound() {
  const audioRefs = useRef([]);

  const playRandomKeyStrokeSound = () => {
    try {
      // If sound files don't exist, fail silently
      const randomSound = keyboardSounds[Math.floor(Math.random() * keyboardSounds.length)];
      const audio = new Audio(randomSound);
      
      // Set volume to a reasonable level
      audio.volume = 0.3;
      
      // Play sound, but don't throw error if file doesn't exist
      audio.play().catch(() => {
        // Silently fail if sound file doesn't exist
      });
      
      // Store reference to prevent garbage collection
      audioRefs.current.push(audio);
      
      // Clean up old audio references (keep last 5)
      if (audioRefs.current.length > 5) {
        audioRefs.current.shift();
      }
    } catch (error) {
      // Silently fail if Audio API is not available or file doesn't exist
      console.debug("Keyboard sound not available");
    }
  };

  return { playRandomKeyStrokeSound };
}
