/* eslint-disable prettier/prettier */
import { Like } from 'typeorm';

export class ApplicationWideSettings {
    // Constants
    public static DEFAULT_SKIP = 0;
    public static DEFAULT_TAKE = 20;

    // Public methods

    /**
     * generateValuesArray
     * Used to find entity entries by passing in an interface and matching on non-null like fields
     * @param model: interface to parse and pull values from
     * @returns valuesArray
     * @todo Probably move this to an ORM-specific helper functions module
     */

    public static generateValuesArray(model) {
        return Object.entries(model)
            .map(([key, value]) => {
                if (value == null || value == '') return [];
                return { [key]: Like(`%${value}%`) };
            });
    }

}
