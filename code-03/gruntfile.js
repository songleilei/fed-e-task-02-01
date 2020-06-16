const sass = require("sass");
const loadGruntTasks = require("load-grunt-tasks");

const data = {
  menus: [
    {
      name: "Home",
      icon: "aperture",
      link: "index.html",
    },
    {
      name: "Features",
      link: "features.html",
    },
    {
      name: "About",
      link: "about.html",
    },
    {
      name: "Contact",
      link: "#",
      children: [
        {
          name: "Twitter",
          link: "https://twitter.com/",
        },
        {
          name: "About",
          link: "https://weibo.com/",
        },
        {
          name: "divider",
        },
        {
          name: "About",
          link: "https://github.com/",
        },
      ],
    },
  ],
  pkg: require("./package.json"),
  date: new Date(),
};

module.exports = (grunt) => {
  grunt.initConfig({
    clean: { dist: "dist/**" },
    sass: {
      options: {
        implementation: sass,
      },
      main: {
        files: [
          {
            expand: true,
            cwd: "src",
            src: ["assets/styles/*.scss"],
            dest: "dist",
            ext: ".css",
          },
        ],
      },
    },
    babel: {
      options: {
        presets: ["@babel/preset-env"],
      },
      main: {
        files: [
          {
            expand: true,
            cwd: "src",
            src: ["assets/scripts/*.js"],
            dest: "dist",
          },
        ],
      },
    },

    swig: {
      development: {
        src: ["src/*.swig"],
        dest: "dist",
        test: data,
      },
    },

    imagemin: {
      main: {
        files: [
          {
            expand: true,
            cwd: "src/",
            src: ["assets/images/*"],
            dest: "dist/",
          },
          {
            expand: true,
            cwd: "src/",
            src: ["assets/fonts/*"],
            dest: "dist/",
          },
        ],
      },
    },

    copy: {
      main: {
        expand: true,
        cwd: "public",
        src: "**",
        dest: "dist",
      },
    },

    browserSync: {
      bsFiles: {
        src: "src/assets/**",
      },
      options: {
        notify: false,
        watchTask: true,
        files: "dist/**",
        server: {
          baseDir: "dist",
          routes: {
            "/node_modules": "node_modules",
          },
        },
      },
    },

    watch: {
      js: {
        files: ["src/assets/scripts/*.js"],
        tasks: ["babel"],
      },
      css: {
        files: ["src/assets/styles/*.scss"],
        tasks: ["sass"],
      },
    },

    // useref
    // useref: {
    //   // specify which files contain the build blocks
    //   html: "dist/*.html",
    //   // explicitly specify the temp directory you are working in
    //   // this is the the base of your links ( "/" )
    //   temp: "dist",
    // },
  });

  grunt.registerTask("clean", ["clean"]);

  grunt.registerTask("serve", [
    "sass",
    "babel",
    "swig",
    "imagemin",
    "copy",
    "browserSync",
    "watch",
  ]);

  loadGruntTasks(grunt);
};
