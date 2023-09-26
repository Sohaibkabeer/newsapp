import React from "react";

const NewsItem = (props)=> {
    let {title, description,author,date,source, imageUrl, newsUrl} = props; // javascript de-constructing
    return (
      <>
        <div className="card my-3">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex: '1'}}>{source}</span>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <p className="card-text"><small className="text-body-secondary">By {author? author : "unknown"} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark"> {/*using target="_blank" to open in new tab */}
             Read more
            </a>
          </div>
        </div>
      </>
    );
}

export default NewsItem;
