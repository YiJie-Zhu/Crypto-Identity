import React from "react";
import { useState } from "react";
import Signup from "./signup";
import GoogleVision from "../apps/GoogleVision/app";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import Form from "./Form";

function App() {
  // const [facialEmotionArr, setfacialEmotionArr] = useState([]);
  // const handleFacialEmotion = () => {

  // }
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <div className="container">
            <Route path="/signup" exact component={Signup} />
            <Route path="/faceauth" component={GoogleVision} />
            <PrivateRoute path="/" exact component={Dashboard} />
            <Route path="/login" exact component={Login} />
            <Route path="/forgot-password" exact component={ForgotPassword} />
            <Route path="/form" exact component={Form} />
          </div>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
