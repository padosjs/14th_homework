// DOM이 완전히 로드된 후 스크립트 실행
document.addEventListener("DOMContentLoaded", () => {

    // --- 데이터 로딩 및 초기화 ---
    const URL파라미터 = new URLSearchParams(window.location.search);
    const 일기아이디 = URL파라미터.get('id');
    const 일기목록 = JSON.parse(localStorage.getItem("민지의일기목록") ?? "[]");
    const 현재일기 = 일기목록.find(diary => diary.고유아이디 == 일기아이디);

    // DOM 요소 선택
    const 일기상세기분과날짜 = document.querySelector(".일기상세기분과날짜 .기분");
    const 수정버튼 = document.getElementById("일기상세수정버튼");
    const 삭제버튼 = document.getElementById("일기상세삭제버튼");
    const 내용복사버튼 = document.getElementById("내용복사버튼");
    const 복사토스트 = document.querySelector(".복사토스트");
    const 회고입력폼 = document.querySelector(".회고입력과버튼컨테이너");
    const 회고입력창 = document.querySelector(".회고입력과버튼컨테이너 .입력창");
    const 회고목록컨테이너 = document.querySelector(".회고개별컨테이너");

    if (현재일기) {
        // --- 일기 상세 내용 표시 ---
        document.querySelector(".일기상세타이틀").textContent = 현재일기.제목;
        일기상세기분과날짜.textContent = 현재일기.기분;
        document.querySelector(".일기상세기분과날짜 .날짜").textContent = 현재일기.날짜;
        document.querySelector(".일기상세내용").textContent = 현재일기.내용;
        일기상세기분과날짜.classList.add(`${현재일기.기분}텍스트색상`);

        // --- 회고 기능 ---
        const 회고렌더링 = () => {
            회고목록컨테이너.innerHTML = '';
            const 회고목록 = 현재일기.회고목록 || [];
            if (회고목록.length > 0) {
                회고목록.forEach(회고 => {
                    const 회고Div = document.createElement('div');
                    회고Div.classList.add('회고개별');
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

        const 회고제출 = (event) => {
            event.preventDefault();
            const 새로운회고내용 = 회고입력창.value.trim();

            if (새로운회고내용) {
                if (!현재일기.회고목록) { 현재일기.회고목록 = []; }

                const 새로운회고객체 = { 내용: 새로운회고내용, 작성일시: Date.now() };
                현재일기.회고목록.push(새로운회고객체);

                const 일기인덱스 = 일기목록.findIndex(diary => diary.고유아이디 == 일기아이디);
                if (일기인덱스 > -1) {
                    일기목록[일기인덱스] = 현재일기;
                    localStorage.setItem("민지의일기목록", JSON.stringify(일기목록));
                }

                회고입력창.value = '';
                회고렌더링();
            }
        };

        // --- 이벤트 리스너 그룹화 ---
        if (수정버튼) {
            수정버튼.addEventListener('click', () => {
                window.location.href = `edit.html?id=${일기아이디}`;
            });
        }

        if (삭제버튼) {
            삭제버튼.addEventListener('click', () => {
                if (confirm("정말로 이 일기를 삭제하시겠어요?")) {
                    const 업데이트된목록 = 일기목록.filter(diary => diary.고유아이디 != 일기아이디);
                    localStorage.setItem("민지의일기목록", JSON.stringify(업데이트된목록));
                    window.location.href = 'index.html';
                }
            });
        }

        if (내용복사버튼) {
            내용복사버튼.addEventListener('click', () => {
                const 일기상세내용 = document.querySelector(".일기상세내용").textContent;
                navigator.clipboard.writeText(일기상세내용);
                복사토스트.classList.add('활성화됨');
                setTimeout(() => {
                    복사토스트.classList.remove('활성화됨');
                }, 2000);
            });
        }

        if (회고입력폼) {
            회고입력폼.addEventListener('submit', 회고제출);
        }

        // 페이지 로드 시 회고 렌더링 및 스크롤 이동
        회고렌더링();
        if (회고목록컨테이너) {
            회고목록컨테이너.scrollIntoView({
                behavior: 'smooth'
            });
        }

    } else {
        // --- 예외 처리 ---
        alert('일기를 찾을 수 없습니다.');
        window.location.href = 'index.html';
    }
});