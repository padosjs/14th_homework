import { useState } from 'react';
import './App.css';
import 인풋필드 from './input.js';
import 버튼 from './button.js';

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [emailErrorMessage, setEmailErrorMessage] = useState("이메일 주소를 다시 확인해주세요.");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("8-16자의 영문, 숫자, 특수 문자만 사용 가능합니다.");

  const onChangeEmail = (event) => { setEmail(event.target.value); };
  const onChangePassword = (event) => { setPassword(event.target.value); };

  const onClickSignup = (event) => {

    setEmailError(false);
    setPasswordError(false);
    setEmailErrorMessage("이메일 주소를 다시 확인해주세요.");
    setPasswordErrorMessage("8-16자의 영문, 숫자, 특수 문자만 사용 가능합니다.");

    let isValid = true;

    if (email === "") {
      setEmailError(true);
      setEmailErrorMessage("이메일 주소를 입력해주세요.");
      isValid = false;
    }

    if (password === "") {
      setPasswordError(true);
      setPasswordErrorMessage("비밀번호를 입력해주세요.");
      isValid = false;
    }

    if (email !== "" && !email.includes("@")) {
      setEmailError(true);
      setEmailErrorMessage("이메일 주소에 @가 포함되어야 합니다.");
      isValid = false;
    }

    if (password !== "" && password.length <= 8) {
      setPasswordError(true);
      setPasswordErrorMessage("비밀번호는 9자리 이상이어야 합니다.");
      isValid = false;
    }

    if (!isValid) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      alert("로그인 성공!");
    }
  };

  return (
    <div className="main-content">
      <div className="page-container">
        <div className='title-container'>
          <img src="/pin.png" alt="Pin icon" className="title-icon" />
          <h1 className="page-title">잇츠로드</h1>
        </div>
        <div className="인풋과버튼컨테이너">
          <인풋필드
            플레이스홀더텍스트="이메일 주소를 입력해주세요."
            onChange={onChangeEmail}
            value={email}
            hasError={emailError}
            errorMessage={emailErrorMessage}
          />
          <인풋필드
            플레이스홀더텍스트="비밀번호를 입력해주세요."
            onChange={onChangePassword}
            value={password}
            hasError={passwordError}
            errorMessage={passwordErrorMessage}
            type="password"
          />
          <버튼 className="red-button" text="로그인" onClick={onClickSignup} />
          <div className="button-group">
            <버튼 className="white-button" text="이메일 찾기" />
            <div className="input-divider"></div>
            <버튼 className="white-button" text="비밀번호 찾기" />
            <div className="input-divider"></div>
            <버튼 className="white-button" text="회원가입" />
          </div>
          <div className="yellow-button" ><img src="/kakao.png" alt="Pin icon" className="button-icon" />카카오톡으로 로그인</div>
        </div>
      </div>
    </div>
  );
}

export default App;