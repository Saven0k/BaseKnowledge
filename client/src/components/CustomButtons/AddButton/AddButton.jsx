import './style.css'

const AddButton = ({ text, disabled }) => {
    return (
        <button className="add_button center" type="submit" disabled={disabled}>
            {text}
        </button>
    )
}

export default AddButton;