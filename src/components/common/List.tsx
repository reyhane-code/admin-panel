import React from "react";
import Modal from "./Modal";

interface Props {
    headers: string[];
    headersCount: number;
    data: any[];
    renderRow: (item: any, index: number) => React.ReactNode;
    onDelete: (id: number) => void;
    onUpdate: (item: any) => void; // Pass the item to update
}

const List = ({ headers, data, renderRow, onDelete, onUpdate, headersCount }: Props) => {
    const handleDelete = async () => {
        // <Modal>
            {/*  */}
        {/* </Modal> */}
     }
    return (
        <div className="container mx-auto mt-5">
            <div className={`grid grid-cols-${headersCount} gap-4 bg-white p-4 border border-gray-200 rounded-lg`}>
                {/* Header Row */}
                {headers.map((header, index) => (
                    <div key={index} className="font-semibold text-gray-600 flex justify-center items-center mx-2">
                        {header}
                    </div>
                ))}

                {/* Data Rows */}
                {data && data.length > 0 ? (
                    data.map((item: any, index: number) => (
                        <React.Fragment key={item.id}>
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
                                    onClick={() => onDelete(item.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </React.Fragment>
                    ))
                ) : (
                    <div className="col-span-full text-center py-4">No data found.</div>
                )}
            </div>
        </div>
    );
};

export default List;