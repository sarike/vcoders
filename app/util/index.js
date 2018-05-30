import moment from 'moment'
import showdown from 'showdown'
import hightlight from 'showdown-highlight'

const converter = new showdown.Converter({ extensions: [hightlight] })

export function parseMarkdown (md) {
    return converter.makeHtml(md)
}

export function formatDatetime (dateTimeString) {
    return moment(dateTimeString).format('YYYY-MM-DD HH:mm:ss')
}

export function handleAction (config, initialState) {
    const reducerMap = {}
    const types = Object.keys(config)
    types.forEach(type => {
        const reducer = config[type]
        if (reducer && typeof reducer === 'function') {
            reducerMap[type] = reducer
            return
        }
        const suffixes = Object.keys(reducer)
        suffixes.forEach(suffix => {
            if (typeof reducer[suffix] === 'function') {
                reducerMap[`${type}-${suffix}`] = reducer[suffix]
            }
        })
    })
    return function (state, action) {
        if (!state) return initialState
        const { type } = action
        if (!type || !reducerMap[type]) return state
        const reducer = reducerMap[type]
        return reducer(state, action)
    }
}
