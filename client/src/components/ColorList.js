import React, { useState, useEffect } from "react";
import axios from "axios";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorState, setColorState] = useState(colors)


  //   useEffect(() => {
  //     console.log("props test", props.colors)
  //    const editingItem = props.colors.find(thing => {
  //      return thing.id === Number(props.match.params.id);
  //    });

  //    if (editingItem) {
  //      setColorState(editingItem);
  //    }
  //  }, [props.colors]);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);

  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axios
      .put(`http://localhost:5000/api/colors/${colors.id}`, colorToEdit, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(response => {
        const updatedItem = response.data;
        const newItems = colors.map(item => {
          if (item.id !== updatedItem.id) {
            return item
          }
          return updatedItem;
        })
        updateColors(newItems)

      })
      .catch(err => console.log(err));
  };

  

  const deleteColor = async (color) => {
    // make a delete request to delete this color
    await axios
      .delete(`http://localhost:5000/api/colors/${color.id}`, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(response => {
        const updatedItem = response.data;
        const newItems = colors.map(item => {
          if (item.id !== updatedItem.id) {
            return item
          }
          return updatedItem;
        })
        updateColors(newItems)
      })
      .catch(err => console.log(err));
    
    window.location.reload()
  };


  if (colors.length === 0) {
    return (<p> loading </p>)
  }
  else {
    return (
      <div className="colors-wrap">
        <p>colors</p>

        <ul>
          {colors.map(color => (
            <li key={color.color} onClick={() => editColor(color)}>
              <span>
                <span className="delete" onClick={e => {
                  e.stopPropagation();

                  deleteColor(color)
                }
                }>
                  x
              </span>{" "}
                {color.color}
              </span>
              <div
                className="color-box"
                style={{ backgroundColor: color.code.hex }}
              />
            </li>
          ))}
        </ul>
        {editing && (
          <form onSubmit={saveEdit}>
            <legend>edit color</legend>
            <label>
              color name:
            <input
                onChange={e =>
                  setColorToEdit({ ...colorToEdit, color: e.target.value })
                }
                value={colorToEdit.color}
              />
            </label>
            <label>
              hex code:
            <input
                onChange={e =>
                  setColorToEdit({
                    ...colorToEdit,
                    code: { hex: e.target.value }
                  })
                }
                value={colorToEdit.code.hex}
              />
            </label>
            <div className="button-row">
              <button type="submit">save</button>
              <button onClick={() => setEditing(false)}>cancel</button>
            </div>
          </form>
        )}
        <div className="spacer" />
        {/* stretch - build another form here to add a color */}
      </div>
    );
  };
}
export default ColorList;
