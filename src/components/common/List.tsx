import React from "react";
import { IoAddSharp } from "react-icons/io5";

interface IProps<T> {
    headers: string[];
    data: any[];
    renderRow: (item: T | any, index: number) => React.ReactNode;
    onDelete: (item: T | any) => void;
    onUpdate: (item: T | any) => void; // Pass the item to update
    onCreate: (item: T | any) => void;
}

const List = <T,>({ onCreate, headers, data, renderRow, onDelete, onUpdate }: IProps<T>) => {
    return (
        <div className="container mx-auto mt-5">

            <button
                className="bg-green-400 px-2 py-2 rounded-sm text-md shadow-md"
                onClick={onCreate}
            >
                <IoAddSharp className="text-white text-lg" />
            </button>
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
                                    <tr>
                                        {renderRow(item, index)}
                                        <div className="col-span-full flex space-x-2 border-b border-gray-200 py-2">
                                            <button
                                                className="bg-blue-500 text-white px-2 py-2 rounded-sm text-md shadow-md"
                                                onClick={() => onUpdate(item)} // Pass the item to onUpdate
                                            >
                                                Update
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-2 py-1 rounded-sm text-md shadow-md"
                                                onClick={() => onDelete(item)}
                                            >
                                                Delete
                                            </button>
                                        </div>
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