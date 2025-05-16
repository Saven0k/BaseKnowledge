import { useEffect, useState } from "react";

import './style.css'
import { getVisitorsCount } from "../../services/ApiToServer/visitors";
import { getTeacherVisits, getTotalVisits } from "../../services/ApiToServer/users";

const Statistics = ({ ready }) => {
    const [studentCount, setStudentCount] = useState()
    const [teacherCount, setTeacherCount] = useState()

    async function save() {
        const countTc = await getTotalVisits()
        const countSt = await getVisitorsCount()
        setTeacherCount(countTc || 0)
        setStudentCount(countSt)
    }

    useEffect(() => {
        save()
    }, [])

    return (
        <div className="statistic_block">
            <h2>Статистика посещений: </h2>
            <h3>Колличество посещений учителей: {teacherCount}</h3>
            <h3>Колличество посещений студентов: {studentCount}</h3>
        </div>

    )
}

export default Statistics;