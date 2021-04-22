export function createHeader(title){
    return `
            <input type="text" class="input" value="${title}">

            <div>
                <button class="button">
                    <span class="material-icons">
                        exit_to_app
                    </span>
                </button>
                <button class="button">
                    <span class="material-icons">
                        delete
                    </span>
                </button>

            </div>
        `
}