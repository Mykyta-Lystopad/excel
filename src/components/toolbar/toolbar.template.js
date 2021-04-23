function toButton(button) {
    const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
    `
    // data-value='${JSON.stringify(button.value)}' = {"fontStyle":"italic"}
    // data-value='"${Object.keys(button.value)}: ${Object.values(button.value)}"' = "fontStyle: italic"

    return `
        <button class="button ${button.active ? 'active' : ''}"
        ${meta}
        >
                <span class="material-icons"
                ${meta}
                >
                    ${button.icon}
                </span>
        </button>
    `
}

export function createToolbar(state) {
    const buttons = [
        {
            icon: 'format_align_left',
            active: state['textAlign'] === 'left',
            value: {textAlign: 'left'}
        },
        {
            icon: 'format_align_center',
            active: state['textAlign'] === 'center',
            value: {textAlign: 'center'}
        },
        {
            icon: 'format_align_right',
            active: state['textAlign'] === 'right',
            value: {textAlign: 'right'}
        },
        {
            icon: 'format_bold',
            active: state['fontWeight'] === 'bold',
            value: {fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold'}
        },
        {
            icon: 'format_italic',
            active: state['fontStyle'] === 'italic',
            value: {fontStyle: state['fontStyle'] === 'italic'? 'roboto' : 'italic'}
        },
        {
            icon: 'format_underlined',
            active: state['textDecoration'] === 'underline',
            value: {textDecoration: state['textDecoration'] === 'underline' ? 'none' : 'underline'}
        },

    ]

    return buttons.map(elem => {
        // когда стаем на клетку
        // elem = {textAlign: "center", fontWeight: "bold", textDecoration: "underline", fontStyle: "italic"}
        return toButton(elem)
    }).join('')


}