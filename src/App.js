import Footer from "./components/Footer";
import Home from "./components/Home";
import Navigation from "./components/Navigation";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import { useEffect } from "react";
import localforage from "localforage";
import { useDispatch } from "react-redux";
import { setUser } from "./features/userSlice";
import Profil from "./components/Profil";
import { getUserProfile } from "./userApi";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    localforage.getItem("token").then((token) => {
      if (token) {
        getUserProfile(token).then(({ email, firstName, lastName }) => {
          dispatch(setUser({ email, firstName, lastName, token }));
        });
      }
    });
  }, [dispatch]);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
