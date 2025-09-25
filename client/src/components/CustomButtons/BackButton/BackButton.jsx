import './style.css'

const BackButton = ({ setRole }) => {
    return (
        <button className="button-back" onClick={() => setRole(null)}>
            Назад
        </button>
    )
}
export default BackButton;