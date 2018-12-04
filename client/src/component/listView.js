
import React, { Component } from 'react';

function NumberList(props) {
    const listView = props.names.map((name) =>
        <li id="people">{name}</li>
    );
    return (
        <ul>{listView}</ul>
    );
}

export default NumberList;
