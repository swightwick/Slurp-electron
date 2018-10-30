# Slurp v1

A UI for executing Gulp commands. In house tool for Gravity London.

Features available

- `NPM install` - Globally install required NPM packages with one click.
- `NPM Link` - Link required NPM packages to RAID project directory.
- `Compile Sass` - Complile SASS for all projects in current folder.
- `Sass` - Complile SASS for all projects in current folder.
- `Package` - Run package Gulp task for production.
- `Viewer` - Run custom node page viewer script.

Methods

- Current working directory is retreived from whatever folder is focused in finder
- Slurp is constantly checking for a gulpfile in your current directory. Gulp buttons are disabled until gulpfile is found.
- Terminal output is logged to fake terminal screen on the app.
- Viewer script scans the 'src' directory, creates a .json containing foldernames, then a local server is started and all banners in the 'src' directory are displayed via iframes and styled using flexbox - requires coping 'viewpage' directory to current project.


