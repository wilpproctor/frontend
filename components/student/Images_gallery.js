function ImagesGallery({images}){
    return(
        <div className="row">
        {
        images.map((url)=>{
            return (
                <div className="col-sm-1">
                <div className="card">
                <img src={url} />
                </div>
                </div>
            )
        })
        }
        
        </div>
    )
}

export default ImagesGallery;