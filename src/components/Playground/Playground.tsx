import {FormElements} from "../FormElements/FormElements";
import {PlaygroundArena} from "./PlaygroundArena/PlaygroundArena";
import {FormDesigner} from "./FormDesigner/FormDesigner";
import "./Playground.sass";

export const Playground = () => {
    return (
        <div className='Playground'>
            <FormElements />
            <PlaygroundArena />
            <FormDesigner />
        </div>
    );
};
