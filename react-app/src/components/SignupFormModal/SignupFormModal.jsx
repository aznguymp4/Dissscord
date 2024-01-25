import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return <>
  <div id="modalTitle">Sign Up</div>
  <form onSubmit={handleSubmit} className="accountForm">
    <label htmlFor="email">EMAIL {errors.email && <span>{errors.email}</span>}</label>
    <input
      type="text"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    <label htmlFor="username">USERNAME {errors.username && <span>{errors.username}</span>}</label>
    <input
      type="text"
      name="username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
    />
    <label htmlFor="password">PASSWORD {errors.password && <span>{errors.password}</span>}</label>
    <input
      type="password"
      name="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <label htmlFor="confirmPassword">CONFIRM PASSWORD {errors.confirmPassword && <span>{errors.confirmPassword}</span>}</label>
    <input
      type="password"
      name="confirmPassword"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      required
    />
    <div id="modalFooter">
      <div className="btnText" onClick={closeModal}>Close</div>
      <input type="submit" className="btnBlue" value="Log In" />
      <div id="modalFooterBg"/>
    </div>
  </form>
</>
}

export default SignupFormModal;
