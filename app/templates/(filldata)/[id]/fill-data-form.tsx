"use client";

import React from "react";

type FillDataFromProps = {
  variables: string[];
};

function FillDataFrom({ variables }: FillDataFromProps) {
  return (
    <form className="flex flex-col gap-3">
      {variables.map((variable) => {
        return (
          <div key={variable} className="flex flex-col gap-1">
            <label>{variable}</label>
            <input required name={variable} placeholder={`${variable} : ...`} />
          </div>
        );
      })}
      <button>Submit</button>
    </form>
  );
}

export default FillDataFrom;
