import { Avatar } from "@mui/material";
import React from "react";
import { HIGHLIGHT_VALUE_EQUAL } from "../../exports/constants";
import { ITable, RowTypes } from "../../exports/types";

import './Table.css'

interface IProps<TableData> {
  table_config: ITable<TableData & any>[];
  table_data: TableData[];
  selected_data?: TableData[];
  onChange?: (colId: string | number) => void 
  checkable?: boolean;
}

const Table =<DataType extends {id: string | number, type?: RowTypes}>({ table_config, table_data, selected_data, checkable, onChange }: IProps<DataType>): React.ReactElement => {

  const handleClickCheckbox = (id: string | number) => {
    onChange && onChange(id);
  }

  return (
    <table>

      {/* HEAD */}
      <thead>
        <tr>
          {checkable ? <th style={{width: "50px"}} ></th> : null}
          {table_config.map((col) => (
            <th style={{width: col.width}}  key={col.field.toString()}>{col.headerName}</th>
          ))}
        </tr>
      </thead>
      
      {/* BODY */}
      <tbody>
        {table_data.map((data: any) => {
          const isChecked = selected_data && !!selected_data.find((sel_data) => sel_data.id === data.id);
          return (
            <tr key={data.id} className={isChecked ? 'tr-checked' : ''}>
              {/* CHECKBOX */}
              {checkable ? (
                <td width={'50px'}>
                  <input
                    className="td-checkbox"
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {
                      handleClickCheckbox(data.id);
                    }}
                  />
                </td>
              ) : null}
              {table_config.map((col) => {
                const value = data[col.field];

                // Dispay items with passed param "key"
                if (col.key && typeof value === "object") {
                  return (
                    <td
                      className={
                        Number(value[col.key]) === HIGHLIGHT_VALUE_EQUAL
                          ? "highlight"
                          : "nope"
                      }
                      width={col.width}
                      key={(col.field as string) + "_" + data.id}
                    >
                      {value[col.key]}
                    </td>
                  );
                }

                // Display items that are string or number
                if (typeof value === "string" || typeof value === "number") {
                  return (
                    <td width={col.width} key={value + "_" + data.id} className="">
                      <div className="td-text">
                        {col.imageKey ? (
                          <Avatar src={data[col.imageKey]} sx={{marginRight: '10px'}} />
                        ) : null}
                        <span>{value}</span>
                      </div>
                    </td>
                  );
                }
                // Display items that have type - "tags"
                if (col.type === "tags" && Array.isArray(value)) {
                  return (
                    <td
                      width={col.width}
                      key={data.id}
                      className="td-tags-container"
                    >
                      {value.map((item) => (
                        <div
                          className="td-tag"
                          key={data.id + "_" + item.tag_name}
                        >
                          {item.tag_name}
                        </div>
                      ))}
                    </td>
                  );
                }

                return null;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
