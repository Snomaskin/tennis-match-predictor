export default function SelectionMenu({ menuItems, setInputFn }) {
    const {id, label, placeholder, options, ref} = menuItems;

    return (
        <div className="input-container">
            <label htmlFor={id}>{label}</label>
            <select 
                id={id} 
                defaultValue="" 
                required
                ref={ref}
                onChange={(e) => setInputFn(e.target.id, e)}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((option) => (
                    <option 
                        key={option.id} 
                        value={option.label}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
    
}
