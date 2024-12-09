function generateRandNum(min = 0, max) {
  // If only one argument is provided, treat it as `max`
  if (arguments.length === 1) {
    max = min;
    min = 0;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { generateRandNum };
