#!/usr/bin/env node

const { Command, command } = require("commander");
const program = new Command();

const { version } = require("../package.json");

program.version(version, "-v, --version");

program
  .command("create <app-name>")
  .description("使用 songlei 创建一个新的项目")
  .action((dir, cmdObj) => {
    const create = require("../create/index");
    create(dir);
  });

program.parse(process.argv);

// 优化项
// 1. inquirer
// 2. download-git-repo 模板与脚手架分离
// 3. ora 显示spinner https://github.com/sindresorhus/ora
// 4. chalk 终端输出彩色化 https://github.com/chalk/chalk#readme
// 5. progress 渲染 ACSII 进度条 https://github.com/visionmedia/node-progress#readme
// 6. metalsmith 模板渲染
