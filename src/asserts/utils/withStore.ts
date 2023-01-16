import {Store, BlockMeta, IBlockProps} from 'core';

type WithStateProps = { store: Store<AppState> };

export function withStore<P extends WithStateProps>(WrappedBlock: IBlockProps) {
    // @ts-expect-error No base constructor has the specified
    return class extends WrappedBlock<P> {
        public static componentName = WrappedBlock.componentName;

        constructor(props: P) {
            super({ ...props, store: Store.instance() });
        }

    } as BlockMeta<Omit<P, 'store'>>;
}
