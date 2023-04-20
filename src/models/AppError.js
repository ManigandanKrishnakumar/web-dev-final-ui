export class AppError {
    errorMessage;
    username;
    callback;

    constructor(_errorMessage = "Something went wrong", _username = "",_callback= () => {}) {
        this.errorMessage = _errorMessage;
        this.username = _username;
        this.callback = _callback;
    }
}