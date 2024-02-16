/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import {Alert} from 'react-bootstrap';

import'./style.scss';
interface Props {
    variant : string,
    show : boolean,
    noti : string
}
export default function Notification(props : Props) {
    const {variant, show, noti} = props;
    const [showNoti, setShowNoti] =  React.useState(show);
    return (
        <React.Fragment>
            <Alert variant={variant} show = {showNoti} className="noti">
                <p>{noti}</p>
            </Alert>
        </React.Fragment>
    );
}