import React from "react";
import {request} from "../../actions/main";

export default function Statistic() {
    request('statistic', 'GET').then(resp => {
        console.log(resp);
    })
    return (
        <div>
            Statistic
        </div>
    )
}