// DOM이 완전히 로드된 후 스크립트 실행
document.addEventListener("DOMContentLoaded", () => {
    // --- 변수 및 상수 그룹화 ---
    const 일기목록 = JSON.parse(localStorage.getItem("민지의일기목록") ?? "[]");
    let 삭제할일기 = null;

    // --- 페이지네이션 관련 변수 추가 ---
    let 현재페이지 = 1;
    const 페이지당항목수 = 12;
    // 페이지 번호 그룹화 관련 상수 및 변수
    const 페이지네이션_그룹_크기 = 10;
    let 현재_그룹_시작_페이지 = 1;

    // DOM 요소 선택
    const 카드목록 = document.querySelector(".카드목록");
    const 카드목록플레이스홀더 = document.querySelector("#카드목록플레이스홀더");
    const 신규기분필터 = document.querySelector("#신규기분필터");
    const 프로그레시브블러 = document.querySelector("#프로그레시브블러");
    const 제목텍스트 = document.querySelector('.일기텍스트 input[type="text"]');
    const 내용텍스트 = document.querySelector('.일기텍스트 textarea');
    const 기분라디오 = document.querySelectorAll('input[name="기분"]');
    const 등록하기버튼 = document.querySelector("#일기등록버튼");
    const 일기쓰기모달 = document.getElementById("일기쓰기모달");
    const 일기등록취소모달 = document.getElementById("일기등록취소모달");
    const 일기삭제확인모달 = document.getElementById("일기삭제확인모달");
    const 드롭다운버튼 = document.querySelector('.드롭다운-버튼');
    const 메뉴항목들 = document.querySelectorAll('.메뉴-항목');
    const 드롭다운토글 = document.getElementById('드롭다운-토글');
    const 일기검색입력 = document.querySelector("#일기검색입력");
    const 페이지네이션컨테이너 = document.querySelector("#페이지네이션컨테이너");

    // 오프셋 값
    const 카드목록_offsetTop = 카드목록.offsetTop;

    // --- 모달 기능 ---
    const 모달열기 = (id) => {
        document.getElementById(id).style.display = "flex";
        document.body.classList.add("no-scroll");
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const 모달닫기 = (id) => {
        document.getElementById(id).style.display = "none";
        document.body.classList.remove("no-scroll");
    };

    // --- 일기 목록 렌더링 기능 ---
    const 렌더일기목록 = (필터값 = "전체", 검색어 = "", 페이지 = 1) => {
        const 검색된목록 = 일기목록.filter(diary =>
            diary.제목.includes(검색어) || diary.내용.includes(검색어)
        );

        const 필터된목록 = 필터값 === "전체" ? 검색된목록 : 검색된목록.filter(diary => diary.기분 === 필터값);

        // --- 페이지네이션 적용: 현재 페이지의 데이터만 잘라내기 ---
        const 시작인덱스 = (페이지 - 1) * 페이지당항목수;
        const 끝인덱스 = 시작인덱스 + 페이지당항목수;
        const 현재페이지목록 = 필터된목록.slice(시작인덱스, 끝인덱스);

        // 플레이스홀더 표시/숨기기
        if (필터된목록.length === 0) {
            카드목록플레이스홀더.style.display = 'flex';
            카드목록.innerHTML = '';
            페이지네이션컨테이너.style.display = 'none';
        } else {
            카드목록플레이스홀더.style.display = 'none';
            페이지네이션컨테이너.style.display = 'flex';

            const 카드HTML = 현재페이지목록.map(diary => `
                <div class="카드" data-id="${diary.고유아이디}">
                    <img src="./assets/icons/close-icon.svg" class="카드삭제버튼">
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
        }

        // 전체 페이지 수 계산 및 페이지네이션 렌더링
        const 총페이지수 = Math.ceil(필터된목록.length / 페이지당항목수);
        렌더페이지네이션(총페이지수);
    };

    // --- 페이지네이션 UI 렌더링 함수 ---
    const 렌더페이지네이션 = (총페이지수) => {
        페이지네이션컨테이너.innerHTML = '';

        if (총페이지수 <= 1) {
            페이지네이션컨테이너.style.display = 'none';
            return;
        }

        페이지네이션컨테이너.style.display = 'flex';

        // '이전' 버튼 렌더링
        const 이전버튼 = document.createElement('button');
        const 이전아이콘 = document.createElement('img');
        이전아이콘.src = './assets/icons/chevron-right-icon.svg';
        이전아이콘.alt = '이전 페이지';
        이전버튼.appendChild(이전아이콘);
        이전버튼.classList.add('페이지네이션버튼');
        if (현재_그룹_시작_페이지 <= 1) {
            이전버튼.disabled = true;
        } else {
            이전버튼.addEventListener('click', () => {
                현재_그룹_시작_페이지 -= 페이지네이션_그룹_크기;
                렌더페이지네이션(총페이지수);
                현재페이지 = 현재_그룹_시작_페이지;
                렌더일기목록(document.querySelector('.메뉴-항목.선택됨').dataset.값, 일기검색입력.value, 현재페이지);
                window.scrollTo({ top: 카드목록_offsetTop, behavior: 'smooth' });
            });
        }
        페이지네이션컨테이너.appendChild(이전버튼);

        // 페이지 번호 렌더링
        const 현재_그룹_끝_페이지 = Math.min(현재_그룹_시작_페이지 + 페이지네이션_그룹_크기 - 1, 총페이지수);

        for (let i = 현재_그룹_시작_페이지; i <= 현재_그룹_끝_페이지; i++) {
            const 페이지버튼 = document.createElement('button');
            페이지버튼.textContent = i;
            페이지버튼.classList.add('페이지네이션버튼');
            if (i === 현재페이지) {
                페이지버튼.classList.add('활성페이지');
            }
            페이지버튼.addEventListener('click', () => {
                현재페이지 = i;
                const 검색어 = 일기검색입력.value;
                const 현재필터값 = document.querySelector('.메뉴-항목.선택됨').dataset.값;
                렌더일기목록(현재필터값, 검색어, 현재페이지);
                // 현재 페이지 버튼 다시 렌더링
                렌더페이지네이션(총페이지수);
                window.scrollTo({ top: 카드목록_offsetTop, behavior: 'smooth' });
            });
            페이지네이션컨테이너.appendChild(페이지버튼);
        }

        // '다음' 버튼 렌더링
        const 다음버튼 = document.createElement('button');
        const 다음아이콘 = document.createElement('img');
        다음아이콘.src = './assets/icons/chevron-left-icon.svg';
        다음아이콘.alt = '다음 페이지';
        다음버튼.appendChild(다음아이콘);
        다음버튼.classList.add('페이지네이션버튼');
        if (현재_그룹_끝_페이지 >= 총페이지수) {
            다음버튼.disabled = true;
        } else {
            다음버튼.addEventListener('click', () => {
                현재_그룹_시작_페이지 += 페이지네이션_그룹_크기;
                렌더페이지네이션(총페이지수);
                현재페이지 = 현재_그룹_시작_페이지;
                렌더일기목록(document.querySelector('.메뉴-항목.선택됨').dataset.값, 일기검색입력.value, 현재페이지);
                window.scrollTo({ top: 카드목록_offsetTop, behavior: 'smooth' });
            });
        }
        페이지네이션컨테이너.appendChild(다음버튼);
    };

    렌더일기목록(); // 초기 페이지 로드

    // 디바운스 함수
    const 디바운스 = (함수, 지연시간) => {
        let 타이머;
        return function (...args) {
            clearTimeout(타이머);
            타이머 = setTimeout(() => {
                함수.apply(this, args);
            }, 지연시간);
        };
    };

    // 검색 실행 함수
    const 검색실행 = () => {
        const 검색어 = 일기검색입력.value;
        const 현재필터값 = document.querySelector('.메뉴-항목.선택됨').dataset.값;
        현재페이지 = 1; // 검색 시 첫 페이지로 리셋
        현재_그룹_시작_페이지 = 1; // 검색 시 첫 페이지 그룹으로 리셋
        렌더일기목록(현재필터값, 검색어, 현재페이지);
    };

    // --- 제출 버튼 활성화/비활성화 기능 ---
    const 양식입력여부확인 = () => {
        const isMoodSelected = Array.from(기분라디오).some(radio => radio.checked);
        const isTitleFilled = 제목텍스트.value.trim() !== "";
        const isContentFilled = 내용텍스트.value.trim() !== "";
        등록하기버튼.disabled = !(isMoodSelected && isTitleFilled && isContentFilled);
    };

    // --- 일기 등록 기능 ---
    const 일기등록제출기능 = () => {
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

    // --- 이벤트 리스너 그룹화 ---
    // 검색 입력에 디바운스 적용
    일기검색입력.addEventListener("input", 디바운스(검색실행, 1000));

    // 모달 여는 버튼
    document.querySelector("#일기쓰기모달여는버튼").addEventListener("click", () => 모달열기('일기쓰기모달'));
    document.querySelector("#일기쓰기닫기버튼").addEventListener("click", () => 모달열기('일기등록취소모달'));

    // 모달 닫는 버튼 및 초기화
    document.querySelector("#일기계속작성버튼").addEventListener("click", () => 모달닫기('일기등록취소모달'));
    document.querySelector("#일기등록취소버튼").addEventListener("click", () => {
        제목텍스트.value = "";
        내용텍스트.value = "";
        기분라디오.forEach(radio => radio.checked = false);
        모달닫기('일기등록취소모달');
        모달닫기('일기쓰기모달');
    });
    document.querySelector("#일기삭제취소버튼").addEventListener("click", () => 모달닫기('일기삭제확인모달'));

    // 모달 배경 클릭 시 닫기
    일기쓰기모달.addEventListener("click", () => 모달닫기('일기쓰기모달'));
    일기등록취소모달.addEventListener("click", () => 모달닫기('일기등록취소모달'));
    일기삭제확인모달.addEventListener("click", () => 모달닫기('일기삭제확인모달'));

    // 모달 패널(내부 컨텐츠) 클릭 시 이벤트 버블링 방지
    document.querySelectorAll(".모달패널").forEach(패널 => {
        패널.addEventListener("click", e => e.stopPropagation());
    });

    // ESC 키 입력 시 모달 닫기 로직
    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            if (일기등록취소모달.style.display === "flex") {
                모달닫기('일기등록취소모달');
            } else if (일기쓰기모달.style.display === "flex") {
                모달열기('일기등록취소모달');
            } else {
                모달닫기('일기삭제확인모달');
            }
        }
    });

    // 일기 쓰기 폼 관련 이벤트
    등록하기버튼.addEventListener("click", 일기등록제출기능);
    제목텍스트.addEventListener("input", 양식입력여부확인);
    내용텍스트.addEventListener("input", 양식입력여부확인);
    기분라디오.forEach(radio => radio.addEventListener("change", 양식입력여부확인));

    // 카드 목록 클릭 이벤트 (상세 보기 및 삭제)
    카드목록.addEventListener("click", (e) => {
        const card = e.target.closest(".카드");
        if (!card) return;

        if (e.target.classList.contains("카드삭제버튼")) {
            e.stopPropagation();
            삭제할일기 = card.dataset.id;
            모달열기('일기삭제확인모달');
        } else {
            const diaryId = card.dataset.id;
            location.href = `detail.html?id=${diaryId}`;
        }
    });

    // 일기 삭제 확인 버튼 클릭 이벤트
    document.querySelector("#일기삭제확인버튼").addEventListener("click", () => {
        if (삭제할일기) {
            const 삭제후일기목록 = 일기목록.filter(일기 => 일기.고유아이디 !== Number(삭제할일기));
            localStorage.setItem("민지의일기목록", JSON.stringify(삭제후일기목록));
            location.reload();
        }
    });

    // 커스텀 드롭다운 관련 기능
    // 페이지 로드 시 첫 번째 항목 기본 선택
    const 기본항목 = 메뉴항목들[0];
    드롭다운버튼.textContent = 기본항목.textContent;
    기본항목.classList.add('선택됨');

    메뉴항목들.forEach(항목 => {
        항목.addEventListener('click', function () {
            document.querySelector('.메뉴-항목.선택됨')?.classList.remove('선택됨');
            this.classList.add('선택됨');
            드롭다운버튼.textContent = this.textContent;
            드롭다운토글.checked = false;
            // 필터 변경 시 첫 페이지 그룹으로 리셋
            현재페이지 = 1;
            현재_그룹_시작_페이지 = 1;
            const 검색어 = 일기검색입력.value;
            렌더일기목록(this.dataset.값, 검색어, 현재페이지);
        });
    });

    // 스크롤 이벤트 (컨트롤바 색상 변경)
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 카드목록_offsetTop) {
            신규기분필터.classList.add('scrolled');
            프로그레시브블러.classList.add('scrolled');
        } else {
            신규기분필터.classList.remove('scrolled');
            프로그레시브블러.classList.remove('scrolled');
        }
    });
});