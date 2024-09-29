import React, { useEffect, useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { HttpRequest } from '../../helpers/http-request-class.helper';
import useAuth from '../../hooks/useAuth';
import { GenericAbortSignal } from 'axios';

interface BookmarkButtonProps {
    entity: string;
    id: number;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ entity, id }) => {
    const [bookmarked, setBookmarked] = useState(false);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated, loginIfNeeded } = useAuth()

    const checkIfBookmarked = async (signal?: GenericAbortSignal) => {
        if (!isAuthenticated) return;

        try {
            const res = await HttpRequest.get<boolean>(`/v1/bookmarks/user/bookmarked/${entity}/${id}`, { signal });

            if (res) {
                const data = res.data;
                setBookmarked(data);
            }
        } catch (error) {
            console.error('Error checking bookmark status:', error);
        }
    };

    useEffect(()=>{
        const controller = new AbortController(); // Create an AbortController

        checkIfBookmarked(controller.signal);
    
        return () => {
          controller.abort(); // Cleanup function to abort the fetch request
        };
    })


    const bookmarkOrRemoveBookmark = async () => {
        if (!isAuthenticated) {
            return;
        }

        const isBookmarking = !bookmarked;
        const url = `/v1/bookmarks/${entity}/${id}`;

        setLoading(true);

        try {
            const res =
                isBookmarking
                    ? await HttpRequest.post(url, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    : await HttpRequest.delete(url, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

            if (!res) {
                throw new Error('Network response was not ok');
            }

            setBookmarked(isBookmarking);
        } catch (error) {
            console.error('Error bookmarking/unbookmarking:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBookmark = () => loginIfNeeded(bookmarkOrRemoveBookmark)

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={handleBookmark} disabled={loading} style={{ cursor: 'pointer', padding: '10px', fontSize: '16px' }}>
                <div className='w-full flex justify-between items-center'>
                    {loading ? 'Loading...' : bookmarked ? <FaBookmark className='text-lg' /> : <FaRegBookmark className='text-lg' />}
                </div>
            </button>

        </div>
    );
};

export default BookmarkButton;
