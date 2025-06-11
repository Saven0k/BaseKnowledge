import { useEffect, useState } from 'react'
import './ControlCollegeGroups.css'
import trash from './red_trash.svg'
import { addCollegeGroup, deleteCollegeGroup, getCollegeGroups } from '../../../services/ApiToServer/collegeGroups'
import GroupSelector from '../../EntitWidgets/GroupSelector/GroupSelector'
import FormSelector from '../../EntitWidgets/FormSelector/FormSelector'
import CourseSelector from '../../EntitWidgets/CourseSelector/CourseSelector'
import ControlSpecialities from '../ControlSpecialities/ControlSpecialities'
import SpecialitySelector from '../../EntitWidgets/SpecialitySelector/SpecialitySelector'

const ControlCollegeGroups = () => {
    const [groups, setGroups] = useState([])
    const [newGroupName, setNewGroupName] = useState('')
    const [speciality, setSpeciality] = useState('')
    const [studyType, setStudyType] = useState('')
    const [course, setCourse] = useState('')

    const prepairData = async () => {
        const groupsB = await getCollegeGroups();
        if (groupsB.length === 0) {
            setGroups([])
        }
        else {
            setGroups(groupsB)
        }
    }

    useEffect(() => {
        prepairData()
    }, [])

    const handleSaveGroup = async () => {
        console.log(course,speciality,studyType)
        const data = await addCollegeGroup(newGroupName)
        setGroups([...groups, { name: data.response.collegeGroupName, id: data.response.groupId }])
        setNewGroupName('')
        setCourse('')
        setSpeciality('')
        setStudyType('')
    }

    const handleDeleteGroup = (id) => {
        setGroups(groups.filter(group => group.id !== id))
        deleteCollegeGroup(id)
    }

    return (
        <div className='groups_component'>

            <div className="group_list">
                {groups.length !== 0 ?
                    groups.map((group, index) => (
                        <div className="group_block" key={index}>
                            <h3>{group.name}</h3>
                            <div className="delete_group">
                                <button
                                    className='button_delete_group'
                                    onClick={() => handleDeleteGroup(group.id)}
                                >
                                    <img height={24} src={trash} alt="Delete" className='delete_group_img' />
                                </button>
                            </div>
                        </div>
                    ))
                    :
                    <p>Ничего нет</p>
                }
            </div>
            <div className="group_create">
                <h4>Добавление новой группы </h4>
                <div className="new_group_block">
                    <input
                        type="text"
                        className="group_name"
                        onChange={(e) => setNewGroupName(e.target.value)}
                        value={newGroupName}
                        minLength={5}
                        maxLength={15}
                        placeholder='Что-то....'
                    />  
                    <FormSelector saveForm={setStudyType} form={studyType} />
                    <CourseSelector saveCourse={setCourse} course={course}/>
                    <SpecialitySelector saveSpeciality={setSpeciality} speciality={speciality}/>
                    <button className='button_done' onClick={() => handleSaveGroup()}>
                        Сохранить
                    </button>

                </div>
            </div>
        </div>
    )
}
export default ControlCollegeGroups;