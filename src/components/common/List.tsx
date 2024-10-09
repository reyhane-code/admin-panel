import React, { useMemo } from "react";
import { IoAddSharp } from "react-icons/io5";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import Menu from "./Menu";
interface IProps<T> {
    headers: string[];
    data: any[];
    renderRow: (item: T | any, index: number) => React.ReactNode;
    onDelete?: ((item: T | any) => void) | undefined;
    onUpdate?: ((item: T | any) => void) | undefined; // Pass the item to update
    onCreate?: ((item: T | any) => void) | undefined;
    disableDelete?: boolean
    disableUpdate?: boolean
    disableCreate?: boolean
}

const List = <T,>({ onCreate, headers, data, renderRow, onDelete, onUpdate, disableCreate = false, disableDelete = false, disableUpdate = false }: IProps<T>) => {
    const handleDelete = (item: T | any) => {
        if (typeof onDelete == 'function') {
            return onDelete(item)
        }
    }
    const handleUpdate = (item: T | any) => {
        if (typeof onUpdate == 'function') {
            return onUpdate(item)
        }
    }
    const actionsList = useMemo(() => {
        const items = []
        if (!disableDelete && typeof onDelete == 'function') {
            items.push({
                icon: <MdOutlineDelete className="text-xl" />,
                action: handleDelete,
                title: "delete"
            })
        }
        if (!disableUpdate && typeof onUpdate == 'function') {
            items.push({
                icon: <MdOutlineEdit className="text-xl"/>,
                action: handleUpdate,
                title: "update"
            })
        }
        return items;

    }, [disableUpdate, disableUpdate, onDelete, onUpdate])
    return (
        <div className="container mx-auto mt-5">

            {!disableCreate &&
                <button
                    className="bg-green-400 px-2 py-2 rounded-sm text-md shadow-md"
                    onClick={onCreate}
                >
                    <IoAddSharp className="text-white text-lg" />
                </button>}
            <div>

                <div className="">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                {headers.map((header, index) => (
                                    <th key={index} className="text-center font-bold text-base">
                                        {header}
                                    </th>
                                ))}
                                <th className="text-center font-bold text-base">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {data && data.length > 0 ? (

                                data.map((item: any, index: number) => (
                                    <tr key={index}>
                                        {renderRow(item, index)}
                                        <Menu items={actionsList} render={(item) => (
                                            <button className="px-2 py-2" onClick={item.action} title={item.title}>
                                                {item.icon}
                                            </button>
                                        )}></Menu>
                                    </tr>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-4">No data found.</div>
                            )}


                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default List;