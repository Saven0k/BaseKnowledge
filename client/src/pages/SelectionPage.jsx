import { useEffect } from "react";
import BigTitle from "../components/CustomTitles/BigTitle/BigTitle";
import Header from "../components/header/Header";
import SelectionRoleComponent from "../components/SelectionRoleComponent/SelectionRoleComponent";
import { useNavigate } from "react-router-dom";
const SelectionPage = () => {
    const navigate = useNavigate();

    useEffect(() => {

        const user = localStorage.getItem("user");
        if (user) {
            navigate('/student');
        }
    }, [navigate]);

    return (
        <>
            <Header />
            <BigTitle style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: '700',
                lineHeight: '1.2',
                textAlign: 'center',
                margin: '2rem 0',
                padding: '0 1rem',
                transition: 'all 0.3s ease',
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '-0.02em'
            }}>
                Добро пожаловать в Базу Знаний
            </BigTitle>
            <SelectionRoleComponent />
        </>
    );
};

export default SelectionPage;