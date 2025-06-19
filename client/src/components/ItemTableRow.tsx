import { useState } from "react";

import type { fields } from "../utils/fieldsTable";
import type { Item } from "../types/Item";
import { Checkbox } from "./ui/Checkbox";
import { EditableCell } from "./TableRow/EditableCell";
import { StatusCell } from "./TableRow/StatusCell";
import { ActionCell } from "./TableRow/ActionCell";

type Field = typeof fields[number];

interface ItemTableRowProps {
  item: Item;
  selected: boolean;
  onToggleSelect: () => void;
  onSave: (values: Partial<Item>) => void;
  fields: readonly Field[];
}

export function ItemTableRow({
  item,
  selected,
  onToggleSelect,
  onSave,
  fields,
}: ItemTableRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({ ...item });

  function handleEdit() { setIsEditing(true); }
  function handleCancel() { setIsEditing(false); setEditValues({ ...item }); }
  function handleSave() { onSave(editValues); setIsEditing(false); } 

  return (
    <div
      className={`
        table-row
        cursor-pointer
        transition-colors
        ${selected ? "bg-gray-50" : "hover:bg-gray-100"}
      `}
      onClick={onToggleSelect}
    >
      <div className="table-cell pl-1.5 py-1 align-middle w-12 p-0">
        <Checkbox onClick={e => e.stopPropagation()} checked={selected} onChange={onToggleSelect} />
      </div>

      {fields.map(field => (
        <div
          key={field.key}
          className={`table-cell align-middle whitespace-nowrap overflow-hidden text-ellipsis text-sm ${isEditing ? 'pl-5':'pl-7'}`}
          style={{ width: field.width }}
        >
          {isEditing ? (
            <EditableCell
              field={field}
              value={editValues[field.key]}
              onChange={val => setEditValues(v => ({ ...v, [field.key]: val }))}
            />
          ) : field.key === "status" ? (
            <StatusCell status={item.status} />
          ) : (
            item[field.key]
          )}
        </div>
      ))}

      <div className="table-cell align-middle w-24 px-2">
        <ActionCell
          isEditing={isEditing}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}
