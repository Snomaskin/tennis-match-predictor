import { useRef } from "react";
import { useState, useEffect } from "react";
import { INPUTS } from "../config";
import InputFields from "./InputFields";
import MessageBox from './MessageBox'
import handleSubmit from "../utils/submitForm";


export default function FormDisplay({ selectedForm }) {
    const [displayText, setDisplayText] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [inputValues, setInputValues] = useState({});

    const player1Ref = useRef(null);
    const player2Ref = useRef(null);
    const playerRef = useRef(null);
    const surfaceRef = useRef(null);

    useEffect(() => {
        if (player1Ref.current) player1Ref.current.value = '';
        if (player2Ref.current) player2Ref.current.value = '';
        if (playerRef.current) playerRef.current.value = '';
        if (surfaceRef.current) surfaceRef.current.value = '';
        
        setInputValues({});
        setDisplayText(null);
    }, [selectedForm]);

    let fields, menuItems;
    if (selectedForm === "predict_winner"){
        fields = [
            {...INPUTS.predictWinner.fields[0], ref: player1Ref},
            {...INPUTS.predictWinner.fields[1], ref: player2Ref}
        ];
        menuItems = {
            ...INPUTS.predictWinner.selectionMenu,
        ref: surfaceRef
        };
    } else if (selectedForm === "lookup_stats"){
        fields = [
            { ...INPUTS.lookupStats.fields[0], ref: playerRef }
        ];
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setDisplayText(null); 

        const getFieldsValue = fields.reduce((acc, field) => {
            acc[field.id] = field.ref.current?.value || '';
            return acc;
        }, {});
        
        const getMenuValue = menuItems && menuItems.ref ? {
            [menuItems.id]: menuItems.ref.current?.value || ''
        } : {};

        const formData = {...getFieldsValue, ...getMenuValue};

        try {
            const result = await handleSubmit(formData, selectedForm);
            setDisplayText(result)
            } catch (error) {
            console.log('Submit error', error);
            setDisplayText('Error: You must have faith!');
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
            inputValues={inputValues}
            setInputValues={setInputValues}
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