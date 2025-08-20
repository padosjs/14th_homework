document.addEventListener("DOMContentLoaded", () => {
    const 다크모드토글 = document.querySelector("#다크모드전환토글");

    // 로컬 스토리지에서 다크 모드 상태를 불러와 초기 상태 설정
    const isDarkMode = localStorage.getItem("마음일기다크모드") === "true";
    if (isDarkMode) {
      document.body.classList.add("다크모드");
      다크모드토글.checked = true;
    }

    // 토글 버튼 클릭 이벤트 리스너 추가
    다크모드토글.addEventListener("change", () => {
        document.body.classList.toggle("다크모드");
        localStorage.setItem("마음일기다크모드", 다크모드토글.checked);
    });
});