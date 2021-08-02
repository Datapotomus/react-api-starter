import './App.css';

//Import router component
import { Switch, Route } from "react-router-dom";

//Import Navigation Component
import Navigation from "./components/navigation/Navigation";

//Import Welcome Component
import Welcome from "./components/welcome/Welcome";

//Import user related components
import UserList from "./components/userList/UserList";
import User from './components/user/User';

//Import post related components
import PostList from './components/postList/PostList';
import Post from './components/post/Post';

//Import NoMath (404) Component
import NoMatch from "./components/noMatch/NoMatch";



function App() {
  return (
    <div className="App">
      {/* Header to display on every page */}
      <header>
        <h1>Welcome to my App</h1>
        <Navigation />
      </header>

      {/* Define Routes to different components based on URL */}

      <Switch>
        <Route
          exact
          path="/"
          component={Welcome}
        />
        <Route
          exact
          path="/users"
          component={UserList}
        />
        <Route
          path="/user/:id"
          component={User}
        />
        <Route
          exact
          path="/posts"
          component={PostList}
        />
        <Route
          path="/post/:id"
          component={Post}
        />
        <Route
          path="*"
          component={NoMatch}
        />
      </Switch>
    </div>
  );
}

export default App;
