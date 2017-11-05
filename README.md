# cards
[https://rdlucas2.github.io/cards/dist/index.html](https://rdlucas2.github.io/cards/dist/index.html)
### Install dependencies:  
```npm install```

### Test
```npm test```
### Preview the release build of the app locally:  
```npm start```  

*you may need to update the start command in package.json:  
```"start": "npm test && npm run build-release && concurrently \"http-server -a localhost -p 1234\" \UPDATE_ME http://localhost:1234/dist/\"",``` 
###### windows: replace UPDATE_ME with start  
###### mac: replace UPDATE_ME with open

### Work Locally
```gulp watch```  

If adding files/directories, update the paths tsconfig.json and gulp watch task in gulpfile.js  

With the watch set up, navigate to file:///PATH_TO_REPO/dev/index.html and begin working