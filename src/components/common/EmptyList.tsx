interface IProps {
    itemType: string
}

const EmptyList = ({ itemType }: IProps) => {
    return <div className="w-full flex items-center justify-center h-[50vh]">
        <p className="text-2xl">{`No ${itemType} were found!`}</p>
    </div>
}



export default EmptyList