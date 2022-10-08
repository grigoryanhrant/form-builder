import React, {memo, useCallback, useEffect, useRef, useState} from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {addField, updateFields} from "../../store/slices/fields/fields";
import {IElement} from "../../store/slices/fields/types";
import update from 'immutability-helper';
import {DropTargetMonitor, useDrop} from "react-dnd";
import {DroppedElementContainer} from "../_DroppedElement/DroppedElementContainer";
import _ from "lodash";
import {ELEMENT_ADDRESS_DROPPED, ELEMENT_ADDRESS_FORM} from "../../global/constants";
import "./PlaygroundArena.sass";

interface IPlaygroundArenaDropItem {
    elementAddress: string,
    type: string,
    name: string,
    description: string,
    descriptionForInput?: string,
    placeholder: string
    required?: boolean
}

export const PlaygroundArena = () => {

    const dispatch = useAppDispatch()

    const { fields } = useAppSelector((state) => state.fieldsSlices)

    const [cards, setCards] = useState(fields);

    const myElement = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setCards(fields)
    }, [fields])

    useEffect(() => {

        if(myElement && myElement.current) {
            myElement.current.addEventListener('mouseup', mouseLeaveUpdateHandler, true)
        }

        return () => {
            if(myElement && myElement.current) {
                myElement.current.removeEventListener('mouseup', mouseLeaveUpdateHandler, true)
            }
        }
    }, [cards, fields])

    const mouseLeaveUpdateHandler = () => {
        console.log(`mouseup`)
        if(!_.isEqual(cards, fields)) {
            dispatch(updateFields(cards))
        }
    }

    const [{isOver}, drop] = useDrop(() => ({
        accept: 'element',
        drop: (item: IPlaygroundArenaDropItem) => {

            if (item.elementAddress !== ELEMENT_ADDRESS_FORM) return

            dispatch(addField({
                type: item.type,
                name: item.name,
                description: item.description,
                descriptionForInput: item.descriptionForInput,
                placeholder: item.placeholder,
                required: item.required,
                editMode: false,
            }))
        },

        collect: (monitor: DropTargetMonitor) => ({
            isOver: monitor.isOver(),
            dropHere: monitor.isOver()
        }),
    }));

    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        setCards((prevCards: IElement[]) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex] as IElement],
                ],
            })
        )
    }, [cards])

    const fieldsRenderCallback = useCallback(
        (item: IElement, index: number) => {
            return (
                <DroppedElementContainer
                    key={item.id}
                    id={item.id}
                    index={index}
                    moveCard={moveCard}
                    elementAddress={ELEMENT_ADDRESS_DROPPED}

                    type={item.type}
                    name={item.name}
                    description={item.description}
                    descriptionForInput={item.descriptionForInput}
                    placeholder={item.placeholder}
                    editMode={item.editMode}
                />
            )
        }, [],
    )

    return (
        <div ref={myElement} className='PlaygroundArenaWrapper'>
            <div ref={drop} className='PlaygroundArena' style={{borderColor: isOver ? '#58cfef' : ''}}>

                {cards.map((card, i) => fieldsRenderCallback(card, i))}

                {isOver && <div className='PlaygroundArena__DropHere'>DROP THE ELEMENT HERE</div>}
            </div>
        </div>
    );
};