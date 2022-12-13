import { GroceryList } from "@prisma/client";
import { type NextPage } from "next";
import React, { memo } from "react";

interface CardProps {
  children: React.ReactNode;
}

export const Card: NextPage<CardProps> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-100">
      {children}
    </div>
  );
};

export const CardContent: NextPage<CardProps> = ({ children }) => {
  return (
    <div className="w-5/6 rounded-lg bg-white drop-shadow-md md:w-4/6 lg:w-3/6 xl:w-2/6">
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: string;
  listLength: number;
  clearAllFn?: () => void;
}

export const CardHeader: NextPage<CardHeaderProps> = ({
  title,
  listLength,
  clearAllFn,
}) => {
  return (
    <div className="flex flex-row items-center justify-between border-b border-slate-200 p-3">
      <div className="flex flex-row items-center justify-between">
        <h1 className="mr-2 text-base font-medium tracking-wide text-gray-900">
          {title}
        </h1>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-200 text-xs text-blue-600">
          {listLength}
        </span>
      </div>
      <button
        className="text-sm font-medium text-gray-600 underline"
        type="button"
        onClick={clearAllFn}
      >
        Clear All
      </button>
    </div>
  );
};

export const List: NextPage<CardProps> = ({ children }) => {
  return <div className="h-72 overflow-y-auto">{children}</div>;
};

interface ListItemProps {
  item: GroceryList;
  onUpdate?: (item: GroceryList) => void;
}

const ListItemComponent: NextPage<ListItemProps> = ({ item, onUpdate }) => {
  return (
    <div className="flex h-12 items-center justify-start border-b px-3">
      <input
        type={"checkbox"}
        className="mr-4 h-4 w-4 rounded border-gray-300"
        defaultChecked={item.checked as boolean}
        onChange={() => onUpdate?.(item)}
      />
      <h2 className="text-sm tracking-wide text-gray-600">{item.title}</h2>
    </div>
  );
};

export const ListItem = memo(ListItemComponent);

interface CardFormProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submit: () => void;
}

export const CardForm: NextPage<CardFormProps> = ({
  value,
  onChange,
  submit,
}) => {
  return (
    <div className="mt-4 w-5/6 rounded-lg bg-white drop-shadow-md md:w-4/6 lg:w-3/6 xl:w-2/6">
      <div className="relative">
        <input
          className="w-full rounded-lg py-4 pl-3 pr-16 text-sm"
          type="text"
          placeholder="Grocery item name..."
          onChange={onChange}
          value={value}
        />
        <button
          className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-blue-600 p-2 text-white"
          type="button"
          onClick={submit}
        >
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
