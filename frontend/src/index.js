import React from 'react';
import { PhotoEditorSDK } from './js/components/PhotoEditor.jsx';
// import { Form } from './js/components/Form.jsx';
import ReactDOM from "react-dom";

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<PhotoEditorSDK />, wrapper) : false;