import EventBus from './EventBus';
import { defaultState } from '../store';
import {isEqual, cloneDeep, merge} from "../asserts/utils";

export type     Dispatch<State> = (
    nextStateOrAction: Partial<State> | Action<State>,
    payload?: any,
) => void;

export type Action<State> = (
    dispatch: Dispatch<State>,
    state: State,
    payload: any,
) => void;

export class Store<State extends Record<string, any>> extends EventBus {
    private state: State = {} as State;

    constructor(defaultState: State) {
        super();

        this.state = defaultState;
        this.set(defaultState);
    }
    static instance() {
        if (!this._instance) {
            this._instance = new Store(defaultState);
            if (process.env.DEBUG) console.log(
                '%cновый Store',
                'background: #222; color: #bada11',
            );
        }

        return this._instance;
    }

    public getState() {
        return this.state;
    }

    public set(nextState: Partial<State>) {
        const prevState = { ...this.state };

        this.state = { ...this.state, ...nextState };

        if (nextState.activeChatMessages && process.env.DEBUG) {

            console.log('store', prevState.activeChatMessages.length, nextState.activeChatMessages.length)
        }
        this.emit('changed', prevState, nextState);
    }

    async dispatch(nextStateOrAction: Partial<State> | Action<State>, payload?: any) {
        if (typeof nextStateOrAction === 'function') {
            await nextStateOrAction(this.dispatch.bind(this), this.state, payload);
        } else {
            this.set(nextStateOrAction);
        }
    }
}
