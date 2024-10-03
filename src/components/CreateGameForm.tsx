import { useState } from "react"
import { HttpRequest } from "../helpers/http-request-class.helper"
import GameForm from "./GameFrom"

const CreateGameForm = () => {

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const onSubmit = async (data: any) => {
        setIsLoading(true)
        try {

            const res = await HttpRequest.post(`/v1/games`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!res) {
                setError('can not create!')
            }
            if (res.status == 200) {
                return res.data
            }
        } catch (error) {
            setError('create process went wrong!')
        } finally {
            setIsLoading(false)
        }

    }
    if (isLoading) {
        return <div className="container mx-auto mt-5">Loading...</div>;
    }

    if (error) {
        return (
            <div className="container mx-auto mt-5 text-red-500">
                {error}
            </div>
        );
    }
    return <div>
        <GameForm onSubmit={onSubmit} />
    </div>


}



export default CreateGameForm