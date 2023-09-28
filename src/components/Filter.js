// Filters persons according to given string

const Filter = (props) => {
    return (
        <div>
            filter shown with: <input 
            value={props.value}
            onChange={props.onChange}
            />
         </div>
    )
}

export default Filter