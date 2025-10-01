import './style.css'

const BackButton = ({ onClick }) => {
    return (
        <button className="button-back" onClick={onClick}>
            Назад
        </button>
    )
}
export default BackButton;