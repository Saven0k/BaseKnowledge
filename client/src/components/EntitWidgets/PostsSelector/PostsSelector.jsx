import { useState } from 'react';
import './PostsSelector.css';
import GroupSelector from '../GroupSelector/GroupSelector';
import CitySelector from '../CitySelector/CitySelector';
import FormSelector from '../FormSelector/FormSelector';
import List from '../../List/List';

const PostsSelector = () => {
    const [activeRole, setActiveRole] = useState('teacher');
    const [roleContext, setRoleContext] = useState(["null"]);
    const [status, setStatus] = useState('1');

    const handleRoleChange = (role) => {
        setActiveRole(role);
        setRoleContext(null); // Сбрасываем контекст при смене роли

        // Для ролей teacher и all сразу обновляем данные
        if (role === 'teacher' || role === 'all') {
            setRoleContext(["null"]); // Устанавливаем явное значение для немедленного рендера
        }
    };

    const renderSelectorComponent = () => {
        switch (activeRole) {
            case 'student':
                return <GroupSelector saveGroupList={setRoleContext} />;
            case 'city':
                return <CitySelector saveCity={setRoleContext} />;
            case 'form':
                return <FormSelector saveForm={setRoleContext} />;
            default:
                return null;
        }
    };

    const shouldShowPosts = () => {
        // Для teacher и all посты показываем сразу
        if (activeRole === 'teacher' || activeRole === 'all') return true;
        // Для остальных ролей только если есть контекст
        return roleContext !== null && roleContext.length > 0;
    };

    return (
        <div className="post_selector">
            <div className="select_buttons">
                {/* Кнопка для учителей */}
                <button
                    className={`select_button ${activeRole === 'teacher' ? 'selected' : ''}`}
                    onClick={() => handleRoleChange('teacher')}
                >
                    Посты Учителей
                </button>

                {/* Кнопка для общих постов */}
                <button
                    className={`select_button ${activeRole === 'all' ? 'selected' : ''}`}
                    onClick={() => handleRoleChange('all')}
                >
                    Общие посты
                </button>

                {/* Кнопка для студентов */}
                <button
                    className={`select_button ${activeRole === 'student' ? 'selected' : ''}`}
                    onClick={() => handleRoleChange('student')}
                >
                    Посты студентов
                </button>

                {/* Кнопка для городов */}
                <button
                    className={`select_button ${activeRole === 'city' ? 'selected' : ''}`}
                    onClick={() => handleRoleChange('city')}
                >
                    Посты по городам
                </button>

                {/* Кнопка для формы обучения */}
                <button
                    className={`select_button ${activeRole === 'form' ? 'selected' : ''}`}
                    onClick={() => handleRoleChange('form')}
                >
                    Посты по форме обучения
                </button>
            </div>
            <div className="selectors">
                {/* Отображаем селектор, если выбрана соответствующая роль */}
                {['student', 'city', 'form'].includes(activeRole) && renderSelectorComponent()}

            </div>

            {/* Переключатель статуса */}
            <div className="status_switch">
                <button
                    className={`publish_posts__button button_sw ${status === "1" ? "selected" : ''}`}
                    onClick={() => setStatus("1")}
                >
                    Опубликованные посты
                </button>
                <button
                    className={`hidden_posts__button button_sw ${status === "0" ? "selected" : ''}`}
                    onClick={() => setStatus("0")}
                >
                    Скрытые посты
                </button>
            </div>
            <div className="show_posts">
                {/* Отображаем посты, если выполняется условие */}
                {shouldShowPosts() && (
                    <List
                        type={activeRole}
                        data={{
                            role: activeRole,
                            role_context:  Array.isArray(roleContext) ? roleContext : roleContext.split(),
                            status: status
                        }}
                    />
                )}

            </div>
        </div>
    );
};

export default PostsSelector;