export function createHeader(title){
    return `
            <input type="text" class="input" value="${title}">

            <div>
                <button class="button" data-button="remove">
                    <span class="material-icons" data-button="remove">
                        delete
                    </span>
                </button>
                <a href="#">
                    <button class="button">
                        <span class="material-icons">
                            exit_to_app
                        </span>
                    </button>
                </a>
            </div>
        `
}