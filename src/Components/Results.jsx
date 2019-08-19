import React from "react";

const Results = props => (
    <div>
        <h1>{props.temperature}</h1>
        <br />
        <h1>{props.description}</h1>
        <br />
        <h2>{props.weatherLow}</h2>
        <h2>{props.weatherHigh}</h2>
    </div>
);

export default Results;