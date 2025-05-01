import Button from '@mui/material/Button';


const CustomButton = ({ children, size, color, on_click, type }) => {
    return (
        <Button
            size={size}
            color={color}
            variant="contained"
            type={type}
            onClick={on_click}
        >{children}</Button>
    )
}

export default CustomButton;