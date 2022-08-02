declare type Dictionary = {
    [key: string]: unknown;
};
export declare type Proxy = Object | Array;
/**
 * Objects are saved globally and indexed by the unique id.
 *
 * Remarks: Internally this is called "Model"
 *
 * Events:
 *    - event: 'change'
 *      args:  { name: string, value: unknown, old: unknown }
 */
export declare class Object<T extends Dictionary = {}> {
    /**
     * @returns the unique object by id.
     */
    static get(id: string): Object;
    /**
     * Create a new object.
     *
     * @param value
     */
    static create<T extends Dictionary = {}>(data: {
        /**
         * Object id, if undefined then it will create a new unique id.
         */
        id?: string | undefined;
    } & T): Object<T>;
    /**
     * Check if the global object exists.
     *
     * @param id The unique id
     * @returns True, when the object exists; otherwise, false.
     */
    static exists(id: string): boolean;
    /**
     * @returns a new unique id.
     */
    static guid(): string;
    id: string;
    data: T | undefined;
    /**
     * @returns The unique id of this object.
     */
    getId(): string;
    /**
     *
     */
    get<TKey extends keyof T>(name: TKey, args?: {
        /**
         * Resolve nested paths
         * Example: 'object.nested.value'
         */
        resolve: boolean;
    } | undefined): T[TKey] | undefined;
    /**
     * Dispatch an event.
     *
     * @param eventName The name of the event.
     * @param args The args that will be passed to the event.
     */
    notify(eventName: string, args: Dictionary): void;
    /**
     * Add an event listener.
     *
     * @param eventName The name of the event.
     * @param listener
     *    Dispatch function, `args` should match what `notify` is sending.
     */
    on(eventName: string, listener: (args: Dictionary) => void): void;
    /**
     * Remove an event listener.
     *
     * @param eventName The name of the event.
     * @param listener
     *    Dispatch function, `args` should match what `notify` is sending.
     */
    off(eventName: string, listener: (args: Dictionary) => void): void;
    /**
     * Update the values that are different and
     * trigger a `change` event per property.
     *
     * @param object
     */
    setAll(object: Dictionary): void;
    /**
     * Update a value and trigger `change` event if notify is True.
     *
     * @param key
     * @param value
     * @param notify
     */
    set(key: string, value: unknown, args?: {
        /**
         * Resolve nested paths
         * Example: 'object.nested.value'
         */
        resolve: boolean;
        /**
         * Whether to dispatch an event of the change.
         */
        silent: boolean;
    } | undefined): void;
    /**
     * @returns json object with all the data.
     */
    toJSON(): Dictionary;
}
/**
 * Arrays are saved globally and indexed by the unique id.
 *
 * Items in the array can be Noodl.Object
 * which have some extra features from here.
 *  Events on Noodl.Object:
 *    - event:  'add'
 *      args:   { collection: Array }
 *    - event:  'remove'
 *      args:   { collection: Array }
 *
 * Remarks: Internally this is called "Collection"
 *
 * Events:
 *    - event:  'add'
 *      args:   { item: unknown, index: unknown }
 *    - event:  'change'
 *      args:   undefined
 */
export declare class Array<T = unknown> {
    static get<T>(id: string): Array<T>;
    static create<T>(items?: T[] | undefined): Array<T>;
    static instanceOf(collection: Array): boolean;
    static exists(id: string): boolean;
    id: string;
    items: T[];
    getId(): string;
    get(index: number): T;
    on(eventName: string, listener: (args: unknown) => void): void;
    off(eventName: string, listener: (args: unknown) => void): void;
    notify(eventName: string, args: unknown): void;
    set(src: Array<T> | T[]): void;
    add(item: T): void;
    addAtIndex(item: T, index: number): void;
    removeAtIndex(index: number): void;
    remove(item: T): void;
    size(): number;
    contains(item: T): boolean;
    /** @deprecated */
    each(callback: (item: T, index: number) => void): void;
    forEach(callback: (item: T, index: number) => void): void;
    map(predicate: (value: T, index: number, array: any[]) => value is any): any[];
    filter(predicate: (value: T, index: number, array: any[]) => value is any): any[];
    find(predicate: (value: T, index: number, array: any[]) => value is any, thisArg?: unknown | undefined): void;
    findIndex(predicate: (value: T, index: number, array: any[]) => value is any, thisArg?: unknown | undefined): number;
    toJSON(): Dictionary;
}
export {};
