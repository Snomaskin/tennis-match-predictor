import SelectionMenu from "./SelectionMenu";
import SuggestionsMenu from "./SuggestionsMenu";

export default function InputFields({ fields, menuItems, inputValues, setInputValues }) {
    const handleInput = (e, fieldId) => {
        setInputValues(prev => ({
            ...prev,
            [fieldId]: e ? e.target.value : ''
        }));
    }

    const handleDirectInput = (fieldId, value) => {
        setInputValues(prev => ({
            ...prev,
            [fieldId]: value || ''
        }));
    };

    return (
        <div className="input-container">
            {fields.map((field, index) => (
                <div key={field.id}>
                    <label htmlFor={field.id}>{field.label}:</label>
                    <input
                        id={field.id}
                        type="text" 
                        placeholder={index === 0 ? "Start typing..." : "Player format: 'Nadal R.'" }
                        autoComplete="off" 
                        required
                        ref={field.ref}
                        value={inputValues[field.id] || ''}
                        onChange={(e) => handleInput(e, field.id)}
                    />
                    <ClearButton 
                        inputRef={field.ref} 
                        inputValue={inputValues[field.id]}
                        onClear={() => handleInput(null, field.id)} 
                    />

                    {inputValues[field.id]?.length > 2  && (
                        <SuggestionsMenu 
                            searchTerm={inputValues[field.id]} 
                            inputField={field.id}
                            setInputFn={handleDirectInput}
                        />
                    )}
                </div>
            ))}
            {menuItems && <SelectionMenu menuItems={menuItems} />}
        </div>
    );
}

function ClearButton({ inputRef, inputValue, onClear }) {
    const buttonStyle = {
        opacity: inputValue ? 1 : 0,
        pointerEvents: inputValue ? 'auto' : 'none'
    };

    return (
        <span 
        className="clear-button" 
        style={buttonStyle}
        onClick={() => {
            inputRef.current.value = '';  // Clear DOM input
            onClear();                    // Update React state
            inputRef.current.focus();
        }}>
            {inputRef.current?.value && 'X'}
        </span>
    )
}