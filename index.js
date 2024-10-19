const plugin = require('tailwindcss/plugin');
const fs = require('fs');
const path = require('path');

const iconPlugin = (options = {}) => {
  return plugin(function ({ addUtilities }) {
    const iconsDir = options.iconsDir || path.resolve(process.cwd(), 'src/icons'); // Default to src/icons

    if (!fs.existsSync(iconsDir)) {
      console.warn(`Warning: Icons directory ${iconsDir} does not exist.`);
      return;
    }

    const svgFiles = fs.readdirSync(iconsDir).filter(file => file.endsWith('.svg'));
    const iconUtilities = {};

    svgFiles.forEach(file => {
      const iconName = path.basename(file, '.svg');
      iconUtilities[`.icon-${iconName}`] = { // Use dot notation for class names
        backgroundImage: `url('${path.join(iconsDir, file)}')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        display: 'inline-block',
      };
    });

    addUtilities(iconUtilities, ['responsive', 'hover']); // Adding the utilities
  });
};

module.exports = iconPlugin;
