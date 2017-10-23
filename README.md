# static-template
A static template for HTML5, CSS3, JS run with Gulp


## Prerequisites
You need to install [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/lang/en/#)


### Install
Download the repository then go to the folder builder in your terminal.

```
cd .../static-template/builder
```

Once you are in there, you have to install node-modules

```
yarn install
```
*You may need to install with sudo if you are a macOS user*


## Compatibily
* Gulp 3.9
* Javascript ES6
* HTML5 / CSS3

## Features
* BrowserSync
* Sourcemaps
* Watchers
* Notifications
* File include

### Tasks
* "style" allows to compile the SASS into CSS, autoprefix it, minified and replace into the dist folder.
* "javascript" concatenates all the javascript files into one, minified it and replace into the dist folder
* "images" minifies all the images and place it on dist folder.
* "fonts" moves all the fonts into dist folder
* "fileinclude" allows to have @@include into HTML files.
* "watch" watches the changes in your files
* "serve" create a localhost and watch the changes in the HTML and SCSS files
* "js-watch" ensure that "javascript" task is already finish before loading browser


## Author
[Kelly Phan](http://kellyphan.fr)


## Licence
This repository is under MIT Licence.
