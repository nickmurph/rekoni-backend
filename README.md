# Rekoni (backend)
Node/Express backend for a full-stack image recognition service. Rekoni is built around various open-source AI models from  [Clarifai](https://clarifai.com/explore/models). <br><br>
Use the following credentials to demo functionality if you choose not to register an account: 
<br> - email: test (at) rekoni.onrender.com
<br> - pw: test
<br><br>
Note: Rekoni's backend is currently hosted on the free tier of Render, which is not an always-on service. Assuming no activity in the prior 15 minutes, initital login may take a moment as Rekoni spins up the instance hosting the backend. 
<br><br>
[Frontend Repo](https://github.com/nickmurph/rekoni-front-end)

## Features
- Node/Express and PostgreSQL on the backend
- Javascript, React, Tachyons on the frontend
- Account creation and user authentication, passwords hashed using bcrypt and stored with other user data in postgreSQL
- Secure transmission of user credential via POST body
- Clarifai AI - image recognition model integrated via API
- Users can upload a photo and have it analyzed by the AI
- User activity is updated with each upload, stored in database and displayed upon login
- Custom endpoints written on the backend to handle frontend communication with database and the Clarifai API
- Currently, AI analysis of photos is facial recognition - faces are detected and have a box drawn around them
- A future update will add recognition for items (food, apparel, common objects, etc), age-guessing, and celebrity face detection
