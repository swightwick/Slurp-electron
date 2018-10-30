// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {shell} = require('electron')
const { app } = require ('electron').remote;
const electron = require('electron');
const atPath = app.getPath ('desktop');
const { spawn } = require('child_process')
const fs = require('fs')
const sudo = require('sudo-prompt')

const path = require("path");
const os = require('os')
const findup = require('findup-sync');
const currentPath = require('current-path');
const howler = require('howler');
const fileManagerBtn = document.getElementById('open-file-manager')

// gulpfile
const packageMissing = document.getElementById('package-missing');
const packageFound = document.getElementById('package-found');

// buttons
const gulpPackage = document.getElementById('package');
const bannerViewer = document.getElementById('viewer');
const npmInstall = document.getElementById('installs');
const gulpLink = document.getElementById('link');
const gulpSass = document.getElementById('sass');

// Fake terminal
const contentDiv = document.getElementById("logText");
contentDiv.innerHTML = "🍭 Welcome to Slurp! 🍭 Console will output here...";


// currentPath().then(path => {
//   console.log(path);
//   const cwd = document.getElementById('cwd');
//   cwd.value = path;
//   process.chdir(path);
//   console.log(process.chdir);
// });

function alertMsg1() {
  currentPath().then(path => {
    console.log(path);
    const cwd = document.getElementById('cwd');
    cwd.value = path;
    process.chdir(path);
    console.log(process.chdir);
  });
}


// Kepp checking finder every 2 secs
setInterval(alertMsg1, 2000);
console.log('Starting directory: ' + process.cwd());
try {
  process.chdir('/tmp');
  console.log('New directory: ' + process.cwd());
}
catch (err) {
  console.log('chdir: ' + err);
}

// Package checker
setInterval(packCheck, 2000);
function packCheck() {
  var pkg;
  var pkgPath = findup('gulpfile.js');
  if (pkgPath) {
    console.log('%c gulp found.', 'background: #222; color: #23ff16');
    packageFound.style.display = "block";
    packageFound.className = "active";
    packageMissing.style.display = "none";
    gulpPackage.disabled = false;
    bannerViewer.disabled = false;
    npmInstall.disabled = false;
    gulpLink.disabled = false;
    gulpSass.disabled = false;

  } else {
    console.log('%c Couldn\'t find gulp ', 'background: #222; color: #ff0000');
    packageFound.style.display = "none";
    packageMissing.style.display = "block";
    gulpPackage.disabled = true;
    bannerViewer.disabled = true;
    npmInstall.disabled = true;
    gulpLink.disabled = true;
    gulpSass.disabled = true;
    return;
  }
}


// Gulp Package
gulpPackage.addEventListener('click', (event) => {
  const contentDiv = document.getElementById("logText");
    const { exec } = require('child_process');
    contentDiv.innerHTML = "🔥 Packing HEAT";
    var sound = new Howl({
      src: ['slurp.wav']
    });
    exec('gulp package', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
      contentDiv.innerHTML = stdout + "🏆🏆🏆 Packaging Complete 💾";
      sound.play();
    });
})

// Viewer
bannerViewer.onclick = function() {
  require('./iframe');
};


// NPM installs
npmInstall.addEventListener('click', (event) => {
  const contentDiv = document.getElementById("logText");
    contentDiv.innerHTML = "🔥 Installing NPM modules, hold tight...";
    const { exec } = require('child_process');
    exec('sudo npm install gulp node-watch gulp-sass gulp-foreach path run-sequence del gulp-zip gulp-minify-css gulp-uglify', (err, stdout, stderr) => {
      
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
      contentDiv.innerHTML = stdout;
    });
})



// Gulp link
gulpLink.addEventListener('click', (event) => {
  const contentDiv = document.getElementById("logText");
    contentDiv.innerHTML = "🔥 Linking NPM modules, hold tight...";

    var options = {
      name: 'Electron'
    };
    sudo.exec('npm link gulp node-watch gulp-sass gulp-foreach path run-sequence del gulp-zip gulp-minify-css gulp-htmlmin gulp-imagemin gulp-html-replace gulp-concat gulp-rename gulp-uglify gulp-tap event-stream merge-stream gulp-autoprefixer gulp-notify terminal-notifier gulp-util', options,
    function(error, stdout, stderr) {
      if (error) throw error 
      contentDiv.innerHTML = "Something went wrong";
      console.log('stdout: ' + stdout);
      contentDiv.innerHTML = "🔥 Great Success!";
    }
  )

})





//Gulp sass
gulpSass.addEventListener('click', (event) => {
    const { exec } = require('child_process');
    contentDiv.innerHTML = "🔥 Getting SASSY";
    exec('gulp compileSass', (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stdout);
      contentDiv.innerHTML = stdout;
    });
})


document.ondragover = document.ondrop = (ev) => {
  ev.preventDefault()
}

document.body.ondrop = (ev) => {
  const cwd = document.getElementById('cwd')
  cwd.value = ev.dataTransfer.files[0].path;
  // process.cwd = ev.dataTransfer.files[0].path;
  // console.log("__dirname = %s", path.resolve(ev.dataTransfer.files[0].path));
  process.chdir = ev.dataTransfer.files[0].path;
  console.log('New directory: ' + process.chdir);
  ev.preventDefault()
}

const cwd = document.getElementById('cwd')

cwd.value = __dirname;



