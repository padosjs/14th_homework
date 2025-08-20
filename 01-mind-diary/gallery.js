document.addEventListener("DOMContentLoaded", () => {
    // DOM 요소 변수
    const 사진목록 = document.querySelector(".사진목록");
    const 신규사진필터 = document.querySelector("#신규사진필터");
    const 프로그레시브블러 = document.querySelector("#프로그레시브블러");
    const 드롭다운_메뉴_항목들 = 신규사진필터.querySelectorAll('.메뉴-항목');
    const 드롭다운_버튼 = 신규사진필터.querySelector('.드롭다운-버튼');
    const 강아지보여주는곳 = document.getElementById("강아지보여주는곳");
    const 드롭다운토글 = document.getElementById('드롭다운-토글');

    // 상태 변수
    let isLoading = false;
    let 현재_스켈레톤_개수 = 0;
    let isThrottled = false; // 스로틀을 위한 변수 추가

    // --- 스켈레톤 UI 관련 함수 ---

    const 개별_스켈레톤_생성 = (인덱스) => {
        const 스켈레톤아이템 = document.createElement('div');
        스켈레톤아이템.className = '스켈레톤아이템';
        스켈레톤아이템.id = `스켈레톤_${인덱스}`;
        return 스켈레톤아이템;
    };

    const 스켈레톤생성 = () => {
        const 스켈레톤컨테이너 = document.createElement('div');
        스켈레톤컨테이너.className = '스켈레톤컨테이너';
        스켈레톤컨테이너.id = '현재_스켈레톤_로딩';

        for (let i = 0; i < 10; i++) {
            스켈레톤컨테이너.appendChild(개별_스켈레톤_생성(i));
        }
        현재_스켈레톤_개수 = 10;
        사진목록.appendChild(스켈레톤컨테이너);
    };

    const 개별_스켈레톤_제거 = (인덱스) => {
        const 개별스켈레톤 = document.getElementById(`스켈레톤_${인덱스}`);
        if (개별스켈레톤) {
            개별스켈레톤.remove();
            현재_스켈레톤_개수--;

            if (현재_스켈레톤_개수 <= 0) {
                const 스켈레톤컨테이너 = document.getElementById('현재_스켈레톤_로딩');
                if (스켈레톤컨테이너) 스켈레톤컨테이너.remove();
            }
        }
    };

    const 전체_스켈레톤_제거 = () => {
        const 현재스켈레톤 = document.getElementById('현재_스켈레톤_로딩');
        if (현재스켈레톤) 현재스켈레톤.remove();
        현재_스켈레톤_개수 = 0;
    };

    // --- 이미지 로딩 및 처리 ---

    const 강아지불러오는기능 = () => {
        // 스로틀 적용
        if (isThrottled) return;
        isThrottled = true;

        setTimeout(() => {
            isThrottled = false;
        }, 1000);

        if (isLoading) return;
        isLoading = true;

        스켈레톤생성();

        fetch("https://dog.ceo/api/breeds/image/random/10")
            .then(response => response.json())
            .then(data => {
                const 이미지다운로드주소들 = data.message;
                let 로드완료개수 = 0;

                이미지다운로드주소들.forEach((src, 인덱스) => {
                    const img = new Image();

                    const 로딩완료처리 = () => {
                        로드완료개수++;
                        if (로드완료개수 >= 이미지다운로드주소들.length) {
                            isLoading = false;
                        }
                    };

                    img.onload = () => {
                        const 이미지요소 = document.createElement('img');
                        이미지요소.src = src;
                        이미지요소.className = '강아지사진';
                        강아지보여주는곳.appendChild(이미지요소);

                        개별_스켈레톤_제거(인덱스);
                        로딩완료처리();
                    };

                    img.onerror = () => {
                        개별_스켈레톤_제거(인덱스);
                        로딩완료처리();
                    };

                    img.src = src;
                });

                setTimeout(() => {
                    if (isLoading) {
                        isLoading = false;
                        전체_스켈레톤_제거();
                    }
                }, 5000);
            })
            .catch(error => {
                console.error("사진을 불러오는 중 오류 발생:", error);
                전체_스켈레톤_제거();
                isLoading = false;
            });
    };

    // --- 드롭다운 메뉴 및 스타일 ---

    const 사진스타일변경 = (selectedValue) => {
        사진목록.classList.remove('가로형', '세로형');
        if (selectedValue === '가로형' || selectedValue === '세로형') {
            사진목록.classList.add(selectedValue);
        }
    };

    // --- 초기 설정 및 이벤트 리스너 ---

    // 초기 이미지 로드
    강아지불러오는기능();

    // 드롭다운 초기 상태 설정
    const 기본항목 = 드롭다운_메뉴_항목들[0];
    드롭다운_버튼.textContent = 기본항목.textContent;
    기본항목.classList.add('선택됨');

    // 드롭다운 항목 클릭 이벤트
    드롭다운_메뉴_항목들.forEach(item => {
        item.addEventListener("click", () => {
            드롭다운_메뉴_항목들.forEach(el => el.classList.remove('선택됨'));
            item.classList.add('선택됨');
            const selectedValue = item.dataset.값;
            드롭다운_버튼.textContent = selectedValue;
            사진스타일변경(selectedValue);
            드롭다운토글.checked = false;
        });
    });

    // 스크롤 이벤트
    window.addEventListener('scroll', () => {
        const 사진목록_offsetTop = 사진목록.offsetTop;

        if (window.scrollY >= 사진목록_offsetTop) {
            신규사진필터.classList.add('scrolled');
            프로그레시브블러.classList.add('scrolled');
        } else {
            신규사진필터.classList.remove('scrolled');
            프로그레시브블러.classList.remove('scrolled');
        }

        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if ((scrollTop + clientHeight) >= (scrollHeight * 0.8) && !isLoading) {
            강아지불러오는기능();
        }
    });
});