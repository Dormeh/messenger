import Block from "../Block";

export interface RouterInterface {

    initEventListeners(): void

    route(): void

    changePage(path: string, match?: string[]): Promise<Block>

    navigate(path: string): void

    addRoute(pattern: RegExp, path: string): void

    setNotFoundPagePath(path: string): void

    listen(): void
}
