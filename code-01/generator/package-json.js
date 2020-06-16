module.exports = function (name) {
  const template = `
{
  "name": ${name},
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {},
  "devDependencies": {},
  "author": "",
  "license": "ISC",
  "dependencies": {
    "react": "^16.12.0",
    "react-dom": "^16.12.0"
  }
}
  `;
  return { template, dir: "", filename: "package.json" };
};
