import { useMyContext } from '../../../services/MyProvider/MyProvider';
import './SelectionBox.css'

const SelectionBox = ({ title, setEducationLevel, setRole, roleList }) => {

    const { contextState, updateContextState } = useMyContext();
    const setContent = (educationLevel, role) => {
        updateContextState('role', role)
        updateContextState('educationLevel',educationLevel)
        setRole(role)
        setEducationLevel(educationLevel)
    }
    return (
        <div className="selection_box">
            <div className="box_title">
                {title}
            </div>
            <div className="box_buttons">
                {roleList.map((role,index) => (
                    <button key={index} onClick={() => setContent(title, role.title)} className="box_button">
                        {role.role}
                    </button>
                ))
                }
            </div>

        </div >
    )
}

export default SelectionBox;