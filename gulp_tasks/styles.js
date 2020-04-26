import gulp from "gulp";
import gulpif from "gulp-if";
import vinylPaths from "vinyl-paths"
import del from "del"
import sass from "gulp-sass";
import postcss from "gulp-postcss";
import sourcemaps from "gulp-sourcemaps";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import mergeMq from "postcss-combine-media-query";

import { options, css } from "../.buildconfig";

// Build Sass task
const buildSass = () => {
  const removeComments = !!options.isProduction;
  const minification = !options.isDevelopment;
  const postcssPlugins = [
    autoprefixer(),
    cssnano({
      preset: [
        "default",
        {
          discardComments: {
            removeAll: removeComments,
          },
          normalizeWhitespace: minification,
          minifyFontValues: { removeQuotes: false },
        },
      ],
    }),
    mergeMq(),
  ];

  return gulp
    .src(`${css.src + css.entry}.${css.extensions}`)
    .pipe(
      gulpif(options.isProduction, vinylPaths(del(`${css.dest}/**/**.css.map`)))
    )
    .pipe(gulpif(options.isDevelopment, sourcemaps.init()))
    .pipe(
      sass({
        includePaths: ["node_modules"],
      }).on("error", sass.logError)
    )
    .pipe(postcss(postcssPlugins))
    .pipe(gulpif(options.isDevelopment, sourcemaps.write(".")))
    .pipe(gulp.dest(css.dest));
};

export default buildSass;
