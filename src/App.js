import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { useEffect } from "react";
import { auth } from "./firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./redux-store/slices/userSlice";
import Profile from "./pages/Profile";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
