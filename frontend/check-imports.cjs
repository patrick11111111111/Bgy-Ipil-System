const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.js') || file.endsWith('.jsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(srcDir);
let foundError = false;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const importRegex = /import\s+.*?\s+from\s+['"]([^'"]+)['"]/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    if (importPath.startsWith('.')) {
      // It's a relative import
      const dir = path.dirname(file);
      let resolvedPath = path.join(dir, importPath);
      
      // Try to find the actual file
      let exists = false;
      let extensions = ['', '.js', '.jsx', '/index.js', '/index.jsx'];
      
      for (const ext of extensions) {
        if (fs.existsSync(resolvedPath + ext)) {
          exists = true;
          
          // Check case sensitivity by looking at readdirSync
          const dirname = path.dirname(resolvedPath + ext);
          const basename = path.basename(resolvedPath + ext);
          if (fs.existsSync(dirname)) {
              const actualFiles = fs.readdirSync(dirname);
              if (!actualFiles.includes(basename)) {
                  console.error(`Case sensitivity error in ${file}: imported '${importPath}' but actual file is differently cased.`);
                  foundError = true;
              }
          }
          break;
        }
      }
      if (!exists) {
        console.error(`Missing import in ${file}: '${importPath}'`);
        foundError = true;
      }
    }
  }
});

if (!foundError) {
  console.log("No import case sensitivity or missing file errors found.");
}
