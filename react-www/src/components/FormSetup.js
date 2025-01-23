import { useState, useEffect } from "react";
import MessageBox from './MessageBox'
import handleSubmit from "../utils/submitForm";
import PredictionFormInputs from "./PredictionFormInputs";
import LookupFormInputs from "./LookupFormInputs";
import './styles/button.css'


export default function FormSetup({ selectedForm }) {
    const [displayText, setDisplayText] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        player1: '',
        player2: '',
        player: '',
        surface: ''
    });

    useEffect(() => {
        setFormData({
            player1: '',
            player2: '',
            player: '',
            surface: ''
        });
        setDisplayText(null);
    }, [selectedForm]);

    const handleInputChange = (id, value) => {
        const inputValue = value?.target?.value ?? value ?? '';

        setFormData(formData => ({
            ...formData,
            [id]: inputValue
        }));
    }

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
    <form className="form-container" onSubmit={onSubmit} style={{padding: '20px'}}>
        {selectedForm === "predict_winner" && 
        <PredictionFormInputs
            formData={formData}
            onInputChange={handleInputChange}
        />}
        {selectedForm === "lookup_stats" &&
        <LookupFormInputs
            formData={formData}
            onInputChange={handleInputChange}
        />}

        <div className="action-container"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifContent: 'space-between',
            }}
        >
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
        className="button"
        type="submit"
        disabled={disabled}
      >
        Submit
      </button>
    );
  }