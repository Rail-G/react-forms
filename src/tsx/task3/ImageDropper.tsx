export function ImageDropper({imageData, onDelete}: {imageData: ImageData, onDelete: (id: string) => void}) {
    return (
        <div className="image">
            <button onClick={() => onDelete(imageData.id)} className="image-close">X</button>
            <img src={typeof imageData.imageUrl === 'string' ? imageData.imageUrl : undefined} />
        </div>
    )
}
