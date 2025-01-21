import { useRef } from 'react';
import ClearButton from './ClearButton';
import SelectionMenu from './SelectionMenu';
import SuggestionsMenu from './SuggestionsMenu';


export default function PredictionFormInputs ({ formData, onInputChange }) {
    const inputFields = [
        { id: 'player1', label: 'Player 1', placeholder: "Start typing..." },
        { id: 'player2', label: 'Player 2', placeholder: "Player format: 'Nadal R.'" },
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
    const refs = useRef({})

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
                    />
                    <ClearButton
                        inputValue={formData[field.id]}
                        onClear={() =>{
                            onInputChange(field.id, null);
                            refs.current[field.id].focus();
                        }}
                    />
                    {formData[field.id].length > 2 && (
                        <SuggestionsMenu
                            searchTerm={formData[field.id]}  
                            inputField={field.id}  
                            setInputFn={onInputChange}
                        />
                    )}
                </div>
            ))}
            <SelectionMenu menuItems={menuItems}/>

        </div>
    )
}