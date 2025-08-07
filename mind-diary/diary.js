document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM 요소 선택
    const cardListElement = document.querySelector('.카드목록');
    const registerButton = document.querySelector('.일기등록버튼');
    const moodRadios = document.querySelectorAll('input[name="mood"]');
    const titleInput = document.querySelector('.일기쓰기패널 .입력창[type="text"]');
    const contentTextarea = document.querySelector('.일기쓰기패널 .입력창[rows="4"]');

    // 2. 일기 데이터를 저장할 배열
    const diaryData = [
        { emotion: '슬퍼요', title: '타이틀 영역입니다.' },
        { emotion: '놀랐어요', title: '타이틀 영역입니다.' },
        { emotion: '화나요', title: '타이틀 영역입니다.' },
        { emotion: '행복해요', title: '타이틀 영역입니다.' },
        { emotion: '기타', title: '타이틀 영역입니다.' },
        { emotion: '행복해요', title: '타이틀 영역입니다.' }
    ];

    // 3. 일기 목록을 화면에 렌더링하는 함수
    function renderDiaries() {
        cardListElement.innerHTML = '';
        
        diaryData.forEach((diary, index) => {
            const card = document.createElement('div');
            card.classList.add('카드');
            card.dataset.index = index;

            const emotionClassMap = {
                '슬퍼요': '슬퍼요', '놀랐어요': '놀랐어요', '화나요': '화나요', 
                '행복해요': '행복해요', '기타': '기타'
            };
            const thumbnailClassMap = {
                '슬퍼요': '카드썸네일1', '놀랐어요': '카드썸네일2', '화나요': '카드썸네일3',
                '행복해요': '카드썸네일4', '기타': '카드썸네일5'
            };
            const emotionClass = emotionClassMap[diary.emotion] || '';
            const thumbnailClass = thumbnailClassMap[diary.emotion] || '';

            card.innerHTML = `
                <div class="${thumbnailClass}"></div>
                <div class="카드텍스트컨테이너">
                    <div class="감정과날짜">
                        <span class="${emotionClass}">${diary.emotion}</span>
                    </div>
                    <div class="타이틀">
                        ${diary.title}
                    </div>
                </div>
            `;
            cardListElement.appendChild(card);

            card.addEventListener('click', () => {
                showDiaryDetail(index);
            });
        });
    }

    // 4. 일기 등록 버튼 활성화/비활성화
    function checkFormValidity() {
        const selectedMood = Array.from(moodRadios).some(radio => radio.checked);
        const titleFilled = titleInput.value.trim() !== '';
        const contentFilled = contentTextarea.value.trim() !== '';
        registerButton.disabled = !(selectedMood && titleFilled && contentFilled);
        registerButton.style.backgroundColor = registerButton.disabled ? '#C7C7C7' : '#007bff';
        registerButton.style.color = registerButton.disabled ? '#fff' : '#fff';
    }

    // 5. 일기 등록 함수
    function registerDiary() {
        const selectedMood = document.querySelector('input[name="mood"]:checked');
        const title = titleInput.value.trim();
        const content = contentTextarea.value.trim();
        
        if (selectedMood && title && content) {
            const newDiary = {
                emotion: selectedMood.value,
                title: title,
                content: content
            };

            diaryData.unshift(newDiary);
            renderDiaries();
            
            titleInput.value = '';
            contentTextarea.value = '';
            moodRadios.forEach(radio => radio.checked = false);
            checkFormValidity();
        }
    }

    // 6. 일기 상세 정보 표시 함수
    function showDiaryDetail(index) {
        const diary = diaryData[index];
        if (diary) {
            alert(`
                감정: ${diary.emotion}
                제목: ${diary.title}
                내용: ${diary.content || '내용 없음'}
            `);
        }
    }

    // 7. 이벤트 리스너 연결
    registerButton.addEventListener('click', registerDiary);
    moodRadios.forEach(radio => radio.addEventListener('change', checkFormValidity));
    titleInput.addEventListener('input', checkFormValidity);
    contentTextarea.addEventListener('input', checkFormValidity);

    renderDiaries();
});