import React from 'react'
import { HiPencil } from "react-icons/hi";
import { IconContext } from "react-icons";

const EditIcon = ({openPicker}) => {
    return (
        <IconContext.Provider
        value={{
            className: "py-2 mr-4 text-button hover:bg-bg",
            size: "2.5em",
        }}
    >
        <HiPencil onClick={openPicker} />
    </IconContext.Provider>
    )
}

export default EditIcon
