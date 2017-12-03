# Front-end checklist

This is a to-do-list for front-end project inspired by [David Dias](https://github.com/thedaviddias/Front-End-Checklist) checklist and from [Immersive Garden](https://github.com/immersive-garden/guidelines) guidelines.

### Optimisations

##### Contents

- [ ] No `lorem ipsum`
- [ ] No useless `console.log()`
- [ ] Assets rights
- [ ] 404 page

##### User accessibility

- [ ] UTF8 `<meta charset="utf-8">`
- [ ] Viewport `<meta name="viewport" content="width=device-width, initial-scale=1">`
- [ ] Form navigation using keyboard
- [ ] Form clickable labels
- [ ] Printable

##### Validations

- [ ] [HTML validation](https://validator.w3.org/)
- [ ] [CSS validation](https://jigsaw.w3.org/css-validator/)
- [ ] Google speed reasonable score ([pagespeed](https://developers.google.com/speed/pagespeed/insights/) and [mobilespeed](https://testmysite.withgoogle.com/intl/en-gb))
- [ ] Checked on every recent devices, browsers and OS

##### Dependencies

- [ ] Every unused dependency removed `yarn install`
- [ ] Every dependency up to date `yarn upgrade`

##### Compressions

- [ ] JS compressed, loaded asynchronously
- [ ] CSS compressed
- [ ] HTML compressed
- [ ] Images compressed, resized
- [ ] Used sprite if needed

### SEO / Social / Analysis

- [ ] Title
- [ ] Description
- [ ] Favicon
- [ ] Author
- [ ] Images alt attribute `<img alt='' src=''>`
- [ ] Link title attribute `<a title='' href=''></a>`
- [ ] SEO friendly tags
- [ ] Robot.txt
- [ ] Sitemap

# Server checklist

- [ ] SSL (HTTPS)
- [ ] HTTPS redirection
- [ ] Gzip
- [ ] CDN
- [ ] `www` redirection

### Security

- [ ] Secured against cross-site scripting
- [ ] Secured against SQL injections
- [ ] Secured fake entries
- [ ] Back office accessible with strong password

### Coding

- [ ] Versionned without dependencies
- [ ] Readme 
- [ ] Comments 
- [ ] Linter