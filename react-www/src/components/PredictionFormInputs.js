import { ClearButton } from "./";
import SelectionMenu from './SelectionMenu';
import SuggestionsMenu from './SuggestionsMenu';
import './styles/input-container.css'


export default function PredictionFormInputs ({ formData, refs, isValid, onInputChange }) {
    const inputFields = [
        { id: 'player1', label: 'Player 1:', placeholder: "Start typing..." },
        { id: 'player2', label: 'Player 2:', placeholder: "Player format: 'Nadal R.'" },
    ];
    const menuItems = {
        id: 'court_surface',
        label: 'Court Surface:',
        placeholder: 'Select a Surface',
        options: [
            { id: 'clay', label: 'Clay' },
            { id: 'grass', label: 'Grass' },
            { id: 'hardCourt', label: 'Hard Court' },
        ],
    }

    return (
        <div className="input-container">
            {inputFields.map((field) => (
                <div key={field.id}>
                    <label htmlFor={field.id}>{field.label}</label>
                    <input
                        id={field.id}
                        ref={e => refs.current[field.id] = e}
                        type="text"
                        placeholder={field.placeholder}
                        autoComplete="off"
                        required
                        value={formData[field.id]}
                        onChange={(e) => onInputChange(field.id, e)}
                        className={isValid[field.id] === false ? 'invalid' : ''}
                    />
                    <ClearButton
                        inputValue={formData[field.id]}
                        onClear={() =>{
                            onInputChange(field.id, null);
                            refs.current[field.id].focus();
                        }}
                    />
                    <SuggestionsMenu
                        searchTerm={formData[field.id]}  
                        inputField={field.id}  
                        setInputFn={onInputChange}
                    />           
                </div>
            ))}
            <SelectionMenu 
                menuItems={menuItems}
                setInputFn={onInputChange}    
            />

        </div>
    )
}