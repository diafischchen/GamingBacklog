import { TinyEmitter } from "tiny-emitter";
const emitter = new TinyEmitter();
const EventBus = () => {
    return { emitter };
};
export default EventBus;