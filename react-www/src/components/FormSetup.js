import { useState, useEffect } from "react";
import { INPUTS } from "../config";
import InputFields from "./InputFields";
import MessageBox from './MessageBox'
import handleSubmit from "../utils/submitForm";


export default function FormDisplay({ selectedForm }) {
    const [displayText, setDisplayText] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        player1: '',
        player2: '',
        player: '',
        surface: ''
    });
    //console.log('formData', formData)


    useEffect(() => {
        setFormData({
            player1: '',
            player2: '',
            player: '',
            surface: ''
        });
        setDisplayText(null);
    }, [selectedForm]);

    let fields, menuItems;
    if (selectedForm === "predict_winner"){
        fields = [
            {...INPUTS.predictWinner.fields[0]},
            {...INPUTS.predictWinner.fields[1]}
        ];
        menuItems = {
            ...INPUTS.predictWinner.selectionMenu,
        id: 'surface'
        };
    } else if (selectedForm === "lookup_stats"){
        fields = [
            { ...INPUTS.lookupStats.fields[0]}
        ];
    }

    const handleInputChange = (id, value) => {
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setDisplayText(null); 

        try {
            const result = await handleSubmit(formData, selectedForm);
            setDisplayText(result)
        } catch (error) {
            console.log('Submit error', error);
            setDisplayText('Error: Believe it.');
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleDismiss = () => {
        setDisplayText(null);
    };

    return (
    <form className="form-container" onSubmit={onSubmit}>
        <InputFields 
            fields={fields} 
            menuItems={menuItems} 
            formData={formData}
            onInputChange={handleInputChange}
        />
        <div className="action-container">
        <SubmitButton disabled={isSubmitting} />
            {(isSubmitting || displayText) && (
                <MessageBox
                 displayText={displayText}
                 isLoading={isSubmitting}
                 onDismiss={handleDismiss}
                 />
            )}
        </div>
    </form>
    );
}

function SubmitButton({ disabled }) {
    return (
      <button 
        className="submit-button"
        type="submit"
        disabled={disabled}
      >
        Submit
      </button>
    );
  }