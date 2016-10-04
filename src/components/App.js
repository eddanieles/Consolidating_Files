import React from 'react';
import ChatContainer from '../containers/ChatContainer';
import Login from './Login';

const App = (props) => {
  let visibleComponent;
  if(props.currentUser) {
    visibleComponent = <ChatContainer />
  } else if(props.children) {
    visibleComponent = React.cloneElement(props.children, { setCurrentUser: props.setCurrentUser})
  } else {
    visibleComponent = <Login setCurrentUser={props.setCurrentUser} />
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 col-md-offset-3">
          <div className="col-sm-12">
            <h3 className="text-center">Re-base Chat App</h3>
            {visibleComponent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
