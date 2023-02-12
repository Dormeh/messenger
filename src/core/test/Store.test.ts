import { Store } from '../Store';

describe('core/Store', () => {
    it('should set state', () => {
        const store = new Store({});

        store.set({ userId: 123 });

        expect(store.getState()).toStrictEqual({ userId: 123 });
    });

    it('should emit event after store was update', () => {
        const store = new Store({ userId: -1 });
        const mock = jest.fn();

        store.on('changed', mock);

        store.set({ userId: 123 });

        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledWith({ userId: -1 }, { userId: 123 });
    });
    it('should call callback with store and dispatch when it is function and store be equal in next instance to himself', () => {
        const store = Store.instance();
        store.set({ userId: -1 });
        const mock = jest.fn();

        store.dispatch(mock, 'PAYLOAD_PARAMS');

        expect(mock).toHaveBeenCalled();
        expect(mock).toHaveBeenCalledTimes(1);
        expect(mock).toHaveBeenCalledWith(expect.any(Function), store.getState(), 'PAYLOAD_PARAMS');
        expect(store).toStrictEqual(Store.instance());
    });
});
