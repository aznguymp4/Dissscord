import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
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
    <div id="modalTitle">Log In</div>
    <form onSubmit={handleSubmit} className="accountForm">
      <label htmlFor="email">EMAIL {errors.email && <span>{errors.email}</span>}</label>
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
      <div id="modalFooter">
        <div className="btnText" onClick={closeModal}>Close</div>
        <div id="modalLoginDemo">
          <div className="btn btnBlue" onClick={() => {dispatch(thunkLogin({email: 'demo@aa.io', password: 'password'})); closeModal()}}>Demo User 1</div>
          <div className="btn btnBlue" onClick={() => {dispatch(thunkLogin({email: 'bobbie@aa.io', password: 'password'})); closeModal()}}>Demo User 2</div>
        </div>
        <input type="submit" className="btnBlue" value="Log In" />
        <div id="modalFooterBg"/>
      </div>
    </form>
  </>
}

export default LoginFormModal;
