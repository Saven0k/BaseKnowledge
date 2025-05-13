import { useForm } from 'react-hook-form'
import { useState } from 'react';
import './style.css'
import MediumTitle from '../CustomTitles/MediumTitle/MediumTitle';
import { useMyContext } from '../../services/MyProvider/MyProvider';
import { findUser } from '../../services/ApiToServer/users';

const BasicForm = () => {
    const [attempts, setAttempts] = useState(5);
    const { contextState, updateContextState } = useMyContext();
    const [viewPassword, setViewPassword] = useState(false)

    // UseForm, use tags
    const {
        register,
        formState: {
            errors, isValid,
        },
        reset,
        handleSubmit,
        getValues,
    } = useForm({
        mode: `onChange`
    });

    /**
     * Function to submit form
     * @param {object} data 
     */
    const onSubmit = async (data = getValues("email")) => {
        const email = data.email;
        const password = data.password;
        if (email == "admin", password == "admin") {
            window.location.href = '/admin/a'
            updateContextState("admin");
            localStorage.setItem('role', 'admin')
        } else {
            const res = await findUser(email, password);
            if (res) {
                updateContextState("teacher");
                window.location.href = '/teacher'
                localStorage.setItem('email', email) 
                localStorage.setItem('role', 'teacher') 
                await new Promise((resolve) => setTimeout(resolve, 1000))
            }
            if (attempts >= 1) {
                setAttempts(attempts - 1);
                alert('Неправильный логин или пароль. Осталось попыток: ' + attempts);
            } else {
                alert('У вас закончились попытки входа');
            }
        }
    }

    return (
        <div className='basicForm'>
            <MediumTitle color="white">Вход</MediumTitle>
            <form 
                action=""
                onSubmit={handleSubmit(onSubmit)}>
                <div className='form-element'>
                    <label>Email</label>
                    <input
                        className='email input'
                        autoComplete='username'
                        type='text'
                        placeholder='Email'
                        style={{ borderColor: errors.email ? "red" : "#000" }}
                        {...register('email', {
                            required: "Поле обязательно к заполнению",
                            minLength: {
                                value: 5,
                                message: "Длинна должна быть больше 5"
                            },
                            maxLength: {
                                value: 25,
                                message: "Длинна не должна быть больше 25"
                            },
                        })}
                    />
                </div>
                {errors.email && <p className="error" style={{color: "red"}}>{errors.email.message || "Error"}</p>}
                <div className='form-element'>

                    <label>Пароль</label>
                    <input
                        autoComplete='current-password'
                        className='password'
                        placeholder='Пароль'
                        type={viewPassword ? 'text' : 'password'}
                        style={{ borderColor: errors.password ? "red" : "#000" }}
                        {...register('password', {
                            required: "Поле обязательно к заполнению",
                            minLength: {
                                value: 5,
                                message: "Длинна должна быть больше 5"
                            },
                            maxLength: {
                                value: 25,
                                message: "Длинна не должна быть больше 25"
                            },
                        })}
                    />
                </div>
                {errors.password && <p className="error">{errors.password.message || "Error"}</p>}
                <button className='button-log' disabled={!isValid}>Войти</button>
            </form>
        </div>
    )
}
export default BasicForm;