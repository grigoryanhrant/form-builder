import React from 'react';
import {useAppDispatch} from "../../../store/hooks";
import {placeholderChange, placeholderRemove} from "../../../store/slices/fields/fields";
import {FaRemoveFormat} from "../../../common/Icons/index"

export interface IEditingInput {
    id: string | undefined
    name: string | undefined
    placeholder: string | undefined
}

export const InputEditing = ({ id, placeholder, name }: IEditingInput) => {

    const dispatch = useAppDispatch()

    const placeholderChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(placeholderChange({id, inputPlaceholder: evt.target.value}))
    }

    const placeholderRemoveHandler = () => {
        dispatch(placeholderRemove({id}))
    }

    const fieldRemove = placeholder && (
        <div className='ElementEditing__FieldRemove' onClick={placeholderRemoveHandler}>
            <FaRemoveFormat />
        </div>
    )

    return (
        <div className='ElementEditing__Block'>
            <label className='ElementEditing__Label' htmlFor={id}>Placeholder</label>
            <div className='ElementEditing__InputWrapper'>
                <input
                    id={id}
                    className='ElementEditing__Input'
                    value={placeholder}
                    onChange={placeholderChangeHandler}/>
                {fieldRemove}
            </div>
        </div>
    );
};