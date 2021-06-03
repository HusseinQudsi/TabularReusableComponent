export function copyObject(obj: Object) {
    try {
        return JSON.parse(JSON.stringify(obj));
    } catch (e) {
        // TODO: add global logger service, log out error for reporting.
        throw (`_copyObject failed, error: ${e}`);
    }
}