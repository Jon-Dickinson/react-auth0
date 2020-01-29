import React from 'react';
import Auth from './Auth';

const auth = new Auth();
const MeetupContext = React.createContext();
const UserContext = React.createContext();

const initialState = {
  meetup: {
    title: 'Online Meetup',
    date: Date(),
    attendees: ['Carlos Mendez', 'Samuel Peterson', 'Victor Mccann', 'Elmer Reid']
  },
  user: {
    name: 'Walter'
  }
};

const reducer = (state, action) => {
  switch (action.type) {

    case 'subscribeUser':
      return {
        ...state,
        attendees: [...state.attendees, action.payload],
        subscribed: true
      };

    case 'unSubscribeUser':
      return {
        ...state,
        attendees: state.attendees.filter(
          attendee => attendee !== action.payload
        ),
        subscribed: false
      };

    case 'loginUser':
      return {
        ...state,
        isAuthenticated: action.payload.authenticated,
        name: action.payload.user.name
      };

    default:
      return state;
  }
};

const UserContextProvider = props => {
  const [state, dispatch] = React.useReducer(reducer, initialState.user);
  auth.handleAuthentication().then(() => {
    dispatch({
      type: 'loginUser',
      payload: {
        authenticated: true,
        user: auth.getProfile()
      }
    });
  });

  return (
    <UserContext.Provider
      value={{
        ...state,
        handleLogin: auth.signIn
      }}
    >
      {props.children}
    </UserContext.Provider>
  );

};

const MeetupContextProvider = ({ user, ...props }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState.meetup);
  return (
    <MeetupContext.Provider
      value={{
        ...state,
        handleSubscribe: () =>
          dispatch({ type: 'subscribeUser', payload: user.name }),
        handleUnSubscribe: () =>
          dispatch({ type: 'unSubscribeUser', payload: user.name })
      }}
    >
      {props.children}
    </MeetupContext.Provider>
  );
};

const App = () => (
  <UserContextProvider>
    <UserContext.Consumer>
      {user => (
        <>
          <div className="vertical-inline-flex bg-651fff pad-tb-20">
            <div className="flex__mid-container align--center justify--space-between max-w-768">
                <p className="font-family--roboto-mono color--ffffff">
                  User authentication
                </p>
                {user.isAuthenticated ? (
                  <span className="bg-76ff03 pad-all-20 border-radius--circle"> </span>
                ) : (
                  <span className="bg-ff1744 pad-all-20 border-radius--circle"> </span>
                )}
            </div>
          </div>
          <MeetupContextProvider user={user}>
            <MeetupContext.Consumer>
              {meetup => (
                <div className="vertical-inline-flex pad-tb-20">
                  <div className="flex__mid-container direction--column max-w-768 pad-tb-20">
                    <div className="cssr-card bg-455a64">
                      <h2 className="margin-t-0 font-w--300 color--ffffff">{meetup.title}</h2>
                      <span className="color--ffffff">{meetup.date}</span>
                    </div>
                    <div className="vertical-inline-flex">
                      {meetup.attendees.map(attendant => (
                        <li className="cssr-card" key={attendant}>{attendant}</li>
                      ))}

                      <div className="horizontal-inline-flex justify--flex-end margin-tb-20">
                        {user.isAuthenticated ? (
                          !meetup.subscribed ? (
                            <button className="button-solid color--ffffff" onClick={meetup.handleSubscribe}>
                              Subscribe
                            </button>
                          ) : (
                            <button className="button-solid color--ffffff" onClick={meetup.handleUnSubscribe}>
                              Unsubscribe
                            </button>
                          )
                        ) : (
                          <button className="button-solid color--ffffff" onClick={user.handleLogin}>
                            Login
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </MeetupContext.Consumer>
          </MeetupContextProvider>
        </>
      )}
    </UserContext.Consumer>
  </UserContextProvider>
);

export default App;
