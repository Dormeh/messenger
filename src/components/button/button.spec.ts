import {renderBlock} from "../../tests/renderUtils";
import {Button} from "./button";
import {getByRole} from "@testing-library/dom";

function renderButton({onClick}: Record<string, any>) {
    renderBlock({
        Block: Button,
        props: {
            buttonTitle: 'text',
            onClick
        }
    })
    return getByRole(document.body, 'button')
}

describe('components/Button', () => {
    it('should render button', () => {
        const button = renderButton({
            onClick: () => {
            }
        })
        expect(button).toBeInTheDocument()
    })
    it('should call onClick when user press button', () => {
        const mock = jest.fn();
        const button = renderButton({
            onClick: mock
        })

        button.click();

        expect(mock).toBeCalled()
    })
})
