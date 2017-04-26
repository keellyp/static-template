# static-template
A static template for HTML5, CSS3, JS run with Gulp


## Prerequisites
You need to install [Node.js](https://nodejs.org/en/)


### Install
Download the repository then go to the folder builder in your terminal.

```
cd .../static-template/builder
```

Once you are in there, you have to install node-modules

```
npm install
```
*You may need to install with sudo if you are a macOS user*



## Compatibily
* Gulp.js
* Javascript
* HTML5 / CSS3


## Features
* BrowserSync
* Sourcemaps
* Watchers
* Notifications


### Tasks
* "style" allows to compile the SASS into CSS, autoprefix it, minified and replace into the dist folder.
* "javascript" concatenates all the javascript files into one, minified it and replace into the dist folder
* "images" minifies all the images and place it on dist folder.
* "fonts" moves all the fonts into dist folder
* "watch" watches the changes in your files


## Author
[Kelly Phan](http://kellyphan.fr)


## Licence
This repository is under MIT Licence.
