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

    // Смена роли
    const handleRoleChange = (role) => {
        setActiveRole(role);
        setRoleContext(null);

        if (role === 'teacher' || role === 'all') {
            setRoleContext(["null"]);
        }
    };

    // Рендер селектора
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

    // Проверка показа постов
    const shouldShowPosts = () => {
        if (activeRole === 'teacher' || activeRole === 'all') return true;
        return roleContext !== null && roleContext.length > 0;
    };

    return (
        <div className="post-selector">
            <div className="post-selector__buttons">
                <button
                    className={`post-selector__button ${activeRole === 'teacher' ? 'post-selector__button--selected' : ''}`}
                    onClick={() => handleRoleChange('teacher')}
                >
                    Посты Учителей
                </button>

                <button
                    className={`post-selector__button ${activeRole === 'all' ? 'post-selector__button--selected' : ''}`}
                    onClick={() => handleRoleChange('all')}
                >
                    Общие посты
                </button>

                <button
                    className={`post-selector__button ${activeRole === 'student' ? 'post-selector__button--selected' : ''}`}
                    onClick={() => handleRoleChange('student')}
                >
                    Посты студентов
                </button>

                <button
                    className={`post-selector__button ${activeRole === 'city' ? 'post-selector__button--selected' : ''}`}
                    onClick={() => handleRoleChange('city')}
                >
                    Посты по городам
                </button>

                <button
                    className={`post-selector__button ${activeRole === 'form' ? 'post-selector__button--selected' : ''}`}
                    onClick={() => handleRoleChange('form')}
                >
                    Посты по форме обучения
                </button>
            </div>

            <div className="post-selector__selectors">
                {['student', 'city', 'form'].includes(activeRole) && renderSelectorComponent()}
            </div>

            <div className="post-selector__status">
                <button
                    className={`post-selector__status-button ${status === "1" ? "post-selector__status-button--selected" : ''}`}
                    onClick={() => setStatus("1")}
                >
                    Опубликованные посты
                </button>
                <button
                    className={`post-selector__status-button ${status === "0" ? "post-selector__status-button--selected" : ''}`}
                    onClick={() => setStatus("0")}
                >
                    Скрытые посты
                </button>
            </div>

            <div className="post-selector__posts">
                {shouldShowPosts() && (
                    <List
                        type={activeRole}
                        data={{
                            role: activeRole,
                            role_context: Array.isArray(roleContext) ? roleContext : roleContext.split(),
                            status: status
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default PostsSelector;