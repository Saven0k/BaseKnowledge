import EditorComponent from "../components/EditorComponent/EditorComponent";
import { useMyContext } from "../services/MyProvider/MyProvider";

const EditorPage = () => {
    const {contextState, updateContextState } = useMyContext()
    if (contextState.role === "Редактор" || contextState.role === 'admin') {
        return (
            <div className="AdminPage">
                <EditorComponent />
            </div>
        );
    };
    window.location.href = '/index';
};

export default EditorPage;