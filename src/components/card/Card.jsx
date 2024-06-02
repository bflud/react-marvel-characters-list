import React from "react";
import "./card.css";

export const formatText = (text) => {
  return text.split(',').map((item, index) => (
    <span key={index}>
      {item.trim()}
      {index < text.split(',').length - 1 && <br />}
    </span>
  ));
};
const Card = ({ characters, headers }) => {


  return (
    <div className="card-container">
      <div className="card-header row">
        {headers.map((header, index) => (
          <div key={index} className={`col ${index !== 0 ? "d-none d-md-inline-block" : ""}`}>
            {formatText(header)}
          </div>
        ))}
      </div>
      {characters.map((character, index) => (
        <div key={index} className="card">

          <div className="card-row row">
            {headers.map((header, index) => (
              <div key={index} className={`card-column col ${index !== 0 ? "d-none d-md-inline-block" : ""}`}>
                {index === 0 && character.imageUrl && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      className="image"
                      src={character.imageUrl}
                      alt={character[header]}
                    />
                    <span style={{ marginLeft: "8px" }}>
                      {formatText(character[header])}
                    </span>
                  </div>
                )}
                {index !== 0 && formatText(character[header])}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
