import React from "react";
import Modal from "./Modal";

interface IProps {
    headers: string[];
    data: any[];
    renderRow: (item: any, index: number) => React.ReactNode;
    onDelete: (id: number) => void;
    onUpdate: (item: any) => void; // Pass the item to update
    onCreate: (item: any) => void;
}

const List = ({ onCreate, headers, data, renderRow, onDelete, onUpdate }: IProps) => {
    const handleDelete = async () => {
        // <Modal>
        {/*  */ }
        {/* </Modal> */ }

    }
    return (
        <div className="container mx-auto mt-5">

            <button
                className="bg-green-500 text-white px-2 py-2 rounded-sm text-md shadow-md"
                onClick={onCreate}
            >
                Add
            </button>
            <div>

                <div className="">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                {headers.map((header, index) => (
                                    <th key={index}>
                                        {header}
                                    </th>
                                ))}
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
                                                onClick={() => onUpdate(item.id)} // Pass the item to onUpdate
                                            >
                                                Update
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-2 py-1 rounded-sm text-md shadow-md"
                                                onClick={() => onDelete(item.id)}
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