import styles from './CorrectionPage.module.css'
import MyContent from '../../components/correction/MyContent';
import AiCorrection from '../../components/correction/AiCorrection';

import { useState } from 'react';

export default function CorrectionPage(){
    const [question, setQuestion] = useState('');
    const [content, setContent] = useState('');
    const [selectedContent, setSelectedContent] = useState('');
    //모달창을 열지 유무
    const [isModalOpen, setIsModalOpen] = useState(false);
    return(
        <div className={styles.correctionLayout}>
            <div className={styles.correctionContainer}>
                {/* 질문 내용 적는 영역 */}
                <MyContent 
                    question={question}
                    content={content}
                    selectedContent={selectedContent}
                    isModalOpen={isModalOpen}
                    setQuestion={setQuestion}
                    setContent={setContent}
                />

                {/* 자소서 고르거나 첨삭 받는 영역 */}
                <AiCorrection 
                    question={question}
                    content={content}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    setSelectedContent={setSelectedContent}
                />
            </div>
        </div>
    );
}