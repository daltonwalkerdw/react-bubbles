import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    axios
    .get("http://localhost:5000/api/colors", {
      headers: { Authorization: localStorage.getItem("token") }
    })
    .then(res => {
      console.log(res.data)
      setColorList(res.data)
    })
    .catch(err => console.log(err))
  }, [])

  // const deleteColor = color => {
  //   // make a delete request to delete this color
  //   axios
  //     .delete(`http://localhost:5000/api/colors/${color.id}`, {
  //       headers: { Authorization: localStorage.getItem("token") }
  //     })
  //     .then(response => {
  //       setColorList(response.data);
  //       console.log("delete", response.data)
  //     })
  //     .catch(err => console.log(err));
  // };


  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
