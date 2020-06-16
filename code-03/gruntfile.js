const sass = require("sass");
const loadGruntTasks = require("load-grunt-tasks");

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

module.exports = grunt => {
  grunt.initConfig({
    clean: { temp: "temp/**" },
    sass: {
      options: {
        implementation: sass
      },
      main: {
        files: {
          "dist/assets/styles/main.css": "src/assets/styles/main.scss"
        }
      }
    },
    babel: {
      options: {
        presets: ["@babel/preset-env"]
      },
      main: {
        files: {
          "dist/assets/scripts/main.js": "src/assets/scripts/main.js"
        }
      }
    },
    swig: {
      development: {
        init: {
          allowErrors: false,
          autoescape: true
        },
        dest: "dist",
        src: ["src/*.html"],
        test: data
      }
    },
    imagemin: {
      options: {
        optimizationLevel: 3
      },
      main: {
        files: {
          "dist/assets/images/brands.svg": "src/assets/images/brands.svg",
          "dist/assets/images/logo.png": "src/assets/images/logo.png"
        }
      }
    },

    // copy

    // 启动web

    watch: {
      js: {
        files: ["src/assets/scripts/*.js"],
        tasks: ["babel"]
      },
      css: {
        files: ["src/assets/styles/*.scss"],
        tasks: ["sass"]
      }
    },

    // useref
    useref: {
      // specify which files contain the build blocks
      html: "dist/*.html",
      // explicitly specify the temp directory you are working in
      // this is the the base of your links ( "/" )
      temp: "dist"
    }
  });

  loadGruntTasks(grunt);
};
