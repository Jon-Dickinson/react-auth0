# React Authentication using Context and Hooks

This template stores user authentication details within a global state.

![screenshot1](https://github.com/Jon-Dickinson/react-auth0/blob/master/src/images/auth-react.jpg)

## Instructions

```bash
yarn install
```

- dotenv  →  used to add local environment variables to the app
- auth0-js  →  the official client-side JavaScript SDK from Auth0

Create a free account with `auth0.com`

![screenshot2](https://github.com/Jon-Dickinson/react-auth0/blob/master/src/images/Auth0-screenshot.jpg)

Create an `.env` file within the project root to store the application keys and add the following:

```bash
REACT_APP_AUTH0_DOMAIN=[DOMAIN]
REACT_APP_AUTH0_CLIENT_ID=[CLIENT ID]
```

Replace `[DOMAIN]` and `[CLIENT ID]` with the details from your `auth0.com` account.

![screenshot3](https://github.com/Jon-Dickinson/react-auth0/blob/master/src/images/logged-out-screenshot.png)

![screenshot4](https://github.com/Jon-Dickinson/react-auth0/blob/master/src/images/logged-in-screenshot.png)

## React systems and processes

Two primary types of state exist within React applications:

-  Local → specific views or components
-  Global → state of the entire application

React has an integrated solution for local state, however, global state hasn't yet received an equal amount of attention.  Context removes the need for prop-drilling, as Higher-Order Components (HOC) allow the retrieval of props from components located deep within a component tree.


