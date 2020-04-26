import gulp from "gulp"

// Import Tasks files
import buildSass from "./gulp_tasks/styles";

gulp.task("styles:build", buildSass);
