import { useRef } from "react";
import SelectionMenu from "./SelectionMenu";
import SuggestionsMenu from "./SuggestionsMenu";

export default function InputFields({ fields, menuItems, formData, onInputChange }) {
    const refs = useRef({});

    const handleInputChange = (fieldId, value) => {
        // Beautiful:
        const inputValue = value?.target?.value ?? value ?? '';
        onInputChange(fieldId, inputValue);
    };

    return (
        <div className="input-container">
            {fields.map((field, index) => (
                <div key={field.id}>
                    <label htmlFor={field.id}>{field.label}:</label>
                    <input
                        id={field.id}
                        ref={el => refs.current[field.id] = el}
                        type="text" 
                        placeholder={index === 0 ? "Start typing..." : "Player format: 'Nadal R.'" }
                        autoComplete="off" 
                        required
                        value={formData[field.id]}
                        onChange={(e) => handleInputChange(field.id, e)}
                    />
                    <ClearButton 
                        fieldId={field.id}
                        inputValue={formData[field.id]}
                        onClear={() => {
                            handleInputChange(field.id, null);
                            refs.current[field.id].focus();
                        }} 
                    />

                    {formData[field.id]?.length > 2  && (
                        <SuggestionsMenu 
                            searchTerm={formData[field.id]} 
                            inputField={field.id}
                            setInputFn={handleInputChange}
                        />
                    )}
                </div>
            ))}
            {menuItems && <SelectionMenu menuItems={menuItems} />}
        </div>
    );
}

function ClearButton({ fieldId, inputValue, onClear }) {
    const buttonStyle = {
        opacity: inputValue ? 1 : 0,
        pointerEvents: inputValue ? 'auto' : 'none'
    };

    return (
        <span 
            className="clear-button" 
            style={buttonStyle}
            onClick={() => {
                onClear();
            }}>
                {fieldId && 'X'}
        </span>
    )
}