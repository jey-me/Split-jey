const tagColorMap = {};

/**
 * Returns a consistent color for each unique tag.
 * Generates a random HSL color the first time a tag appears.
 * @param {string} tag - The tag label (e.g. "Supermercado 1", "Cena", etc.)
 * @returns {string} HSL color string
 */
export const getColorForTag = (tag) => {
  if (tagColorMap[tag]) return tagColorMap[tag];

  const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
  tagColorMap[tag] = randomColor;
  return randomColor;
};
