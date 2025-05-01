import { getVisitorsCount, getVisitsTeacher } from '../../services/workWithBd';
import { useEffect, useState } from "react";

import './style.css'

const Statistics = ({ready}) => {
    const [studentCount, setStudentCount] = useState()
    const [teacherCount, setTeacherCount] = useState()

    async function save() {
		const countSt = await  getVisitorsCount()
		const countTc = await  getVisitsTeacher()

        setStudentCount(countSt)
        setTeacherCount(countTc)
	}

	useEffect(() => {
        if (ready) {
            save()
        }
	}, [ready])

    return (
        <>
            <h2>Колличество посещений студентов: {studentCount}</h2>
            <h2>Колличество посещений учителей: {teacherCount}</h2>
        </>
    )
}

export default Statistics;