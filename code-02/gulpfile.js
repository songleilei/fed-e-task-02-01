const del = require("del");
const { src, dest, series, parallel, watch } = require("gulp");

const gulpLoadPlugins = require("gulp-load-plugins");
const plugins = gulpLoadPlugins();

const browsersync = require("browser-sync");
const bs = browsersync.create();

const data = {
  menus: [
    {
      name: "Home",
      icon: "aperture",
      link: "index.html"
    },
    {
      name: "Features",
      link: "features.html"
    },
    {
      name: "About",
      link: "about.html"
    },
    {
      name: "Contact",
      link: "#",
      children: [
        {
          name: "Twitter",
          link: "https://twitter.com/"
        },
        {
          name: "About",
          link: "https://weibo.com/"
        },
        {
          name: "divider"
        },
        {
          name: "About",
          link: "https://github.com/"
        }
      ]
    }
  ],
  pkg: require("./package.json"),
  date: new Date()
};

function clean() {
  return del(["dist", "temp"]);
}

function css() {
  return src("src/assets/styles/*.scss", { base: "src" })
    .pipe(plugins.sass({ outputStyle: "expanded" }))
    .pipe(dest("temp"))
    .pipe(bs.reload({ stream: true }));
}

function javascript() {
  return src("src/assets/scripts/*.js", { base: "src" })
    .pipe(plugins.babel({ presets: ["@babel/preset-env"] }))
    .pipe(dest("temp"))
    .pipe(bs.reload({ stream: true }));
}

function html() {
  return src("src/*.html")
    .pipe(plugins.swig({ data }))
    .pipe(dest("temp"))
    .pipe(bs.reload({ stream: true }));
}

function image() {
  return src("src/assets/images/**", { base: "src" })
    .pipe(plugins.imagemin())
    .pipe(dest("dist"));
}

function font() {
  return src("src/assets/fonts/**", { base: "src" })
    .pipe(plugins.imagemin())
    .pipe(dest("dist"));
}

function public() {
  return src("public/**", { base: "public" }).pipe(dest("dist"));
}

function web() {
  watch("src/assets/styles/*.scss", css);
  watch("src/assets/scripts/*.js", javascript);
  watch("src/*.html", html);

  watch(
    ["src/assets/images/**", "src/assets/fonts/**", "public/**"],
    bs.resload
  );

  bs.init({
    notify: false,
    port: 2020,
    server: {
      baseDir: ["temp", "src", "public"],
      routes: {
        "/node_modules": "node_modules"
      }
    }
  });
}

function useref() {
  return src("temp/*.html", { base: "temp" })
    .pipe(plugins.useref({ searchPath: ["temp", "."] }))
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(
      plugins.if(
        /\.html$/,
        plugins.htmlmin({
          collapseWhitespace: true,
          minifyCSS: true,
          minfiyJS: true
        })
      )
    )
    .pipe(dest("dist"));
}

const compile = parallel(css, javascript, html);

const serve = series(compile, web);

const build = series(clean, parallel(series(compile, useref), font, public));

module.exports = {
  clean,
  serve,
  build
};
