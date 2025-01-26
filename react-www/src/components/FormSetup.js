import { useState, useEffect, useRef } from "react";
import MessageBox from './MessageBox'
import handleSubmit from "../utils/submitForm";
import PredictionFormInputs from "./PredictionFormInputs";
import LookupFormInputs from "./LookupFormInputs";
import { ValidationUtils } from '../utils/inputUtils';
import './styles/button.css'


export default function FormSetup({ selectedForm }) {
    const [displayText, setDisplayText] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        player1: '',
        player2: '',
        player: '',
        court_surface: ''
    });
    const [isValid, setIsValid] = useState({})
    const refs = useRef({});

    useEffect(() => {
        setFormData({
            player1: '',
            player2: '',
            player: '',
            court_surface: ''
        });
        setDisplayText(null);
        setIsValid({});
    }, [selectedForm]);

    const handleInputChange = (id, e) => {
        const inputValue = e?.target?.value ?? e ?? '';

        setFormData(formData => ({
            ...formData,
            [id]: inputValue
        }));
    }

    const validateInput = (id, value) => {
        const isValid = ValidationUtils.canFormatAsPlayerName(value);
        if (!isValid) {
            setIsValid((prev) => ({
                ...prev, [id]: false
            }))
            return false
        } else if (isValid) {
            setIsValid((prev) => ({
                ...prev, [id]: true
            }))
            return true
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setDisplayText(null); 
        try {
            Object.keys(formData).map(key => {
                if (formData[key] === '') return;
                return validateInput(key, formData[key])});
            const result = await handleSubmit(formData, selectedForm);
            setDisplayText(result)
        } catch (error) {
            console.log(error);
            setDisplayText(error.message);
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
            refs={refs}
            isValid={isValid}
            onInputChange={handleInputChange}
        />}
        {selectedForm === "lookup_stats" &&
        <LookupFormInputs
            formData={formData}
            refs={refs}
            isValid={isValid}
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