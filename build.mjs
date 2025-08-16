import gulp from 'gulp';
import { build } from './gulpfile.mjs';

await gulp.series(build)();