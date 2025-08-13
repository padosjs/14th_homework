
// 페이지 로드 시 실행될 함수
document.addEventListener("DOMContentLoaded", function () {



    // 자주 쓰이는 변수 모음
    // 로컬 스토리지에서 일기 데이터를 가져오거나, 없으면 빈 배열로 초기화합니다.
    const 일기목록 = JSON.parse(localStorage.getItem("민지의일기목록") ?? "[]");
    const 카드목록 = document.querySelector(".카드목록");
    const 기분필터 = document.querySelector("#기분필터드롭다운");




    // 일기 목록 로컬스토리지에서 가져와서 표시
    // 필터 값에 따라 일기 목록을 필터링하고 화면에 그립니다.
    const 렌더일기목록 = (필터값 = "전체") => {
        // '전체'가 아니면 해당 기분으로 필터링합니다.
        const 필터된목록 = 필터값 === "전체"
            ? 일기목록
            : 일기목록.filter(diary => diary.기분 === 필터값);
        // 필터링된 목록을 순회하며 HTML 카드 문자열을 생성합니다.
        const 카드HTML배열 = 필터된목록.map(diary => {
            const 기분 = diary.기분;
            const 썸네일클래스 = `${기분}카드썸네일`;
            const 텍스트색상클래스 = `${기분}텍스트색상`;
            // 일기 상세 페이지로 이동하는 링크를 포함한 카드 HTML 템플릿입니다.
            return `
                    <div class="카드" onclick="location.href='detail.html?id=${diary.고유아이디}'">
                    <img src="./assets/icons/close-icon.svg" class="카드삭제버튼" onclick="event.stopPropagation(); deleteDiary('${diary.고유아이디}')">
                    <div class="${썸네일클래스}"></div>
                    <div class="카드텍스트컨테이너">
                    <div class="기분과날짜">
                        <span class="${텍스트색상클래스}">${기분}</span>
                        <span class="날짜">${diary.날짜}</span>
                    </div>
                    <div class="타이틀">
                        ${diary.제목}
                    </div>
                    </div>
                    </div>
                    `;
        });
        // 생성된 모든 카드 HTML을 한 번에 컨테이너에 삽입합니다.
        카드목록.innerHTML = 카드HTML배열.join('');
    };
    // 페이지가 처음 로드될 때 전체 일기 목록을 렌더링합니다.
    렌더일기목록();





    // 일기 삭제 기능 (index.html에서 사용)
    window.deleteDiary = (고유아이디) => {
        // 삭제할 일기를 제외한 새로운 배열을 만듭니다.
        // filter()는 주어진 조건(id가 일치하지 않는)을 만족하는 요소들로 새 배열을 반환합니다.
        const 업데이트된목록 = 일기목록.filter(diary => diary.고유아이디 != 고유아이디);
        // 변경된 목록을 로컬 스토리지에 다시 저장합니다.
        localStorage.setItem("민지의일기목록", JSON.stringify(업데이트된목록));
        // 페이지를 새로고침합니다
        location.reload();
    };





    // 컨트롤바와 필터 관련 기능
    // 드롭다운 변경 시 렌더링 함수를 다시 호출하여 화면을 업데이트합니다.
    기분필터.addEventListener("change", e => 렌더일기목록(e.target.value));

    // 스크롤 이벤트를 감지하는 리스너를 추가하여 드롭다운 색상을 바꿉니다.

    // 카드목록의 스크롤 위치를 미리 계산
    // offsetTop은 문서의 최상단부터 해당 요소까지의 거리를 픽셀 단위로 반환합니다.
    const 카드목록_offsetTop = 카드목록.offsetTop;

    // 스크롤 이벤트를 감지하여 select의 색상을 변경
    window.addEventListener('scroll', () => {
        // 현재 스크롤 위치를 가져옵니다.
        const currentScrollY = window.scrollY;

        // 현재 스크롤 위치가 카드목록의 시작점(offsetTop)을 넘어서면
        if (currentScrollY >= 카드목록_offsetTop) {
            // select 요소에 'scrolled' 클래스를 추가합니다.
            기분필터.classList.add('scrolled');
        } else {
            // 그렇지 않으면 'scrolled' 클래스를 제거합니다.
            기분필터.classList.remove('scrolled');
        }
    });




    // 일기 등록 및 버튼 활성화/비활성화 기능 구현
    // 1. 필요한 DOM 요소들을 선택합니다.
    const 등록하기버튼 = document.querySelector(".일기등록버튼");
    const 제목텍스트 = document.querySelector('.일기텍스트 input[type="text"]');
    const 내용텍스트 = document.querySelector('.일기텍스트 textarea');
    const 기분라디오 = document.querySelectorAll('input[name="기분"]');
    // 2. '등록하기' 버튼에 클릭 이벤트 리스너를 추가합니다.
    등록하기버튼.addEventListener("click", function () {
        // 선택된 기분 값 가져오기
        const selectedMood = document.querySelector('input[name="기분"]:checked');
        const 기분 = selectedMood.value;
        // 제목과 내용 값 가져오기
        const 제목 = 제목텍스트.value;
        const 내용 = 내용텍스트.value;
        // 새로운 일기 객체 생성
        const newDiary = {
            고유아이디: Date.now(),
            제목: 제목,
            내용: 내용,
            기분: 기분,
            날짜: new Date().toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }),
            회고: []
        };
        // 3. 기존 일기 목록에 새 일기 추가 및 localStorage에 저장
        const 일기목록 = JSON.parse(localStorage.getItem("민지의일기목록") ?? "[]");
        일기목록.push(newDiary);
        localStorage.setItem("민지의일기목록", JSON.stringify(일기목록));
        // 4. 페이지 새로고침하여 새로운 일기 목록 표시
        location.reload();
    });


    // 5. 입력 필드와 라디오 버튼 상태에 따라 버튼 활성화/비활성화를 제어하는 함수
    function 제출버튼활성화필요여부감지() {
        const 기분선택감지 = document.querySelector('input[name="기분"]:checked');
        const 제목입력감지 = 제목텍스트.value.trim() !== "";
        const 내용입력감지 = 내용텍스트.value.trim() !== "";

        if (기분선택감지 && 제목입력감지 && 내용입력감지) {
            등록하기버튼.disabled = false;
            // 활성화 상태일 때 클래스 추가
            등록하기버튼.classList.add('일기등록버튼_활성화');
        } else {
            등록하기버튼.disabled = true;
            // 비활성화 상태일 때 클래스 제거
            등록하기버튼.classList.remove('일기등록버튼_활성화');
        }
    }

    // 6. 각 입력 필드와 라디오 버튼에 이벤트 리스너를 추가하여 상태 변화를 감지
    제목텍스트.addEventListener("input", 제출버튼활성화필요여부감지);
    내용텍스트.addEventListener("input", 제출버튼활성화필요여부감지);
    기분라디오.forEach(radio => {
        radio.addEventListener("change", 제출버튼활성화필요여부감지);
    });



});



