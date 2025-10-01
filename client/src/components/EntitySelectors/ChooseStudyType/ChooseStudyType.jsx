import { useMyContext } from '../../../services/MyProvider/MyProvider';
import './ChooseStudyType.css'

const ChooseStudyType = ({ saveStudyType }) => {
    const { updateContextState } = useMyContext();

    // Выбор формы обучения
    const handleStudyTypeClick = (type) => {
        saveStudyType(type);
        updateContextState('studyType', type)
    };

    return (
        <div className='choose-study-type'>
            <h2 className='choose-study-type__title'>Выберите форму обучения</h2>
            <div className="choose-study-type__buttons">
                <button className='choose-study-type__button' onClick={() => handleStudyTypeClick('Очное')}>Очное</button>
                <button className='choose-study-type__button' onClick={() => handleStudyTypeClick('Заочное')}>Очно-заочное</button>
                <button className='choose-study-type__button' onClick={() => handleStudyTypeClick('Дистанционное')}>Дистанционное</button>
            </div>
        </div>
    )
}

export default ChooseStudyType;