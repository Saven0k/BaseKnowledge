import './style.css'

import { useEffect, useState } from "react";

import { getVisitorsCount } from "../../services/ApiToServer/visitors";
import { getTotalVisits } from "../../services/ApiToServer/users";

const Statistics = () => {
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
        <div className="statistic-block">
            <span className="statistic-block__text">Статистика посещений: </span>
            <span className="statistic-block__text">Колличество посещений учителей: {teacherCount}</span>
            <span className="statistic-block__text">Колличество посещений студентов: {studentCount}</span>
        </div>

    )
}

export default Statistics;