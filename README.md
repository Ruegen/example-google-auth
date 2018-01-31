# minimal oAuth & jwt example using Google oauth

Notes:
- you will need to create an app with
[Google Oauth](https://developers.google.com/identity/protocols/OAuth2),
[Google console](https://console.developers.google.com/)
- mongodb to must be running first
- environment variables required
    - PORT
    - GOOGLE_CLIENT_ID 
    - GOOGLE_CLIENT_SECRET
    - JWT_SECRET


## user steps
1. User visits login page and clicks google auth link
2. User is redirected to another route which authenticates with google and saves the accessToken from google to the user
3. If successful user is redirected to designated page of website and given a jwt token
4. As long as the user is authed they can access their google identity via the accessToken