import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const EditableText = ({
  initialText,
  onPressEnter,
}: {
  initialText: string;
  onPressEnter: (value: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event: any) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <input
          onKeyDown={(e: any) => {
            if (e.code === 'Enter') {
              onPressEnter(e.target.value);
              setIsEditing(false);
            }
          }}
          className={twMerge(
            `w-fit outline-none border border-gray-300 px-1 rounded-[4px] `
          )}
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ) : (
        <span className="cursor-pointer">{text}</span>
      )}
    </div>
  );
};

export default EditableText;
