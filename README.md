# static-template
[![Node](https://img.shields.io/badge/Node-%3E%3D8.9.1-brightgreen.svg?style=flat-square)]()
[![Gulp](https://img.shields.io/badge/Gulp%20-%3E%3D3.9.1-blue.svg?style=flat-square)]()
[![Yarn](https://img.shields.io/badge/yarn-%3E%3D1.3.2-ff69b4.svg?style=flat-square)]()


<!-- ![](screenshot.png "") -->

A static template for HTML5, CSS3, JS run with Gulp

<!-- [See the demo](https://oculus-rift.netlify.com/) -->


## How to 🎉

### Installation 📦 
First, do not forget to install [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/en/docs/install). 
After downloaded the repository, install the node_modules with : 

```
yarn install
```

### Running the app 🚀
To run the app, run this command in your terminal :
```
yarn run dev
```
Then browser-sync should start and you should be able to see the app.

### Build it 👷
To build it, run this command in your terminal :
```
yarn run build
```  

## Features 
* BrowserSync : time-saving synchronised browser testing.
* Clean : Delete the dist repo before each build
* Style task : use sass, notify errors, autoprefixer, csscomb and sourcemaps
* Javascript : use browserify, handle errors, minify
* Srcset : create responsive images sizes. This task isn't include in watcher, must be launch by ourselves
* Images : images optimisation for .png, .jpg, .svg & .gif 
* File include : plugin that allows to include HTML file to separate code. 

## Other 🔎 
### Author 👥

[Kelly Phan](http://kellyphan.fr)

### Licence 📄
This repository is under MIT Licence.

