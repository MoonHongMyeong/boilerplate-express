import axios from 'axios'
import React, { useEffect } from 'react'
import { withRouter } from 'react-router';

function LandingPage(props) {

  useEffect(() => {
    axios.get('/api/hello')
  }, [])

  const onClickHandler = () => {
    axios.get('/api/user/logout')
      .then(response => {
        if (response.data.success) {
          props.history.push('/login')
        } else {
          alert('이미 로그아웃 된 상태입니다.')
        }
      })
  }

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh',
    }}>
      <h2>시작 페이지</h2>
      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  )
}

export default withRouter(LandingPage)
