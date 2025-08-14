// DOM이 완전히 로드된 후 스크립트 실행
document.addEventListener("DOMContentLoaded", () => {
    
    // --- 변수 및 상수 그룹화 ---
    const 일기목록 = JSON.parse(localStorage.getItem("민지의일기목록") ?? "[]");
    const 카드목록 = document.querySelector(".카드목록");
    const 기분필터 = document.querySelector("#기분필터드롭다운");
    const 등록하기버튼 = document.querySelector(".일기등록버튼");
    const 제목텍스트 = document.querySelector('.일기텍스트 input[type="text"]');
    const 내용텍스트 = document.querySelector('.일기텍스트 textarea');
    const 기분라디오 = document.querySelectorAll('input[name="기분"]');
    const 카드목록_offsetTop = 카드목록.offsetTop;

    // 반응형 패널 이동을 위한 요소
    const 일기쓰기패널 = document.getElementById("일기쓰기패널");
    const 컨트롤바 = document.getElementById("컨트롤바");
    const 카드목록과일기쓰기패널 = document.getElementById("카드목록과일기쓰기패널");
    // 너비 기준을 980px로 변경
    const mediaQuery = window.matchMedia('(max-width: 980px)');


    // --- 1. 일기 목록 렌더링 기능 ---
    const 렌더일기목록 = (필터값 = "전체") => {
        const 필터된목록 = 필터값 === "전체" ? 일기목록 : 일기목록.filter(diary => diary.기분 === 필터값);
        
        const 카드HTML = 필터된목록.map(diary => `
            <div class="카드" onclick="location.href='detail.html?id=${diary.고유아이디}'">
                <img src="./assets/icons/close-icon.svg" class="카드삭제버튼" onclick="event.stopPropagation(); deleteDiary('${diary.고유아이디}')">
                <div class="${diary.기분}카드썸네일"></div>
                <div class="카드텍스트컨테이너">
                    <div class="기분과날짜">
                        <span class="${diary.기분}텍스트색상">${diary.기분}</span>
                        <span class="날짜">${diary.날짜}</span>
                    </div>
                    <div class="타이틀">
                        ${diary.제목}
                    </div>
                </div>
            </div>
        `).join('');
        카드목록.innerHTML = 카드HTML;
    };
    렌더일기목록();


    // --- 2. 일기 삭제 기능 ---
    window.deleteDiary = (고유아이디) => {
        if (confirm("정말로 이 일기를 삭제하시겠어요?")) {
            const 업데이트된목록 = 일기목록.filter(diary => diary.고유아이디 != 고유아이디);
            localStorage.setItem("민지의일기목록", JSON.stringify(업데이트된목록));
            location.reload();
        }
    };


    // --- 3. 일기 등록 기능 ---
    const handleDiarySubmit = () => {
        const selectedMood = document.querySelector('input[name="기분"]:checked');
        if (!selectedMood) return;

        const newDiary = {
            고유아이디: Date.now(),
            제목: 제목텍스트.value,
            내용: 내용텍스트.value,
            기분: selectedMood.value,
            날짜: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }),
            회고: []
        };

        일기목록.push(newDiary);
        localStorage.setItem("민지의일기목록", JSON.stringify(일기목록));
        location.reload();
    };


    // --- 4. 제출 버튼 활성화/비활성화 기능 ---
    const checkFormValidity = () => {
        const isMoodSelected = document.querySelector('input[name="기분"]:checked');
        const isTitleFilled = 제목텍스트.value.trim() !== "";
        const isContentFilled = 내용텍스트.value.trim() !== "";

        if (isMoodSelected && isTitleFilled && isContentFilled) {
            등록하기버튼.disabled = false;
            등록하기버튼.classList.add('일기등록버튼_활성화');
        } else {
            등록하기버튼.disabled = true;
            등록하기버튼.classList.remove('일기등록버튼_활성화');
        }
    };


    // --- 5. 반응형 패널 위치 변경 기능 ---
    // 미디어쿼리 조건에 따라 패널 위치를 변경하는 함수
    const handlePanelPosition = (e) => {
        if (e.matches) {
            // 화면 너비가 980px 이하일 때, '일기쓰기패널'을 '컨트롤바'의 앞으로 이동
            컨트롤바.parentNode.insertBefore(일기쓰기패널, 컨트롤바);
        } else {
            // 화면 너비가 980px 초과일 때, '일기쓰기패널'을 원래 위치로 되돌림
            카드목록과일기쓰기패널.appendChild(일기쓰기패널);
        }
    };


    // --- 6. 이벤트 리스너 통합 관리 ---
    // 초기 페이지 로드 시 패널 위치 설정
    handlePanelPosition(mediaQuery);
    
    // 미디어쿼리 변경 이벤트 리스너
    mediaQuery.addEventListener('change', handlePanelPosition);

    // 기분 필터 드롭다운 변경 이벤트
    기분필터.addEventListener("change", e => 렌더일기목록(e.target.value));

    // 스크롤 이벤트 (컨트롤바 색상 변경)
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 카드목록_offsetTop) {
            기분필터.classList.add('scrolled');
        } else {
            기분필터.classList.remove('scrolled');
        }
    });

    // 일기 등록 버튼 클릭 이벤트
    등록하기버튼.addEventListener("click", handleDiarySubmit);

    // 폼 입력 및 라디오 버튼 변경 이벤트 (버튼 활성화/비활성화)
    제목텍스트.addEventListener("input", checkFormValidity);
    내용텍스트.addEventListener("input", checkFormValidity);
    기분라디오.forEach(radio => radio.addEventListener("change", checkFormValidity));

});