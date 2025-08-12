document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const diaryId = urlParams.get('id');

    const 일기목록 = JSON.parse(localStorage.getItem("민지의일기목록") ?? "[]");
    const currentDiary = 일기목록.find(diary => diary.고유아이디 == diaryId);

    if (currentDiary) {
        document.querySelector(".일기상세타이틀").textContent = currentDiary.제목;
        const moodElement = document.querySelector(".일기상세기분과날짜 .기분");
        moodElement.textContent = currentDiary.기분;
        document.querySelector(".일기상세기분과날짜 .날짜").textContent = currentDiary.날짜;
        document.querySelector(".일기상세내용").textContent = currentDiary.내용;

        moodElement.classList.add(`${currentDiary.기분}텍스트색상`);

        // '일기상세수정버튼' ID를 가진 버튼에 이벤트 리스너 추가
        const editButton = document.getElementById("일기상세수정버튼");
        if (editButton) {
            editButton.addEventListener('click', () => {
                window.location.href = `edit.html?id=${diaryId}`;
            });
        }
    } else {
        alert('일기를 찾을 수 없습니다.');
        window.location.href = 'index.html';
    }
});