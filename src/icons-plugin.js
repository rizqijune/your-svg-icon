const fs = require('fs');
const path = require('path');

module.exports = function iconPlugin({ addUtilities }, options = {}) {
  const iconsDir = options.iconsDir || path.resolve(__dirname, 'icons'); // Default to './src/icons'
  
  if (!fs.existsSync(iconsDir)) {
    console.warn(`Warning: Icons directory ${iconsDir} does not exist.`);
    return;
  }

  const svgFiles = fs.readdirSync(iconsDir).filter(file => file.endsWith('.svg'));

  const iconUtilities = {};

  svgFiles.forEach(file => {
    const iconName = path.basename(file, '.svg');
    iconUtilities[`.icon-${iconName}`] = {
      backgroundImage: `url('./icons/${file}')`,  // Ensure this path is correct
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      display: 'inline-block',
    };
  });

  addUtilities(iconUtilities, ['responsive', 'hover']);
};
