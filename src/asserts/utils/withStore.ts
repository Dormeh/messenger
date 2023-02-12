import { Store, BlockMeta, IBlockProps } from 'core';

type WithStateProps = { store: Store<AppState> };

declare global {
    interface Window {
        store: Store<AppState>;
    }
}
export function withStore<P extends WithStateProps>(WrappedBlock: IBlockProps) {
    // @ts-expect-error No base constructor has the specified
    return class extends WrappedBlock<P> {
        public static componentName = WrappedBlock.componentName;
        public static test = 'testName';

        constructor(props: P) {
            super({ ...props, store: Store.instance() });
        }

        __onChangeStoreCallback = () => {
            /**
             * TODO: проверить что стор реально обновлен
             * и прокидывать не целый стор, а необходимые поля
             * с помощью метода mapStateToProps
             */
            // @ts-expect-error this is not typed
            this.setProps({ ...this.props, store: Store.instance() });
        };

        componentDidMount(props: P) {
            super.componentDidMount(props);

            Store.instance().on('changed', this.__onChangeStoreCallback);
        }

        componentWillUnmount() {
            super.componentWillUnmount();
            Store.instance().off('changed', this.__onChangeStoreCallback);
        }
    } as BlockMeta<Omit<P, 'store'>>;
}
