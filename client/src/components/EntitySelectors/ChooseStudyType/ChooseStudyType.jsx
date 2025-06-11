import { useMyContext } from '../../../services/MyProvider/MyProvider';
import './ChooseStudyType.css'

const ChooseStudyType = ({ saveStudyType }) => {

    const { contextState, updateContextState } = useMyContext();
    
    const handleStudyTypeClick = (type) => {
        saveStudyType(type);
        updateContextState('studyType', type)
    };
    return (
        <div className='form_study'>
            <h2>Выберите форму обучения</h2>
            <div className="form_study_buttons">
                <button className='button_study' onClick={() => handleStudyTypeClick('Очное')}>Очное</button>
                <button className='button_study' onClick={() => handleStudyTypeClick('Заочное')}>Очно-заочное</button>
                <button className='button_study' onClick={() => handleStudyTypeClick('Дистанционное')}>Дистанционное</button>
            </div>
        </div>
    )
}

export default ChooseStudyType;