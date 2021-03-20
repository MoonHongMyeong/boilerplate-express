import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
function RegisterPage(props) {

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onChangeValue = (event) => {
    switch (event.currentTarget.id) {
      case "name":
        setName(event.currentTarget.value);
        break;
      case "email":
        setEmail(event.currentTarget.value);
        break;
      case "password":
        setPassword(event.currentTarget.value);
        break;
      case "confirmPassword":
        setConfirmPassword(event.currentTarget.value);
        break;
      default:
        break;
    }
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }
    let body = {
      name,
      email,
      password
    }

    dispatch(registerUser(body))
      .then(response => {
        if (response.payload.success) {
          props.history.push('/login')
        } else {
          alert('failed to sign up')
        }
      })
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh',
    }}>
      <form style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}>
        <label>name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={onChangeValue}
        />
        <label>email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={onChangeValue}
        />
        <label>password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={onChangeValue}
          autoComplete="new-password"
        />
        <label>confirm password</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={onChangeValue}
          autoComplete="new-password"
        />
        <br />
        <button type="submit">회원가입</button>
      </form>
    </div>
  )
}

export default withRouter(RegisterPage)
