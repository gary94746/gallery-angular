# GalleryFronted

Simple gallery app with tailwind and NestJs as Backend

The final result looks like:
![Screenshot](https://github.com/gary94746/gallery-angular/blob/master/src/assets/Screenshot_20201012_202342.png)
![screenshot1](https://github.com/gary94746/gallery-angular/blob/master/src/assets/Screenshot_20201012_202504.png)


This app contains:
- Reactive form validation
- Responsive Design
- Image download
- Image size validation
- Http comunication

To run this app local:
``` bash
yarn install
ng serve
```


This app is also avalaible with docker
```bash
# first build the docker image
docker build -t gallery-fronted .
# run the build image
docker run --name gallery-fronted -d -p 80:80 gallery-fronted
```

### Check this proyect online
[NetlifyApp](https://gallant-meitner-416426.netlify.app/)
