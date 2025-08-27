import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="page-container">
      <div className='검색컨테이너'>
        <img src='/search.png' className='프로필아이콘' />
      </div>
      <div className='탑메뉴'>
        <h1 className="page-title">마이</h1>
        <div className='프로필컨테이너'>
          <img src='/profileimage.png' className='프로필이미지' />
          <div className='프로필텍스트'>임정아</div>
          <img src='/rightarrow.png' className='프로필아이콘' />
        </div>
      </div>
      <div className='boards-detail-profile-date'>
        <div className='메뉴헤더기본'>공지사항</div>
        <div className='메뉴헤더기본'>이벤트</div>
        <div className='메뉴헤더활성화'>FAQ</div>
        <div className='메뉴헤더기본'>Q&A</div>
      </div>
      <div className="divider"></div>
      <div className='확장영역'>
        <div className='detail-container'>
          <div className='질문컨테이너'>
            <div className='질문순서'>Q.01</div>
            <div className='질문내용'>리뷰 작성은 어떻게 하나요?</div>
          </div>
          <img src='/downarrow.png' className='질문아이콘' />
        </div>
        <div className='detail-container'>
          <div className='질문컨테이너'>
            <div className='질문순서'>Q.02</div>
            <div className='질문내용'>리뷰 수정/삭제는 어떻게 하나요?</div>
          </div>
          <img src='/downarrow.png' className='질문아이콘' />
        </div>
        <div className='detail-container'>
          <div className='질문컨테이너'>
            <div className='질문순서'>Q.03</div>
            <div className='질문내용'>아이디/비밀번호를 잊어버렸어요</div>
          </div>
          <img src='/downarrow.png' className='질문아이콘' />
        </div> <div className='detail-container'>
          <div className='질문컨테이너'>
            <div className='질문순서'>Q.04</div>
            <div className='질문내용'>회원탈퇴를 하고싶어요.</div>
          </div>
          <img src='/downarrow.png' className='질문아이콘' />
        </div> <div className='detail-container'>
          <div className='질문컨테이너'>
            <div className='질문순서'>Q.05</div>
            <div className='질문내용'>출발지 설정은 어떻게 하나요?</div>
          </div>
          <img src='/downarrow.png' className='질문아이콘' />
        </div> <div className='detail-container'>
          <div className='질문컨테이너'>
            <div className='질문순서'>Q.06</div>
            <div className='질문내용'>비밀번호를 변경하고 싶어요</div>
          </div>
          <img src='/downarrow.png' className='질문아이콘' />
        </div>
      </div>

      <div className='탭바'>
        <div className='탭바버튼'><img src='/home.png' className='탭바아이콘' />홈</div>
        <div className='탭바버튼'><img src='/location.png' className='탭바아이콘' />잇츠로드</div>
        <div className='탭바버튼'><img src='/heart.png' className='탭바아이콘' />마이찜</div>
        <div className='탭바버튼활성화'><img src='/person.png' className='탭바아이콘' />마이</div>
      </div>
    </div>


  );
}

export default App;
