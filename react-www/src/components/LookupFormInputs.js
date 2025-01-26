import { ClearButton } from "./";
import SuggestionsMenu from "./SuggestionsMenu";
import './styles/input-container.css'


export default function LookupFormInputs ({ formData, refs, isValid, onInputChange }) {
    const field = { id: 'player', label: 'Player:', placeholder: "Start typing..." };

    return (
        <div className="input-container" key={field.id}>
            <div>
                <label htmlFor={field.id}>{field.label}</label>
                <input 
                    id={field.id}
                    ref={(e) => refs.current[field.id] = e}
                    placeholder={field.placeholder}
                    autoComplete="off"
                    type="text"
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
        </div>
    )
}