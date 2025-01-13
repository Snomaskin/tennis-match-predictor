export default function SelectionMenu({ menuItems }) {
    const {id, menuLabel, menuText, options, ref} = menuItems;

    return (
        <div className="input-container">
            <label htmlFor={id}>{menuLabel}</label>
            <select 
                id={id} 
                defaultValue="" 
                required
                ref={ref}
            >
                <option value="" disabled>{menuText}</option>
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
    )
}