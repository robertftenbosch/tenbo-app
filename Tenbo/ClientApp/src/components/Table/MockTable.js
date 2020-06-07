import {Grid} from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import React, {useEffect} from "react";

export default function MockTable() {
    const grid = new Grid({
        columns: ['Title', 'Director', 'Producer'],
        server: {
            url: 'https://swapi.dev/api/films/',
            then: data => data.results.map(movie => [movie.title, movie.director, movie.producer])
        },
        search:true,
        sort:true,
        pagination:true
    });

    useEffect(() => {
        grid.render(document.getElementById('wrapper'));
    });

    return (
        <div id="wrapper"/>
    );
}