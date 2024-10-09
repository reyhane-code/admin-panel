import { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import OutsideClickHandler from "react-outside-click-handler";

interface IProps<T> {
    items: T[];
    render: (item: T) => React.ReactNode;
}

const Menu = <T,>({ items, render }: IProps<T>) => {
    const [show, setShow] = useState(false)

    return <div className="flex flex-col relative w-max justify-center items-center min-w-[2.5rem]">
        <CiMenuKebab className="text-lg mt-7" onClick={() => setShow(!show)} />

        <OutsideClickHandler onOutsideClick={() => setShow(false)}>
            {show && <ul className="menu bg-base-200 rounded-box absolute top-4 inset-x-0 z-10 rounded-sm shadow-md p-1">
                {items.map((item, index) => (
                    <li key={index}>{render(item)}</li>
                ))}
            </ul>}
        </OutsideClickHandler>

    </div>

}

export default Menu