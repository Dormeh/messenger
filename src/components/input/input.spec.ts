import { renderBlock } from '../../tests/renderUtils';
import { Input } from './input';
import { getByPlaceholderText, getByRole } from '@testing-library/dom';

describe('components/Input', () => {
    it('should render input', () => {
        renderBlock({
            Block: Input,
            props: { placeholder: 'test' },
        });
        const input = getByPlaceholderText(document.body, 'test');
        expect(input).toBeInTheDocument();
    });
    it('should have certain value and be in DOM', () => {
        renderBlock({
            Block: Input,
            props: {
                placeholder: 'test',
                type: 'text',
                value: 'Hello',
            },
        });
        const input = getByRole(document.body, 'textbox');
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue('Hello');
    });
});
