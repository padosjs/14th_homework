import { useState } from 'react';
import './App.css';
import { Link } from 'react-router';

const App = () => {

    return (
        <div>
          메인 페이지입니다!
          <br/>
          <br/>
          <br/>
          작업된 페이지:<br/>
          <Link to="/boardsnew">게시글 등록 페이지</Link><br/>
          <Link to="/boardsdetail">게시글 상세 페이지</Link>
        </div>
    );
}

export default App;