export function calculateReadingTime(text) {
  const wordsPerMinute = 238; // Average reading speed according to https://scholarwithin.com/average-reading-speed?srsltid=AfmBOoquiqRRhHdTlX_kOdXzvIlFv7yD-W1-sE8h3pQkbRRIaQPOCW37
  const words = text.trim().split(/\s+/).length;
  const readingTimeInMinutes = Math.ceil(words / wordsPerMinute);
  return `${readingTimeInMinutes} min read`;
}
