import TextField from '@mui/material/TextField';

const CustomInput = ({ label, className, value, on_change, name, type, size }) => {
    <TextField
        id="standard-basic"
        label={label}
        variant="standard"
        size={size}
        onChange={() => on_change}
        value={value}
        name={name}
        type={type}
        className={className}
    />
}

export default CustomInput;