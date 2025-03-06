
#!/usr/bin/env node
const { execSync } = require('child_process');

// Execute husky install
console.log('Setting up husky...');
execSync('npx husky install', { stdio: 'inherit' });

// Make pre-commit hook executable
console.log('Making husky hooks executable...');
execSync('chmod +x .husky/pre-commit', { stdio: 'inherit' });
execSync('chmod +x .husky/commit-msg', { stdio: 'inherit' });

console.log('Husky setup complete!');
