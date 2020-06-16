# fed-e-task-02-01

开发脚手架及封装自动化构建工作流

# 简答题

1、谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值。

工程化主要解决的问题是项目的模块化，组件化，自动化，规范化。

> 引用程墨的话，前端工程化实则是以下这些：
>
> 1. 高性能
> 2. 稳定性（reliability）
> 3. 可用性（usability）
> 4. 可维护性（maintainability）
> 5. 可访问性（accesibility）
> 6. ......

带来的价值：

1. 提高效率
2. 降低成本
3. 质量保证

2、你认为脚手架除了为我们创建项目结构，还有什么更深的意义？

提供项目规范和约定

# 编程题

1、概述脚手架实现的过程，并使用 NodeJS 完成一个自定义的小型脚手架工具

#### 实现过程：

- package.json 定义脚手架命令及入口文件

```json
{
  "bin": {
    "songlei": "bin/index.js"
  }
}
```

- bin/index.js 中写处理逻辑

- 使用 commander.js 开发命令行工具

- 创建模板文件，使用 fs.readdir 遍历模板文件夹, fs.writeFile 写入指定文件内容。

#### 实现代码：code-01 文件夹

2、尝试使用 Gulp 完成 [项目](https://github.com/lagoufed/fed-e-code/blob/master/part-02/module-01/作业案例基础代码.zip?raw=true) 的自动化构建

#### 实现代码：code-02 文件夹

3、使用 Grunt 完成 [项目](https://github.com/lagoufed/fed-e-code/blob/master/part-02/module-01/作业案例基础代码.zip?raw=true) 的自动化构建

#### 实现代码：code-03 文件夹 (未实现 build)

2-3 题基础代码下载地址：https://raw.githubusercontent.com/lagoufed/fed-e-001/master/tasks/02-01-base-code.zip
