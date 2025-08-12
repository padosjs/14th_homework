document.addEventListener("DOMContentLoaded", function () {
    // 1. URL에서 쿼리 파라미터 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const diaryId = urlParams.get('id');

    // 2. localStorage에서 일기 목록 가져오기
    let 일기목록 = JSON.parse(localStorage.getItem("민지의일기목록") ?? "[]");

    // 3. 고유아이디에 해당하는 일기 찾기
    const diaryToEdit = 일기목록.find(diary => diary.고유아이디 == diaryId);

    // 4. 일기를 찾았을 경우, 입력 필드에 데이터 채우기 및 이벤트 연결
    if (diaryToEdit) {
        // HTML 요소 선택
        const titleInput = document.querySelector('.일기수정메인 .입력필드그룹 input');
        const contentTextarea = document.querySelector('.일기수정메인 .입력필드그룹 textarea');
        const moodRadios = document.querySelectorAll('input[name="기분"]');
        const cancelButton = document.getElementById('일기수정취소버튼');
        const saveButton = document.getElementById('일기수정수정버튼');
        
        // 기존 일기 내용으로 입력 필드 채우기
        titleInput.value = diaryToEdit.제목;
        contentTextarea.value = diaryToEdit.내용;

        // 기존 일기 기분에 맞는 라디오 버튼 선택
        moodRadios.forEach(radio => {
            if (radio.value === diaryToEdit.기분) {
                radio.checked = true;
            }
        });

        // '수정' 버튼 클릭 이벤트 리스너
        saveButton.addEventListener('click', () => {
            // 수정된 내용으로 객체 업데이트
            const newTitle = titleInput.value;
            const newContent = contentTextarea.value;
            const newMood = document.querySelector('input[name="기분"]:checked').value;
            
            diaryToEdit.제목 = newTitle;
            diaryToEdit.내용 = newContent;
            diaryToEdit.기분 = newMood;

            // localStorage 업데이트
            localStorage.setItem("민지의일기목록", JSON.stringify(일기목록));
            
            alert('일기가 성공적으로 수정되었습니다.');
            
            // 상세 페이지로 돌아가기
            window.location.href = `detail.html?id=${diaryId}`;
        });

        // '취소' 버튼 클릭 이벤트 리스너
        cancelButton.addEventListener('click', () => {
            // 상세 페이지로 돌아가기
            window.location.href = `detail.html?id=${diaryId}`;
        });

    } else {
        // 5. 일기를 찾지 못했을 경우
        alert('일기를 찾을 수 없습니다.');
        window.location.href = 'index.html'; // 목록 페이지로 돌아가기
    }
});