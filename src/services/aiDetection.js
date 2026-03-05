// Mock AI Detection Service
// In a production app, use TensorFlow.js or a back-end ML API
export const analyzeGarbageImage = async (imageUri) => {
  console.log("Analyzing image at:", imageUri);
  // Simulating network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // High confidence mock for demo purposes
  const confidence = 0.85; 
  const isGarbage = confidence > 0.70;
  
  return {
    isGarbage,
    confidence,
    label: isGarbage ? 'Garbage Detected' : 'No Garbage Detected'
  };
};
