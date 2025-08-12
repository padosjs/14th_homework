
// 페이지 로드 시 실행될 함수
document.addEventListener("DOMContentLoaded", function () {


    // 1. 일기 내용 로컬스토리지에서 불러와서 표시
    // 1-1 일기 목록을 localStorage에서 가져오기
    const 일기목록 = JSON.parse(localStorage.getItem("민지의일기목록") ?? "[]");

    // 1-2 일기 카드가 들어갈 컨테이너 선택
    const 카드목록 = document.querySelector(".카드목록");

    // 1-3 일기 목록을 순회하며 각 일기를 카드에 표시
    일기목록.forEach(diary => {
        // 새로운 카드(div) 요소 생성
        const 카드 = document.createElement("div");
        카드.classList.add("카드");

        // 일기 객체의 기분 값으로 CSS 클래스명과 텍스트를 바로 사용
        const 기분 = diary.기분; // 예: "행복해요"
        const 썸네일클래스 = `${기분}카드썸네일`; // 예: "행복해요카드썸네일"
        const 텍스트색상클래스 = `${기분}텍스트색상`; // 예: "행복해요텍스트색상"

        // 카드 내부에 들어갈 HTML을 구성
        카드.innerHTML = `
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
        `;

        // 카드에 클릭 이벤트 리스너를 추가하여 상세 페이지로 이동
        카드.addEventListener('click', () => {
            // 해당 일기의 고유 id를 URL 파라미터로 넘겨 상세 페이지로 이동
            window.location.href = `detail.html?id=${diary.고유아이디}`;
        });

        // 완성된 카드를 카드 목록 컨테이너에 추가
        카드목록.appendChild(카드);
    });


    // 2. 일기 등록 및 버튼 활성화/비활성화 기능 구현

    // 2-1. 필요한 DOM 요소들을 선택합니다.
    const submitButton = document.querySelector(".일기등록버튼");
    const titleInput = document.querySelector('.일기텍스트 input[type="text"]');
    const contentTextarea = document.querySelector('.일기텍스트 textarea');
    const moodRadios = document.querySelectorAll('input[name="mood"]');

    // 2-2. '등록하기' 버튼에 클릭 이벤트 리스너를 추가합니다.
    submitButton.addEventListener("click", function () {
        // 선택된 기분 값 가져오기
        const selectedMood = document.querySelector('input[name="mood"]:checked');
        const 기분 = selectedMood.value;

        // 제목과 내용 값 가져오기
        const 제목 = titleInput.value;
        const 내용 = contentTextarea.value;

        // 새로운 일기 객체 생성
        const newDiary = {
            고유아이디: Date.now(),
            제목: 제목,
            내용: 내용,
            기분: 기분,
            // 현재 날짜를 YYYY-MM-DD 형식으로 저장 (예: "2024. 03. 12.")
            날짜: new Date().toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        };

        // 2-3. 기존 일기 목록에 새 일기 추가 및 localStorage에 저장
        const 일기목록 = JSON.parse(localStorage.getItem("민지의일기목록") ?? "[]");
        일기목록.push(newDiary);
        localStorage.setItem("민지의일기목록", JSON.stringify(일기목록));

        // 2-4. 페이지 새로고침하여 새로운 일기 목록 표시
        location.reload();
    });


    // 2-5. 입력 필드와 라디오 버튼 상태에 따라 버튼 활성화/비활성화를 제어하는 함수
    function checkInputsAndToggleSubmitButton() {
        const isMoodSelected = document.querySelector('input[name="기분"]:checked');
        const isTitleFilled = titleInput.value.trim() !== "";
        const isContentFilled = contentTextarea.value.trim() !== "";

        if (isMoodSelected && isTitleFilled && isContentFilled) {
            submitButton.disabled = false;
            // 활성화 상태일 때 클래스 추가
            submitButton.classList.add('일기등록버튼_활성화');
        } else {
            submitButton.disabled = true;
            // 비활성화 상태일 때 클래스 제거
            submitButton.classList.remove('일기등록버튼_활성화');
        }
    }

    // 2-6. 각 입력 필드와 라디오 버튼에 이벤트 리스너를 추가하여 상태 변화를 감지
    titleInput.addEventListener("input", checkInputsAndToggleSubmitButton);
    contentTextarea.addEventListener("input", checkInputsAndToggleSubmitButton);
    moodRadios.forEach(radio => {
        radio.addEventListener("change", checkInputsAndToggleSubmitButton);
    });



});



