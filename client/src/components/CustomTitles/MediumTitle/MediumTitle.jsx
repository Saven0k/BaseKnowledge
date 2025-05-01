/**
 * React component,which creates a medium headline (title)
 * @param {string} children 
 * @returns react component
 */
const MediumTitle = ({ children, color }) => {

    return (
        <h2 className='h2' style={{ marginTop: "35px", fontSize: "22px", margin: "12px 0 9px 11px", fontWeight: "900", fontStyle:"italic" }}>
            {children}
        </h2>
    )
}
export default MediumTitle;