import type {RefObject} from "react";
import type {Identifier} from "dnd-core";
import {useAppDispatch} from "../../store/hooks";
import {editModeOn, removeField} from "../../store/slices/fields/fields";
import {ElementDefinition} from "../ElementDefiniton/ElementDefintion";
import {BsArrowsMove, BsTrash, GrDocumentConfig} from "../../static/icons";
import {
    Main,
    Wrapper,
    Tools,
    ToolsIcon,
    ToolsMoveIcon,
    Details,
    Description,
    DefinitionWrapperTemp
} from "./DroppedElement.styled";

interface IDroppedElement {
    isDragging: boolean,
    DroppedRef: RefObject<HTMLDivElement>,
    handlerId: Identifier | null,
    id?: string,
    type?: string,
    name?: string,
    description?: string,
    descriptionForInput?: string,
    placeholder?: string,
    required?: boolean,
    value?: string,
    editMode?: boolean
}

export const DroppedElement = (
    {
        isDragging,
        DroppedRef,
        handlerId,
        id,
        type,
        name,
        description,
        descriptionForInput,
        placeholder,
        required,
        value,
    }: IDroppedElement) => {

    const dispatch = useAppDispatch()

    const cardRemoveHandler = () => dispatch(removeField(id))

    const setEditing = () => dispatch(editModeOn(id))

    return (
        <Main
            onClick={setEditing}>

            <Wrapper
                isDragging={isDragging}
                ref={DroppedRef}
                data-handler-id={handlerId}>

                <Tools>
                    <ToolsIcon
                        onClick={cardRemoveHandler}>
                        <BsTrash/>
                    </ToolsIcon>

                    <ToolsIcon>
                        <GrDocumentConfig/>
                    </ToolsIcon>
                </Tools>

                <ToolsMoveIcon>
                    <BsArrowsMove/>
                </ToolsMoveIcon>

                <Details>
                    <Description>{description}</Description>

                    <DefinitionWrapperTemp>
                        <ElementDefinition
                            id={id}
                            type={type}
                            name={name}
                            placeholder={placeholder}
                            value={value}
                            descriptionForInput={descriptionForInput}
                            required={required}
                        />
                    </DefinitionWrapperTemp>
                </Details>

            </Wrapper>
        </Main>
    );
};