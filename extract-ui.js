const { execSync } = require('child_process');
const fs = require('fs');

if (!fs.existsSync('temp_ui')) fs.mkdirSync('temp_ui');

try {
  const files = [
    'frontend/src/pages/resident/UserDashboard.jsx',
    'frontend/src/pages/admin/AdminDashboard.jsx',
    'frontend/src/components/Sidebar.jsx',
    'frontend/src/components/Layout.jsx'
  ];
  
  files.forEach(f => {
    try {
      const content = execSync(\`git show 196e506:\${f}\`).toString();
      const filename = f.split('/').pop();
      fs.writeFileSync(\`temp_ui/\${filename}\`, content);
    } catch(e) {
      console.log(\`Error extracting \${f}\`);
    }
  });
  console.log("Extraction complete.");
} catch(e) {
  console.log(e);
}
