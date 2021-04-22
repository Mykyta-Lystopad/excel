import {$} from "@core/dom";

export function resizeHandler(event, $root) {
    console.log(event)
    return new Promise(resolve => {
        // console.log(event.target.getAttribute('data-resize'))

        const $resizer = $(event.target)
        const colName = $resizer.$el.classList.value
        // const $parent = $resizer.$el.parentNode // bad
        // const $parent = $resizer.$el.closest('.column') // better
        const $parent = $resizer.closest('[data-type="resizable"]')
        const coords = $parent.getCoords()
        const type = $resizer.data.resize
        let delta
        let value

        if (colName === 'col-resize') {
            $resizer.css({
                opacity: 1,
                bottom: '-5000px'
            })
        } else {
            $resizer.css({
                opacity: 1,
                right: '-5000px'
            })
        }


        document.onmousemove = e => {
            if (colName === 'col-resize') {
                delta = e.pageX - coords.right
                value = coords.width + delta
                $resizer.css({
                    right: -delta + 'px'
                })

            } else {
                delta = e.pageY - coords.bottom
                value = coords.height + delta
                $resizer.css({
                    bottom: -delta + 'px'
                })
            }
        }

        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null

            if ($resizer.$el.classList.value === 'col-resize') {
                // $parent.$el.style.width = value + 'px'
                $parent.css({width: value + 'px'})
                $root.findAll(`.js-${$parent.data.col}`)
                    .forEach(coll => coll.style.width = value + 'px')

            } else {
                $parent.css({height: value + 'px'})
            }

            const rowHeightIndex = +($parent.$el.innerText)

            // rowHeightIndex = 0 || 1 || ... 1000

            resolve({
                value,
                type,
                id: type === 'col' ? $parent.data.col : `${rowHeightIndex}`
            })

            $resizer.css({
                opacity: 0,
                bottom: 0,
                right: 0
            })
        }
    })


}