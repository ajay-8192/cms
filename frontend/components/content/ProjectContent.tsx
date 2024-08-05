import React, { useState } from "react";

const ProjectContent = () => {
  const contentItems = [
    {
      id: 1,
      name: "ContentContentContentContentContentContentContentContentContentContent 1",
      values: {
        key1: "Value1",
        key12zd: "Value1f",
        key3ndfgh3: "Value1asghn",
        key45wwrwe: "Value1dsn",
        key355242: "Value1sdfhjmfc",
        key5w36: "Value1dfgzxvchbjnfx",
        key37: "Value1z lxkjlchgnv",
        key853: "Value1vzdsgSDF",
        key21: "Value21",
        key22: "Value21",
        key23: "Value21",
        key24: "Value21",
        key25: "Value21",
        key26: "Value21",
        key27: "Value21",
        key28: "Value21",
        key211: "Value21",
        key222: "Value21",
        key234: "Value21",
        key245: "Value21",
        keydw25: "Value21",
        kedy26: "Value21",
        kedgy27: "Value21",
        sdfkey28: "Value21",
      },
    },
    {
      id: 2,
      name: "Content 2",
      values: {
        key21: "Value21",
        key22: "Value21",
        key23: "Value21",
        key24: "Value21",
        key25: "Value21",
        key26: "Value21",
        key27: "Value21",
        key28: "Value21",
      },
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(contentItems[0]);

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    console.log({ option });

    setIsOpen(false);
  };

  return (
    <div className="w-full overflow-auto scrollbar-hide p-4">
      <div className="flex justify-between px-4 pt-4">
        <div className="border-b shadow w-80 rounded">
          <div
            className="bg-gray-200 p-2 text-center truncate w-full"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedOption.name}
          </div>
          {isOpen && (
            <div className="absolute mt-1 max-w-60 bg-white rounded shadow-lg z-20">
              {contentItems.map((option) => (
                <div
                  key={option.id}
                  className="p-2 hover:bg-gray-100 truncate"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <button className="border px-4 rounded-xl bg-green-500 active:bg-green-700 text-primary-white">
          Add new Content
        </button>
      </div>
      <div className="mt-8 mx-auto p-4">
        {Object.keys(selectedOption.values).map((item) => {
          return (
            <div
              key={item}
              className="flex justify-center w-full gap-3 mb-4 rounded-lg"
            >
              <div className="w-1/4 opacity-60 border px-2">{item}</div> :
              <div className="w-3/4 font-medium border px-2">
                {
                  selectedOption.values[
                    item as keyof typeof selectedOption.values
                  ]
                }
              </div>
            </div>
          );
        })}
      </div>
      <div className="my-8 ml-4">
        <button className="border px-4 py-2 rounded-lg text-white bg-primary active:bg-primary-blue">
          Add row
        </button>
      </div>
    </div>
  );
};

export default ProjectContent;
