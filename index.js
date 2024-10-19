const plugin = require('tailwindcss/plugin');
const fs = require('fs');
const path = require('path');

const iconPlugin = (options = {}) => {
  const iconsDir = options.iconsDir || path.resolve(process.cwd(), 'src/icons'); // Default to src/icons
  const assetsDir = options.assetsDir || path.resolve(process.cwd(), 'assets/icons'); // Ensure it's pointing to the icons folder in assets

  return plugin(function ({ addUtilities }) {
    if (!fs.existsSync(iconsDir)) {
      console.warn(`Warning: Icons directory ${iconsDir} does not exist.`);
      return;
    }

    const svgFiles = fs.readdirSync(iconsDir).filter(file => file.endsWith('.svg'));
    const iconUtilities = {};

    svgFiles.forEach(file => {
      const iconName = path.basename(file, '.svg');
      const targetPath = path.join(assetsDir, file);

      // Move the SVG to the assets directory if it doesn't already exist there
      if (!fs.existsSync(targetPath)) {
        fs.copyFileSync(path.join(iconsDir, file), targetPath);
        console.log(`Moved ${file} to ${assetsDir}`);
      }

      // Generate utility class with a relative URL
      iconUtilities[`.icon-${iconName}`] = {
        backgroundImage: `url('/assets/icons/${file}')`, // Set relative URL
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        display: 'inline-block',
      };
    });

    addUtilities(iconUtilities, ['responsive', 'hover']); // Adding the utilities
  });
};

module.exports = iconPlugin;
