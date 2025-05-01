import './style.css'

const AddButton = ({ text, disabled }) => {
    return (
        <button className="button center" type="submit" disabled={disabled}>
            {text}
        </button>
    )
}

export default AddButton;