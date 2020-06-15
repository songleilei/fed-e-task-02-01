const path = require("path");
const mkdirp = require("mkdirp");
const fs = require("fs");

module.exports = function (name) {
  const tmplDir = path.join(__dirname, "../generator");
  const destDir = path.join(process.cwd(), name);

  mkdirp(destDir)
    .then((data) => {
      console.info(`创建 ${name} 成功`);

      fs.readdir(tmplDir, (err, files) => {
        if (err) {
          console.error("Error", `读取模板文件失败`, err);
          return;
        }
        files.forEach((file) => {
          writeTemplateFile(path.join(tmplDir, file), destDir, name);
        });
      });
    })
    .catch((err) => {
      console.error("Error", err);
    });
};

const writeTemplateFile = (tmplpath, destDir, name) => {
  const { template, dir, filename } = require(tmplpath)(name);
  if (dir !== "") {
    mkdirp(path.join(destDir, dir))
      .then((data) => {
        fs.writeFile(
          path.join(destDir, dir, filename),
          template.trim(),
          {
            encoding: "utf-8",
          },
          (err) => {
            if (err) {
              console.error("Error", `创建 ${filename} 失败`, err);
              return;
            }
            console.log(`创建 ${filename} 成功`);
          }
        );
      })
      .catch((err) => {
        console.error("Error", err);
      });
    return;
  }

  fs.writeFile(
    path.join(destDir, dir, filename),
    template.trim(),
    {
      encoding: "utf-8",
    },
    (err) => {
      if (err) {
        console.error("Error", `创建 ${filename} 失败`, err);
        return;
      }
      console.log(`创建 ${filename} 成功`);
    }
  );
};
