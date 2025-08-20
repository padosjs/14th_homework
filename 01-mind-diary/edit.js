// DOM이 완전히 로드된 후 스크립트 실행
document.addEventListener("DOMContentLoaded", () => {

    // --- 변수 및 상수 그룹화 ---
    const URL고유주소 = new URLSearchParams(window.location.search);
    const 일기아이디 = URL고유주소.get('id');
    let 일기목록 = JSON.parse(localStorage.getItem("민지의일기목록") ?? "[]");
    const 수정할일기 = 일기목록.find(diary => diary.고유아이디 == 일기아이디);

    // DOM 요소 선택
    const 제목입력 = document.querySelector('.일기수정메인 .입력필드그룹 input');
    const 내용입력 = document.querySelector('.일기수정메인 .입력필드그룹 textarea');
    const 기분라디오 = document.querySelectorAll('input[name="기분"]');
    const 취소버튼 = document.getElementById('일기수정취소버튼');
    const 수정버튼 = document.getElementById('일기수정수정버튼');

    // --- 일기 데이터 불러오기 및 폼 채우기 ---
    if (수정할일기) {
        // 기존 일기 내용으로 입력 필드 채우기
        제목입력.value = 수정할일기.제목;
        내용입력.value = 수정할일기.내용;

        // 기존 일기 기분에 맞는 라디오 버튼 선택
        기분라디오.forEach(radio => {
            if (radio.value === 수정할일기.기분) {
                radio.checked = true;
            }
        });

        // --- 이벤트 리스너 그룹화 ---
        // '수정' 버튼 클릭 이벤트
        수정버튼.addEventListener('click', () => {
            const newTitle = 제목입력.value;
            const newContent = 내용입력.value;
            const newMood = document.querySelector('input[name="기분"]:checked').value;

            수정할일기.제목 = newTitle;
            수정할일기.내용 = newContent;
            수정할일기.기분 = newMood;

            localStorage.setItem("민지의일기목록", JSON.stringify(일기목록));

            alert('일기가 성공적으로 수정되었습니다.');
            window.location.href = `detail.html?id=${일기아이디}`;
        });

        // '취소' 버튼 클릭 이벤트
        취소버튼.addEventListener('click', () => {
            window.location.href = `detail.html?id=${일기아이디}`;
        });

    } else {
        // --- 예외 처리 ---
        alert('일기를 찾을 수 없습니다.');
        window.location.href = 'index.html';
    }
});