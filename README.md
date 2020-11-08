# Gaggle
A Flask + Reactjs  email-like app

This application was done as an example of ReactJS and Flassk integration into a full stack application.
## Development
1. clone the repository
2. navigate to the root dir
3. start virtual environment
4. run `pip install requirements.txt `
5. navigate into 'view' directory.
6. run `npm install`
7. run `yarn build`
7. you will need some exports:
```bash
export APP_SETTINGS="config.DevelopmentConfig"
export FLASK_APP=app.py
export DATABASE_URL="%Your Postgress Database (or any other SQL DBMS URL)%"
```
8. finally, run `flask run` to run the server and serve the client on the localhost:5000 address.
9. If you want you can run the client separatly inside 'view' dir: `npm start`.

## Contributing
If you find a bug, please raise an issue on this github and we'll discuss it.

