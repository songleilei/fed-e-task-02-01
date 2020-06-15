module.exports = function (name) {
  const template = `
import React from "react";

const App = () => {
  return <div>ReactApp</div>;
};
  
export default App;
  `;

  return { template, dir: "src", filename: "App.js" };
};
