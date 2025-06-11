import { BrowserRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/404";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import TeacherPage from "./pages/TeacherPage";
import StudentPage from "./pages/StudentPage";
import SelectionPage from "./pages/SelectionPage";
import { MyProvider } from "./services/MyProvider/MyProvider";
import { CuratorPage } from './pages/CuratorPage';
import PostPage from "./pages/PostPage";
import EditorPage from "./pages/EditorPage";
import WorthPage from "./pages/WorthPage";
import MissionsPage from "./pages/MissionsPage";

function App() {
	return (
		<MyProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/student" element={<StudentPage />} />
					<Route path="/post/:id" element={<PostPage />} />
					<Route path="/teacher" element={<TeacherPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/admin/page" element={<AdminPage />} />
					<Route path="/selection" element={<SelectionPage />} />
					<Route path="*" element={<SelectionPage />} />
					<Route path="/404" element={<ErrorPage />} />
					<Route path="/curatorPage" element={<CuratorPage />} />
					<Route path="/editor" element={<EditorPage />} />
					<Route path="/missions" element={<MissionsPage />} />
					<Route path="/worth" element={<WorthPage />} />
					<Route path="/studentSchool" element={<StudentPage />} />
				</Routes>
			</BrowserRouter>
		</MyProvider>
	);

}
export default App;
