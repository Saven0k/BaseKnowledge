import './SelectionBox.css'

const SelectionBox = ({ title, content, setRole, roleContext }) => {
    return (
        <div className="selection_box">
            <div className="box_title">
                {title}
            </div>
            {
                content === 'school' &&
                <div className="box_buttons">

                    <button onClick={() => setRole()} className="box_button">
                        Школьник
                    </button>
                    <button onClick={() => setRole()} className="box_button">
                        Учитель
                    </button>

                </div>
            }
        </div>
    )
}

export default SelectionBox;