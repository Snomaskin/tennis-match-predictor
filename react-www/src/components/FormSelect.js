import React, { useState } from "react";
import FormSetup from "./FormSetup";


export default function FormSelect() {
    const radioSelect = [
        {id: 'predict_winner', value: 'predict_winner', label: 'Predict Winner'},
        {id: 'lookup_stats', value: 'lookup_stats', label: 'Lookup Stats'},
    ];

    const [selectedForm, setSelectedForm] = useState('predict_winner');
    const handleChange = (e) => {
        setSelectedForm(e.target.value);
    }

    return (
    <>
        <div className="radio-container">
            {radioSelect.map((radio) => {
                return(
                <div className="radio-container" key={radio.id}>
                    <input type="radio" 
                        id={radio.id} 
                        value={radio.value}
                        checked={selectedForm === radio.value}
                        onChange={handleChange}
                        />
                        <label htmlFor={radio.id}>{radio.label}</label>
                </div>)
            })}
        </div>
        <FormSetup selectedForm={selectedForm} />
    </>
    );
}