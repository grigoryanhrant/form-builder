import {TDragObject, TDroppedRef} from "../types/types";
import {DropTargetMonitor} from "react-dnd";
import {XYCoord} from "dnd-core";
import {ELEMENT_ADDRESS} from "../../../globalTypes/elementAddress";

export const DragDropCounting = (
    item: TDragObject,
    monitor: DropTargetMonitor,
    DroppedRef: TDroppedRef,
    index: number,
    moveCard: (dragIndex: number, hoverIndex: number) => void) => {

    if (item.elementAddress !== ELEMENT_ADDRESS.DROPPED) return

    if (!DroppedRef.current) return

    const dragIndex = item.index

    const hoverIndex = index

    if (dragIndex === hoverIndex) return

    const hoverBoundingRect = DroppedRef.current?.getBoundingClientRect()

    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    const clientOffset = monitor.getClientOffset()

    const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

    moveCard(dragIndex, hoverIndex)

    item.index = hoverIndex
};