import { Identifier } from "./identifier.model";

/**
 * Identifier decorator and metadata.
 */
export function Identifier<T>(identifier: Identifier<T>) {
    return (target: any) => {
        Object.defineProperty(target.prototype, "token", { value: () => identifier.token });
    };
}
