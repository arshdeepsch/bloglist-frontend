import { useState, forwardRef, useImperativeHandle } from 'react'

const Toggleable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)
    const showVisible = { display: visible ? '' : 'none' }
    const hideVisible = { display: visible ? 'none' : '' }

    const toggleVisible = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisible
        }
    })

    return (
        <div>
            <div style={hideVisible}>
                <button onClick={toggleVisible}>{props.buttonLabel}</button>
            </div>
            <div style={showVisible}>
                {props.children}
                <button onClick={toggleVisible}>cancel</button>
            </div>
        </div>
    )
})

export default Toggleable