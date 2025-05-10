import BigTitle from "../components/CustomTitles/BigTitle/BigTitle";
import SelectionRoleComponent from "../components/SelectionRoleComponent/SelectionRoleComponent";

const SelectionPage = () => {
    // localStorage.clear()
    return (
        <>
            <BigTitle>Добро пожаловать в Базу Знаний</BigTitle>
            <SelectionRoleComponent />
        </>
    )
}
export default SelectionPage;