import React from "react";

export default function ErrorMessage({ message }) {
  return (
    <div className="mt-4 bg-red-100 text-red-600 p-3 rounded-lg">
      {message}
    </div>
  );
}