import './style.css'
const SaveButton = ({idActivePost, onClick}) => {
    return (
        <button
            className="save"
            onClick={onClick}
            style={{
                display: idActivePost != null ? "flex" : "none",
            }}
        >
            Сохранить
        </button>
    )
}

export default SaveButton;