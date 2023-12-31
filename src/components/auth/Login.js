import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { getUserByEmail } from "../../services/userService";

export const Login = () => {
  const [email, set] = useState("jeffrey@example.com");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    return getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];
        localStorage.setItem(
          "dreams_user",
          JSON.stringify({
            id: user.id,
          })
        );

        navigate("/");
      } else {
        window.alert("Invalid login");
      }
    });
  };

  return (
    <main className="auth-container">
      <section>
        <form className="auth-form" onSubmit={handleLogin}>
          <img
            className="img-logo"
            src="https://media.istockphoto.com/id/165621579/vector/offensive-line.jpg?s=612x612&w=0&k=20&c=V0dJCcdtAPhJJY13mU0-U7BygtrHvMeUGfSRO28mHL0="
            alt="logo"
          />
          <h1 className="header">Dream Team Login</h1>
          <fieldset className="auth-fieldset">
            <div>
              <input
                type="email"
                value={email}
                className="auth-form-input"
                onChange={(evt) => set(evt.target.value)}
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset className="auth-fieldset">
            <div>
              <button className="submit" type="submit">
                Sign in
              </button>
            </div>
          </fieldset>
        </form>
      </section>
      {/* <section className="register-link">
        <Link to="/register">Not a member yet?</Link>
      </section> */}
    </main>
  );
};
