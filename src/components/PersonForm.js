import Name from "./Name";
import Number from "./Number";
import AddButton from "./AddButton";

const PersonForm = (props) => {
    return (
        <form>
        <Name newName={props.newName} handleNameChange={props.handleNameChange}/>
        <Number newNumber={props.newNumber} handleNumberChange={props.handleNumberChange}/>
        <AddButton addPerson = {props.addPerson} />



      </form>
    )
}

export default PersonForm