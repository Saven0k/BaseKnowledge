import { useEffect } from "react";
import Header from "../components/header/Header";
import TeacherBranch from "../components/TeacherBranch/TeacherBranch";
import { getTeacherVisits, updateTeacherVisits } from "../services/ApiToServer/users";

const TeacherPage = () => {
    if (localStorage.getItem("role") === "teacher") {
        async function save() {
            const res = await getTeacherVisits(localStorage.getItem("email"))
            updateTeacherVisits(localStorage.getItem("email"), res + 1)
        }

        useEffect(() => {
            save()
        }, [])

        return (
            <div className="teacherPage">
                <Header />
                <TeacherBranch />
            </div>
        )
    }
    window.location.href = '/index'
}

export default TeacherPage;