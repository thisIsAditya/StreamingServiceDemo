const Scroll = props => {
    return(
        <div style={{overflowY:'scroll', height:'75vh', marginTop:'15px'}}>
            {props.children}
        </div>
    )
}
export default Scroll;