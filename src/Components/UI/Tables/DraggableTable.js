import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Table } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};


export default function DraggableTable({
  columns, data
}) {
  const [tableConfig, setTableConfig] = useState({
    columns, data
  })

  const [draggableElement, setDraggableElement] = useState(null)

  useEffect(() => {
    setTableConfig(prev => ({
      ...prev,
      data
    }))
  }, [data])
  


  const getItemStyle = (isDragging, draggableStyle, other) => {
    if (isDragging) {
      const parentElement = document.querySelector('.padded_modal_top');
      let parentRect = parentElement.getBoundingClientRect();
      let topRelativeToParent = draggableStyle.top - parentRect.top;
      let clickX = draggableElement.clientX - draggableStyle.left;

      draggableStyle.top = `${topRelativeToParent}px`;
      draggableStyle.left = `${clickX}px`;
    }
    return {
      userSelect: "none",

      ...(isDragging && {
        webkitBoxShadow: "-7px 9px 13px 3px rgba(0,0,0,0.54)",
        mozBoxShadow: "-7px 9px 13px 3px rgba(0,0,0,0.54)",
        boxShadow: "-7px 9px 13px 3px rgba(0,0,0,0.54)",
      }),
      ...draggableStyle
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    let data = [...tableConfig.data]

    const newdata = reorder(
      data,
      result.source.index,
      result.destination.index
    );

    setTableConfig(prev => ({
      ...prev,
      data: newdata
    }));
  };

  const onMouseDown = (e) => {
    setDraggableElement({
      clientX: e.clientX
    })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <Table {...provided.droppableProps} ref={provided.innerRef} className="mb-0 text-start align-middle">
            <thead>
              <th></th>
              {tableConfig.columns.map((column, i) => (
                <th key={i}>{column.Header}</th>
              ))}
            </thead>
            <tbody>
              {tableConfig.data.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <tr ref={provided.innerRef} {...provided.draggableProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style, { provided, snapshot })}>
                      <td {...provided.dragHandleProps} onMouseDown={onMouseDown}>
                        <FontAwesome className="fa fa-align-justify" />
                      </td>
                      {tableConfig.columns.map((column, i) => (
                        <td key={i}>{typeof column.Cell != 'undefined' ? column.Cell(item) : item[column.accessor]}</td>
                      ))}
                    </tr>
                  )}
                </Draggable>
              ))}
            </tbody>
          </Table>
        )}
      </Droppable>
    </DragDropContext>
  );
}
