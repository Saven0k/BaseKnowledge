/**
 * React component,which creates a big headline (title)
 * @param {string} children 
 * @returns react component
 */
const BigTitle = ({ children, style }) => {
    return (
        <h1 className='h1 center' style={style}>
            {children}
        </h1>
    )
}
export default BigTitle;