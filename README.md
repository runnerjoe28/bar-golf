# Bar Golf

A full MERN stack application to host a simple bar golf game for your friends. THERE IS NO AUTHENTICATION. PROCEED AT YOUR OWN RISK.

## Setting Up

The application runs off of three distinct services as a three layer web app:

- Frontend React server
- Backend of Node and Express API
- Database of MongoDB

### Frontend React Server

This will be your public facing access (if you want to be public). By default it will run on port 3000. Upon downloading the repository, update the `/node_modules` folder by running the following.

```npm install```

You should only need to run that once. To actually run the app, run the following command.

```npm start```

### Backend Express/Node Server

Create the file `server/.env`. Place the following two fields in there.

| Key | Value|
|-----|------|
| PORT | 4000 |
| MONGO_URI | mongo uri from online |

Upon installation, run the following once to install node modules.

```npm install```

To run the backend application, run the following.

```npm start```

### Mongo

Yeah, follow the Net Ninja MERN stack tutorial to set that up, I ain't writing all that.