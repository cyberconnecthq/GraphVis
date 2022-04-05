import { Subject } from "rxjs";

const subject = new Subject();
const initialState = "0x148d59faf10b52063071eddf4aaf63a395f2d41c";

let state = initialState;

export const addressStore = {
    init: () => subject.next(state),
    subscribe: (setState) => subject.subscribe(setState),
    setAddress: (newAddress) => {
        state = newAddress;
        subject.next(state);
    },
    initialState,
};
