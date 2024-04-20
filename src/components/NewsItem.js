import React from 'react'

const NewsItem = (props) =>  {

        let { title, description, imageUrl, newUrl, author, date, source } = props;
        return (
            <div className='my-3'>
                <div className="card">
                    <div style={{
                        display: 'flex',
                        justifyContent:'flex-end',
                        position:'absolute',
                        right: '0'
                    }}>
                        <span className="badge rounded-pill bg-danger" >{source}</span>
                    </div>

                    <img src={!imageUrl ? "https://www.hindustantimes.com/ht-img/img/2024/04/10/550x309/WhatsApp_Image_2024-04-10_at_80727_AM_1712721070963_1712721071103.jpeg" : imageUrl} className="card-img-top" alt="..." />

                    <div className="card-body">
                        <h5 className="card-title">{title} </h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknow" : author} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )

}

export default NewsItem
