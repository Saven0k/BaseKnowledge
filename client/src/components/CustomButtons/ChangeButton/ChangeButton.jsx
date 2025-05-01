import './style.css'

const ChangeButton = ({onClick }) => {
    return (
        <button
            className="change"
            onClick={onClick}
        >
            Редактировать
        </button>
    )
}

export default ChangeButton;