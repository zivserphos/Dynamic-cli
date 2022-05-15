/* eslint-disable import/no-anonymous-default-export */
// import React from "react";
// import ReactDOM  from "react-dom";

// show(<h1>xdsfsf</h1>)
export default `
     import React from "react@16"
    import ReactDOM from "react-dom@16";
    const show = (value) => {
    const root= document.querySelector("#root");
    if (typeof value === 'object') { // display as an object
        if (value.$$typeof && value.props) { // check if object is a jsx elment
            ReactDOM.render(value ,root)
            }
        else {
            root.innerHTML = JSON.stringify(value)
        }
    }
    else {
        root.innerHTML =value
    }
}

    `;

// const show = (value) => {
// const root= document.querySelector("#root");
// if (typeof value === 'object') { // display as an object
//     console.log("g")
//     // if (value.$$typeof && value.props) { // check if object is a jsx elment
//     //     ReactDOM.render(value ,root)

//     //     }
//     // else {
//     //     console.log("aaaaaaa")
//     //     root.innerHTML = JSON.stringify(value)
//     //     }
//     }
// else {
//     root.innerHTML =value
// }
// }
