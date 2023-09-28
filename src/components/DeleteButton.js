const DeleteButton = (props) => {
    return (
        <button onClick={
            (event) => {if (window.confirm(`Delete ${person.name}?`)) 
            {props.deletePerson(event, person.id)}
        }
            }>delete</button>
    )
}

export default DeleteButton