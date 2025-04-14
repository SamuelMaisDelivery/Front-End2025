import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import axios from "axios";

const columns = ["Professores", "Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

function SortableItem({ id }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "0.5rem",
    margin: "0.5rem 0",
    background: "#f0f0f0",
    borderRadius: "8px",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {id}
    </div>
  );
}

export default function Kanban() {
  const [items, setItems] = useState({});
  const sensors = useSensors(useSensor(PointerSensor));

  // Carrega os dados do back-end
  useEffect(() => {
    axios.get("/painel/assets/Kanban").then((res) => {
      setItems(res.data);
    });
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    let sourceCol, targetCol;
    for (const col of columns) {
      if (items[col]?.includes(active.id)) sourceCol = col;
      if (items[col]?.includes(over.id)) targetCol = col;
    }

    if (!targetCol && over.id in items) targetCol = over.id;

    if (sourceCol && targetCol) {
      const newSource = [...items[sourceCol]].filter((item) => item !== active.id);
      const newTarget = [...items[targetCol], active.id];

      const newState = {
        ...items,
        [sourceCol]: newSource,
        [targetCol]: newTarget,
      };

      setItems(newState);

      // Salva no back-end
      axios.post("/painel/assets/Kanban", newState);
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
        {columns.map((col) => (
          <div key={col} style={{ flex: 1 }}>
            <h3 style={{ textAlign: "center" }}>{col}</h3>
            <div
              style={{
                minHeight: "300px",
                padding: "1rem",
                background: "#e8e8e8",
                borderRadius: "8px",
              }}
            >
              <SortableContext items={items[col] || []} strategy={verticalListSortingStrategy}>
                {(items[col] || []).map((item) => (
                  <SortableItem key={item} id={item} />
                ))}
              </SortableContext>
            </div>
          </div>
        ))}
      </div>
    </DndContext>
  );
}
