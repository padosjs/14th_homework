"use client";

import styles from './styles.module.css';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function TripsWrite() {
    return (
        <div className={styles['main-content']}>
            <div className={styles['page-container']}>
                <h1 className={styles['page-title']}>숙박권 판매하기</h1>

                {/* 상품명 */}
                <div className={styles['input-container']}>
                    <label htmlFor="name" className={`${styles['input-title']} ${styles['required']}`}>
                        상품명 <span className={styles['input-title-asterisk']}>*</span>
                    </label>
                    <input
                        id="name"
                        className={styles['input-text']}
                        type="text"
                        placeholder="상품명을 입력해 주세요."
                    />
                </div>

                <div className={styles['divider']}></div>

                {/* 한줄 요약 */}
                <div className={styles['input-container']}>
                    <label htmlFor="remarks" className={`${styles['input-title']} ${styles['required']}`}>
                        한줄 요약 <span className={styles['input-title-asterisk']}>*</span>
                    </label>
                    <input
                        id="remarks"
                        className={styles['input-text']}
                        type="text"
                        placeholder="상품을 한줄로 요약해 주세요."
                    />
                </div>

                <div className={styles['divider']}></div>

                {/* 상품 설명 */}
                <div className={styles['input-container']}>
                    <label htmlFor="contents" className={`${styles['input-title']} ${styles['required']}`}>
                        상품 설명 <span className={styles['input-title-asterisk']}>*</span>
                    </label>
                    <div className={styles['editor-container']}>
                        {/* Editor Toolbar */}
                        <div className={styles['editor-toolbar']}>
                            <div className={styles['toolbar-group']}>
                                <button type="button" className={styles['toolbar-button']} title="Bold">
                                    <span className={styles['toolbar-icon']}>B</span>
                                </button>
                                <button type="button" className={styles['toolbar-button']} title="Italic">
                                    <span className={styles['toolbar-icon']}>I</span>
                                </button>
                                <button type="button" className={styles['toolbar-button']} title="Underline">
                                    <span className={styles['toolbar-icon']}>U</span>
                                </button>
                                <button type="button" className={styles['toolbar-button']} title="Font Size">
                                    <span className={styles['toolbar-icon']}>A↓</span>
                                </button>
                            </div>
                            <div className={styles['toolbar-group']}>
                                <button type="button" className={styles['toolbar-button']} title="Align Left">
                                    <span className={styles['toolbar-icon']}>≡</span>
                                </button>
                                <button type="button" className={styles['toolbar-button']} title="Align Center">
                                    <span className={styles['toolbar-icon']}>≡</span>
                                </button>
                                <button type="button" className={styles['toolbar-button']} title="Bullets">
                                    <span className={styles['toolbar-icon']}>•</span>
                                </button>
                                <button type="button" className={styles['toolbar-button']} title="Numbering">
                                    <span className={styles['toolbar-icon']}>1.</span>
                                </button>
                            </div>
                            <div className={styles['toolbar-group']}>
                                <button type="button" className={styles['toolbar-button']} title="Link">
                                    <span className={styles['toolbar-icon']}>🔗</span>
                                </button>
                                <button type="button" className={styles['toolbar-button']} title="Image">
                                    <span className={styles['toolbar-icon']}>🖼</span>
                                </button>
                                <button type="button" className={styles['toolbar-button']} title="Video">
                                    <span className={styles['toolbar-icon']}>▶</span>
                                </button>
                                <button type="button" className={styles['toolbar-button']} title="Code">
                                    <span className={styles['toolbar-icon']}>&lt;/&gt;</span>
                                </button>
                            </div>
                        </div>
                        <div className={styles['editor-divider']}></div>
                        {/* Editor Content */}
                        <textarea
                            id="contents"
                            className={styles['editor-textarea']}
                            placeholder="내용을 입력해 주세요."
                            rows={15}
                        />
                    </div>
                </div>

                <div className={styles['divider']}></div>

                {/* 판매 가격 */}
                <div className={styles['input-container']}>
                    <label htmlFor="price" className={`${styles['input-title']} ${styles['required']}`}>
                        판매 가격 <span className={styles['input-title-asterisk']}>*</span>
                    </label>
                    <input
                        id="price"
                        className={styles['input-text']}
                        type="text"
                        placeholder="판매 가격을 입력해 주세요. (원 단위)"
                    />
                </div>

                <div className={styles['divider']}></div>

                {/* 태그 입력 */}
                <div className={styles['input-container']}>
                    <label htmlFor="tags" className={styles['input-title']}>
                        태그 입력
                    </label>
                    <input
                        id="tags"
                        className={styles['input-text']}
                        type="text"
                        placeholder="태그를 입력해 주세요."
                    />
                </div>

                <div className={styles['divider']}></div>

                {/* 주소 및 지도 */}
                <div className={styles['address-map-container']}>
                    {/* 주소 입력 영역 */}
                    <div className={styles['address-section']}>
                        <div className={styles['input-container']}>
                            <label className={`${styles['input-title']} ${styles['required']}`}>
                                주소 <span className={styles['input-title-asterisk']}>*</span>
                            </label>
                            <div className={styles['zipcode-group']}>
                                <input
                                    className={styles['input-text-zipcode']}
                                    type="text"
                                    placeholder="01234"
                                    readOnly
                                />
                                <button type="button" className={styles['zipcode-button']}>
                                    우편번호 검색
                                </button>
                            </div>
                            <input
                                className={styles['input-text']}
                                type="text"
                                placeholder="상세주소를 입력해 주세요."
                            />
                        </div>

                        <div className={styles['coordinate-group']}>
                            <div className={styles['input-container']}>
                                <label className={styles['input-title']}>위도(LAT)</label>
                                <input
                                    className={styles['input-text']}
                                    type="text"
                                    placeholder="주소를 먼저 입력해 주세요."
                                    disabled
                                />
                            </div>
                            <div className={styles['input-container']}>
                                <label className={styles['input-title']}>경도(LNG)</label>
                                <input
                                    className={styles['input-text']}
                                    type="text"
                                    placeholder="주소를 먼저 입력해 주세요."
                                    disabled
                                />
                            </div>
                        </div>
                    </div>

                    {/* 지도 영역 */}
                    <div className={styles['map-section']}>
                        <label className={styles['input-title']}>상세 위치</label>
                        <div className={styles['map-placeholder']}>
                            <p>주소를 먼저 입력해 주세요.</p>
                        </div>
                    </div>
                </div>

                <div className={styles['divider']}></div>

                {/* 사진 첨부 */}
                <div className={styles['input-container']}>
                    <label className={styles['input-title']}>사진 첨부</label>
                    <div className={styles['image-upload-button']}>
                        <PlusIcon className={styles['button-icon']} />
                        <span>클릭해서 사진 업로드</span>
                    </div>
                </div>

                {/* 버튼 그룹 */}
                <div className={styles['button-group']}>
                    <button type="button" className={styles['cancel-button']}>
                        취소
                    </button>
                    <button type="button" className={styles['submit-button']} disabled>
                        등록하기
                    </button>
                </div>
            </div>
        </div>
    );
}
