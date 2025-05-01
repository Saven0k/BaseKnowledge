import AdminComponent from "../components/AdminComponent/AdminComponent";
/**
 * React Component - Admin Page
 * @returns Admin Page
 */
const AdminPage = () => {
    if ((localStorage.getItem("role")) === "admin") {
        return (
            <div className="AdminPage">
                <AdminComponent />
            </div>
        );
    };
    window.location.href = '/index';
};
export default AdminPage;