import "reflect-metadata";
import * as _ from "lodash";

/**
 * Own
 */
import { BASE_PROPERTY_METADATA_KEY } from "../constants";

export function BasePropertyMetadata<T>(updates: T) {
    return (target: any, propertyKey: string | symbol) => {
        // Pull the base metadata or create an empty object
        const allMetadata = (
            Reflect.getOwnMetadata(BASE_PROPERTY_METADATA_KEY, target)
            ||
            { }
        );

        // Ensure allMetadata has propertyKey
        allMetadata[propertyKey] = (
            allMetadata[propertyKey]
            ||
            { }
        );

        // Update the metadata with anything from updates
        // tslint:disable-next-line:forin
        for (const key of Reflect.ownKeys(updates as any)) {
            allMetadata[propertyKey][key] = updates[key];
        }
        // Update the metadata
        Reflect.defineMetadata(
            BASE_PROPERTY_METADATA_KEY,
            allMetadata,
            target,
        );
    };
}
