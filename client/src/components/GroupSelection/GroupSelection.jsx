import { useEffect } from 'react';
import './GroupSelection.css'


const GroupSelection = () => {
    useEffect(() => {
        // Вызываем функцию получения специальностей
        
    }, [])

    return (
        <div className="specialties">
            {
                specialties.map((specialti, index) => (
                    <div className="specialti_item" key={index}>
                        {specialti.name} 
                    </div>
                ))
            }
        </div>
    )

}

export default GroupSelection;