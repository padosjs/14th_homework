document.addEventListener("DOMContentLoaded", function () {
    // 1. URL에서 쿼리 파라미터 가져오기
    const URL고유주소 = new URLSearchParams(window.location.search);
    const 일기아이디 = URL고유주소.get('id');

    // 2. localStorage에서 일기 목록 가져오기
    let 일기목록 = JSON.parse(localStorage.getItem("민지의일기목록") ?? "[]");

    // 3. 고유아이디에 해당하는 일기 찾기
    const 수정할일기 = 일기목록.find(diary => diary.고유아이디 == 일기아이디);

    // 4. 일기를 찾았을 경우, 입력 필드에 데이터 채우기 및 이벤트 연결
    if (수정할일기) {
        // HTML 요소 선택
        const 제목입력 = document.querySelector('.일기수정메인 .입력필드그룹 input');
        const 내용입력 = document.querySelector('.일기수정메인 .입력필드그룹 textarea');
        const 기분라디오 = document.querySelectorAll('input[name="기분"]');
        const 취소버튼 = document.getElementById('일기수정취소버튼');
        const 수정버튼 = document.getElementById('일기수정수정버튼');
        
        // 기존 일기 내용으로 입력 필드 채우기
        제목입력.value = 수정할일기.제목;
        내용입력.value = 수정할일기.내용;

        // 기존 일기 기분에 맞는 라디오 버튼 선택
        기분라디오.forEach(radio => {
            if (radio.value === 수정할일기.기분) {
                radio.checked = true;
            }
        });

        // '수정' 버튼 클릭 이벤트 리스너
        수정버튼.addEventListener('click', () => {
            // 수정된 내용으로 객체 업데이트
            const newTitle = 제목입력.value;
            const newContent = 내용입력.value;
            const newMood = document.querySelector('input[name="기분"]:checked').value;
            
            수정할일기.제목 = newTitle;
            수정할일기.내용 = newContent;
            수정할일기.기분 = newMood;

            // localStorage 업데이트
            localStorage.setItem("민지의일기목록", JSON.stringify(일기목록));
            
            alert('일기가 성공적으로 수정되었습니다.');
            
            // 상세 페이지로 돌아가기
            window.location.href = `detail.html?id=${일기아이디}`;
        });

        // '취소' 버튼 클릭 이벤트 리스너
        취소버튼.addEventListener('click', () => {
            // 상세 페이지로 돌아가기
            window.location.href = `detail.html?id=${일기아이디}`;
        });

    } else {
        // 5. 일기를 찾지 못했을 경우
        alert('일기를 찾을 수 없습니다.');
        window.location.href = 'index.html'; // 목록 페이지로 돌아가기
    }
});