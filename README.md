![image](https://user-images.githubusercontent.com/70654324/144891754-9ef98aa9-7e49-485a-8d9d-18d4c09f7443.png)

Creature Factory is a capstone project for BrainStation's Web Development Diploma Program (Fall 2021). It enables users to make a creature by mixing and matching head, body, and leg parts. Users can see their creature published to a gallery page with other creatures, and may download any creature they wish as a .png file. In addition, creatures can recieve upvotes and downvotes.

#### How to run the app locally and online

In order to view the app online, simply visit https://creature-factory.herokuapp.com/.

In order to run the app locally, first download (or clone) the repository from github.

- Next, open the files in VS code, cd into the client directory and type "npm install" into the command line to get node modules.
- cd into the server directory and do the same.
- There should not be any node modules needed from the root directory, so the above step is not necessary there.
- Rename the .env.sample file on the server side to simply .env, and where it says PORT=, add the local address you would like to run the server from (for example, PORT=5000).
- Open the index.js file located in client/src/config, and edit the local host address on line 4 to include your preferred port (for example, "http://localhost:5000/creatures").
- cd into the server directory and type "npm start" in the command line
- cd into the client directory and type "npm start" in the command line
- the app should open on your browser, have fun! \*Please note, this app was developed using chrome as the default browser. Although it should function in most popular modern browsers, if you have trouble with the app in a different browser, open it in chrome.

#### Tech Stack

Creature Factory is a React App with an Express/Node.js server. Additional libraries used include: axios, html2canvas, sass, react router dom 6, cors, dotenv, and uuid. Creature parts are made of code (svg elements) and integrated as React components.

#### Development Process

For the first phase of developing Creature Factory, I focused on achieving baseline functionality - the ability to create a creature and view it in the gallery. I set up my React front end and Express server, my header and page components and routes, get and put endpoints, front end axios calls to those endpoints, and of course, coded some creature parts. I started with some quickly coded temporary parts, and switched them out with 2-3 parts that I really liked for each type of body part. With the baseline functionality complete, I decided that for phase 2 I would like to deploy the app using Heroku, and add some additional functionality.

An outline of my entire deployment process can be found at the end of this document, if you are curious. After deploying, I created put endpoints to upvote and downvote creatures, included likes in my creature objects, and added upvote and downvote calls to the front end. Next, I added a way for users to download their creatures as a png file. I used html2canvas to achieve download functionality, and added a download button to each creature component in the gallery. Lastly, I added a cat head that spins when hovered over to the home page, just for kicks.

After the Web Development program ends, I plan to add additional functionality (TBD) and more creature parts.

#### Pages

Creature Factory is a Single Page Application, but has distinct "pages" implemented using react components and react router. It has a home page, create page, and gallery page, which can be accessed via the nav bar and select buttons within each page.

![image](https://user-images.githubusercontent.com/70654324/144893947-c8c9eba2-fb37-43e8-84d6-e00e9c44219d.png)
_Section of Home Page_

![image](https://user-images.githubusercontent.com/70654324/144894086-eddf8594-1d1f-44c0-8151-73ad308b3d7d.png)
_Section of Create Page_

![image](https://user-images.githubusercontent.com/70654324/144894191-dd4a9cdc-7f70-430b-a2e8-2ec81003f466.png)
_Example of Creature Gallery Page Item_

#### Endpoints

On the Express server side of the application, there are 4 endpoints used to create, get, and update creature data.

###### HTTP GET "/creatures"

Receives a request from the front end (done with axios) and returns an array of creature objects, like so:
```json
[ { id : 12211212,
name: “name”,
head: “cat”,
body: “bear”,
legs: “squid”
likes: 0 },
{ id : 122112333,
name: “brenda”,
head: “goldfish”,
body: “bear”,
legs: “tripod”
likes: 3 } ]
```

###### HTTP POST "/creatures"

Recieves a request from the front end (also done via axios) which includes a request body with name, head, body, and legs data. The backend uses this to make a new creature object, adding a unique id (using uuid library) and initalizes likes with a value of 0. This new creature is appended to the creature array (seen above).

###### HTTP PUT endpoints - /creatures/:id/upvote, /creatures:id/downvote

Receives a request from the front end and uses the id from the request parameters to either increase or decrease the likes of the specified creature by 1.

#### Deployment Process with Heroku

Added scripts to root directory package.json:

- "start": "cd server && node index.js"
- "heroku-postbuild": "npm install --prefix client && npm install --prefix server && npm run build --prefix client"

Added this chunk of code to index.js in server:
```javascript
if (process.env.NODE_ENV === 'production') {
app.use(express.static('../client/build'));
app.get('\*', (req, res) => {
res.sendFile(path.join(\_\_dirname, '../client', 'build', 'index.html'));
});
}
```

- added const path = require("path"); to the top of index.js as well.

Added a config file to client side src folder with an index.js file containing the api url, one for heroku if the app is in production and one for running it locally.

Did the following command line prompts.

- heroku login _then logged in_
- heroku create creature-factory
- git remote -v _just to check heroku remote was there_
- git push heroku main
- heroku apps:open

Then, the app opens in the browser.
