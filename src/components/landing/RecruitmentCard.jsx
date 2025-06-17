import {Star} from 'lucide-react';
import styles from './RecruitmentCard.module.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function RecruitmentCard({notice, onScrapToggle}){
    const{
        id,
        instNm,
        recrutPbancTtl,
        workRgnNmLst,
        acbgCondNmLst,
        recrutSeNm,
        pbancEndYmd,
        viewCnt,
        isScrap,
    } = notice;

    const navigate = useNavigate();
    const [scrapState, setScrapState] = useState(isScrap);
    const [imgError, setImgError] = useState(false);
    const [triedExtIdx, setTriedExtIdx] = useState(0);
    const extensions = ['.svg', '.jfif', '.webp'];

    const getLogoPath = () => (
        triedExtIdx < extensions.length ? `/logos/${instNm}${extensions[triedExtIdx]}` : null
    );

    const handleImageError = () => {
        if (triedExtIdx < extensions.length - 1) {
        setTriedExtIdx(triedExtIdx + 1);
        } else {
        setImgError(true);
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                {!imgError && getLogoPath() ? (
                            <img src={getLogoPath()} alt={instNm} className={styles.companyLogo} onError={handleImageError} />
                          ) : (
                            <div className={styles.defaultLogo}>{instNm}</div>
                          )
                }
                <span className={styles.company}>{instNm}</span>
                <Star
                    className={`${styles.starIcon} ${scrapState ? styles.active : ''}`}
                    onClick={() => onScrapToggle(id, scrapState, setScrapState)}
                    fill={scrapState ? '#FFD700' : 'none'}
                />
            </div>
            <div className={styles.content} onClick={() => navigate(`/recruitment-notice/${id}`)}>
                <div className={styles.title}>{recrutPbancTtl}</div>
                <div className={styles.subInfo}>{workRgnNmLst} <br/> {acbgCondNmLst} / {recrutSeNm}</div>
            </div>
            <div className={styles.footer}>
                <span>조회수 {viewCnt}</span>
                {calculateDday(pbancEndYmd) == 0 ?
                    <span>오늘 마감!</span>
                    :
                    calculateDday(pbancEndYmd) < 0 ?
                    <span>마감된 공고입니다.</span>
                    :
                    <span>D-{calculateDday(pbancEndYmd)}</span>
                }
            </div>
        </div>
    );
}

function calculateDday(endDate) {
    const today = new Date();
    const end = new Date(endDate);
    const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    return diff;
}