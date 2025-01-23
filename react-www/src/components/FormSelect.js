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
        <div
            className="radio-container"
            style={{
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '8%',
                paddingTop: '2%',
                gap: '5%',
            }}
        >
            {radioSelect.map((radio) => (
                <div key={radio.id}>
                    <input type="radio" 
                        id={radio.id} 
                        value={radio.value}
                        checked={selectedForm === radio.value}
                        onChange={handleChange}
                        style={{ marginRight: '5px' }}
                        />
                        <label htmlFor={radio.id}>{radio.label}</label>
                </div>)
            )}
        </div>
        <FormSetup selectedForm={selectedForm} />
    </>
    );
}