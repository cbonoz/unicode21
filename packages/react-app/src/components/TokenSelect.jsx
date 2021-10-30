import React from "react";
import { TOKENS } from "../util/tokens";
import { Select } from "antd";

const { Option } = Select;

function TokenSelect({ onChange }) {
  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Select token"
      optionFilterProp="children"
      onChange={v => onChange(TOKENS.find(x => x.symbol === v))}
      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    >
      {TOKENS.map((t, i) => {
        return (
          <Option key={i} value={t.symbol}>
            {t.name}
          </Option>
        );
      })}
    </Select>
  );
}

export default TokenSelect;
