export function copyObject(obj: object): any {
    try {
        return JSON.parse(JSON.stringify(obj));
    } catch (e) {
        // TODO: add global logger service, log out error for reporting.
        throw (new Error(`_copyObject failed, error: ${e}`));
    }
}
