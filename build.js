const fs = require('fs')
const fse = require('fs-extra')

// Delete TypeScript build file
fs.rmSync('./build/tsconfig.tsbuildinfo')

// Load package.json
const pkgContent = fs.readFileSync('./package.json', { encoding: 'utf-8' })
const pkg = JSON.parse(pkgContent)

// Delete unwanted properties
delete pkg.directories
delete pkg.scripts
delete pkg.devDependencies

// Write the new package.json file
fs.writeFileSync('./build/package.json', JSON.stringify(pkg, null, 4))

// Copy README.md file
fs.copyFileSync('./README.md', './build/README.md')
