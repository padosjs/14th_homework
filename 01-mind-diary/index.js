

// DOM이 완전히 로드된 후 스크립트 실행
document.addEventListener("DOMContentLoaded", () => {
    // --- 변수 및 상수 그룹화 ---
    const 일기목록 = JSON.parse(localStorage.getItem("민지의일기목록") ?? "[]");
    const 카드목록 = document.querySelector(".카드목록");
    const 카드목록_offsetTop = 카드목록.offsetTop;
    const 기분필터 = document.querySelector("#기분필터드롭다운");
    const 제목텍스트 = document.querySelector('.일기텍스트 input[type="text"]');
    const 내용텍스트 = document.querySelector('.일기텍스트 textarea');
    const 기분라디오 = document.querySelectorAll('input[name="기분"]');
    const 등록하기버튼 = document.querySelector("#일기등록버튼");


    // 모달관련기능
    const 모달열기 = (id) => document.getElementById(id).style.display = "flex";
    const 모달닫기 = (id) => document.getElementById(id).style.display = "none";


    // 모달을 여는 버튼
    const 일기쓰기모달열기버튼 = document.querySelector("#일기쓰기모달여는버튼");
    일기쓰기모달열기버튼.addEventListener("click", () => 모달열기('일기쓰기모달'));

    const 일기등록취소모달열기버튼 = document.querySelector("#일기쓰기닫기버튼");
    일기등록취소모달열기버튼.addEventListener("click", () => 모달열기('일기등록취소모달'));

    //모달을 닫는 버튼
    const 일기등록취소모달닫기버튼 = document.querySelector("#일기계속작성버튼");
    일기등록취소모달닫기버튼.addEventListener("click", () => 모달닫기('일기등록취소모달'));

    const 일기등록취소버튼 =  document.querySelector("#일기등록취소버튼");
    일기등록취소버튼.addEventListener("click", () => {
        // 입력 필드 초기화
        document.querySelector('.일기텍스트 input[type="text"]').value = "";
        document.querySelector('.일기텍스트 textarea').value = "";
        
        // 라디오 버튼 초기화 (선택 해제)
        document.querySelectorAll('input[name="기분"]').forEach(radio => {
            radio.checked = false;
        });
    
        // 모달 닫기
        모달닫기('일기등록취소모달'); 
        모달닫기('일기쓰기모달');
    });
    // 모달 배경 클릭 시 닫기
    const 일기쓰기모달배경 = document.querySelector("#일기쓰기모달");
    일기쓰기모달배경.addEventListener("click", () => 모달닫기('일기쓰기모달'));
    const 일기등록취소모달배경 = document.querySelector("#일기등록취소모달");
    일기등록취소모달배경.addEventListener("click", () => 모달닫기('일기등록취소모달'));

    // 모달 패널(내부 컨텐츠) 클릭 시 이벤트 버블링 방지
    const 모달패널들 = document.querySelectorAll(".모달패널");
    모달패널들.forEach(패널 => {
        패널.addEventListener("click", e => e.stopPropagation());
    });





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

    // --- 2. 기분 필터 드롭다운 변경 이벤트 ---
    기분필터.addEventListener("change", e => 렌더일기목록(e.target.value));

    // --- 3. 일기 삭제 기능 ---
    window.deleteDiary = (고유아이디) => {
        if (confirm("정말로 이 일기를 삭제하시겠어요?")) {
            const 업데이트된목록 = 일기목록.filter(diary => diary.고유아이디 != 고유아이디);
            localStorage.setItem("민지의일기목록", JSON.stringify(업데이트된목록));
            location.reload();
        }
    };

    // --- 4. 일기 등록 기능 ---
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
        모달열기('일기등록완료모달');

    };

    // --- 5. 제출 버튼 활성화/비활성화 기능 ---
    const checkFormValidity = () => {
        const isMoodSelected = document.querySelector('input[name="기분"]:checked');
        const isTitleFilled = 제목텍스트.value.trim() !== "";
        const isContentFilled = 내용텍스트.value.trim() !== "";

        // 세 가지 조건이 모두 만족하면 버튼을 활성화
        등록하기버튼.disabled = !(isMoodSelected && isTitleFilled && isContentFilled);
    };




    // --- 7. 스크롤 이벤트 (컨트롤바 색상 변경) ---
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 카드목록_offsetTop) {
            기분필터.classList.add('scrolled');
        } else {
            기분필터.classList.remove('scrolled');
        }
    });

    // --- 8. 이벤트 리스너 ---
    등록하기버튼.addEventListener("click", handleDiarySubmit);
    제목텍스트.addEventListener("input", checkFormValidity);
    내용텍스트.addEventListener("input", checkFormValidity);
    기분라디오.forEach(radio => radio.addEventListener("change", checkFormValidity));

});