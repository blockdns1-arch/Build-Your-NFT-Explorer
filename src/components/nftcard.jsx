const NftCard = ({ image, id, title, address, description, attributes }) => {
    const tokenId = String(id ?? "");
    const contract = String(address ?? "");
    return (
        <div className="w-1/4 mr-3 mb-4 bg-slate-100 rounded-md" >
            <img className='w-full rounded-t-md' key={tokenId} src={image}></img>
            <div className="p-3">
                <div className="flex mb-3">
                    <div className="flex-grow">
                        <h3 className="text-xl">{title}</h3>
                        <p>{`${tokenId.slice(0, 4)}...${tokenId.slice(tokenId.length - 4)}`}</p>
                    </div>
                    <div className="flex mr-3">
                        <a target="_blank" rel="noreferrer" className="text-blue-700" href={`https://etherscan.io/token/${contract}`}>{`${contract.slice(0, 4)}...${contract.slice(contract.length - 4)}`}</a>
                    </div>
                </div>
                <p>{description? description.slice(0, 200) : "No Description"}</p>
            </div>
            <div className="flex flex-wrap justify-center items-center p-3 ">
                {(attributes?.length || 0) > 0 && attributes.map((attribute, i) => {
                    return (
                        <div key={i} className="w-1/2 mb-2 flex justify-start flex-col">
                            <p className="mr-2 font-bold">{attribute.trait_type}:</p>
                            <p className="text-sm">{attribute.value}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default NftCard