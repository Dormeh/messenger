import {renderBlock} from "../../tests/renderUtils";
import {Modal} from "./modal";
import form from '../../data/chatAddForm.json';
import {getByRole, getByTestId} from "@testing-library/dom";

describe('components/Modal', () => {
    renderBlock({
        Block: Modal,
        props: {form: form}
    })
    const modal = getByTestId(document.body,'modal')

    it('should render modal', () => {
        expect(modal).toBeInTheDocument()
    })
    it('should have title element and certain text', () => {
        const title = getByRole(document.body, 'heading')
        expect(title).toBeInTheDocument()
        expect(title).toHaveTextContent('Добавить чат')
    })
    it('should have form element', () => {
        const group = getByRole(document.body, 'group')
        expect(group).toBeInTheDocument()
    })
    it('should have button element', () => {
        const button = getByRole(document.body, 'button')
        expect(button).toBeInTheDocument()
    })
})
