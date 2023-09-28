//Shows Phonebook Persons list according to Filter

const Persons = (props) => {
    return (    
    <div>
        {props.personsToShow.map((person)=> {
            return <p key={person.id}>{person.name} {person.number}
                        <button onClick={
                            (event) => {if (window.confirm(`Delete ${person.name}?`)) 
                            {props.deletePerson(event, person.id)}
                        }
                            }>delete</button>
                    </p>})}
    </div>) 
}

export default Persons