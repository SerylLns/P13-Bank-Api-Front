import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfil } from "../features/userSlice";
import { setUserProfil } from "../userApi";

const Profil = () => {
  const [editMode, setEditMode] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    setFirstName(user.firstName)
    setLastName(user.lastName)
  }, [user])

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserProfil(firstName, lastName, user.token)
    dispatch(setProfil({ firstName: firstName, lastName: lastName }));
    setEditMode(false);
  };
  return (
    <main className="main bg-dark">
      <div className="header">
        {editMode ? (
          <>
            <h1>Welcome back</h1>
            <form className="form-profil">
              <div className="inputs-profil">
                <input
                  type="text"
                  name="firstName"
                  className="input-profil"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
                <input
                  type="text"
                  name="lastName"
                  className="input-profil"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </div>
              <div className="buttons-profil">
                <button
                  onClick={(e) => handleSubmit(e)}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h1>
              Welcome back
              <br />
              {user.firstName} {user.lastName}!
            </h1>
            <button className="edit-button" onClick={() => setEditMode(true)}>
              Edit Name
            </button>
          </>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default Profil;
