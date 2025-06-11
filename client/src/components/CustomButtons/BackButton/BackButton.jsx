import './style.css'
const BackButton = ({setRole}) => {
    return (
        <button className="back_button" onClick={() => setRole(null)}>
            Назад
        </button>
    )
}
export default BackButton;