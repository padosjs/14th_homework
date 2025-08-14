// 페이지가 완전히 로드된 후 스크립트 실행
document.addEventListener("DOMContentLoaded", function () {

    // --- 1. 초기 데이터 로딩 ---
    // URL에서 일기 ID를 가져와 현재 일기를 식별합니다.
    const URL파라미터 = new URLSearchParams(window.location.search);
    const 일기아이디 = URL파라미터.get('id');
    // 로컬 스토리지에서 일기 목록을 가져와 현재 일기를 찾습니다.
    const 일기목록 = JSON.parse(localStorage.getItem("민지의일기목록") ?? "[]");
    const 현재일기 = 일기목록.find(diary => diary.고유아이디 == 일기아이디);

    if (현재일기) {
        // --- 2. 일기 상세 내용 표시 ---
        // 현재 일기의 제목, 기분, 날짜, 내용을 화면에 표시합니다.
        document.querySelector(".일기상세타이틀").textContent = 현재일기.제목;
        const 일기상세기분과날짜 = document.querySelector(".일기상세기분과날짜 .기분");
        일기상세기분과날짜.textContent = 현재일기.기분;
        document.querySelector(".일기상세기분과날짜 .날짜").textContent = 현재일기.날짜;
        document.querySelector(".일기상세내용").textContent = 현재일기.내용;
        // 기분에 따라 텍스트 색상을 다르게 적용합니다.
        일기상세기분과날짜.classList.add(`${현재일기.기분}텍스트색상`);


        // --- 3. 수정 및 삭제 버튼 기능 ---
        // '수정' 버튼 클릭 시, 해당 일기 ID를 가지고 수정 페이지로 이동합니다.
        const 수정버튼 = document.getElementById("일기상세수정버튼");
        if (수정버튼) {
            수정버튼.addEventListener('click', () => {
                window.location.href = `edit.html?id=${일기아이디}`;
            });
        }
        // '삭제' 버튼 클릭 시, 사용자 확인 후 일기를 삭제하고 메인 페이지로 돌아갑니다.
        const 삭제버튼 = document.getElementById("일기상세삭제버튼");
        if (삭제버튼) {
            삭제버튼.addEventListener('click', () => {
                if (confirm("정말로 이 일기를 삭제하시겠어요?")) {
                    const 업데이트된목록 = 일기목록.filter(diary => diary.고유아이디 != 일기아이디);
                    localStorage.setItem("민지의일기목록", JSON.stringify(업데이트된목록));
                    window.location.href = 'index.html';
                }
            });
        }


        // --- 4. 회고 기능 ---
        const 회고입력폼 = document.querySelector(".회고입력과버튼컨테이너");
        const 회고입력창 = document.querySelector(".회고입력과버튼컨테이너 .입력창");
        const 회고목록컨테이너 = document.querySelector(".회고개별컨테이너");

        // 회고 목록을 화면에 표시하는 함수
        const 회고렌더링 = () => {
            회고목록컨테이너.innerHTML = '';
            if (현재일기.회고목록 && 현재일기.회고목록.length > 0) {
                현재일기.회고목록.forEach(회고 => {
                    const 회고Div = document.createElement('div');
                    회고Div.classList.add('회고개별');

                    // 날짜를 [YYYY. MM. DD] 형식으로 포맷하는 과정
                    const date = new Date(회고.작성일시);
                    const year = date.getFullYear();
                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                    const day = date.getDate().toString().padStart(2, '0');
                    const 작성일 = `[${year}. ${month}. ${day}]`;

                    회고Div.innerHTML = `
                        <p class="회고내용">${회고.내용}</p>
                        <p class="회고작성일시">${작성일}</p>
                    `;
                    회고목록컨테이너.appendChild(회고Div);
                });
            }
        };

        // 폼 제출 시 회고를 저장하는 함수
        const 회고제출 = (event) => {
            event.preventDefault(); // 페이지 새로고침 방지

            const 새로운회고내용 = 회고입력창.value.trim();

            if (새로운회고내용) {
                if (!현재일기.회고목록) { 현재일기.회고목록 = []; }

                // 회고를 객체({내용, 작성일시})로 만들어 배열에 추가합니다.
                const 새로운회고객체 = { 내용: 새로운회고내용, 작성일시: Date.now() };
                현재일기.회고목록.push(새로운회고객체);

                // 로컬 스토리지의 데이터도 업데이트합니다.
                const 일기인덱스 = 일기목록.findIndex(diary => diary.고유아이디 == 일기아이디);
                if (일기인덱스 > -1) {
                    일기목록[일기인덱스] = 현재일기;
                    localStorage.setItem("민지의일기목록", JSON.stringify(일기목록));
                }

                회고입력창.value = ''; // 입력창 초기화
                회고렌더링(); // 화면을 다시 그려 업데이트된 회고를 표시합니다.
            }
        };

        회고렌더링(); // 페이지 로드 시 기존 회고를 화면에 먼저 표시합니다.
        회고입력폼.addEventListener('submit', 회고제출); // 폼 제출 이벤트에 회고제출 함수를 연결합니다.

        
        //

        // 페이지 로드 시 바로 회고목록으로 스크롤을 이동시키는 코드
        if (회고목록컨테이너) {
            회고목록컨테이너.scrollIntoView({
                behavior: 'smooth' // 스크롤 이동을 부드럽게 만듭니다.
            });
        }

        
    } else {
        // --- 5. 잘못된 접근 처리 ---
        // 해당 ID의 일기를 찾지 못하면 오류 메시지를 표시하고 메인 페이지로 이동합니다.
        alert('일기를 찾을 수 없습니다.');
        window.location.href = 'index.html';
    }
});