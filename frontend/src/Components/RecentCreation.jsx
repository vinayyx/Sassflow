import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import Markdown from 'react-markdown';

function RecentCreation({ items }) {
  const [expended, setExpended] = useState(false);


  return (
    <div className="w-full">
      {/* Top summary */}
      <div
        onClick={() => setExpended(!expended)}
        className="cursor-pointer mx-auto flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-300"
      >
        <div className="flex items-start gap-3">
          <div className="p-1.5 bg-blue-100 rounded-md">
            <FileText className="text-blue-600 w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-sm font-medium text-gray-800 line-clamp-1">{items.prompt}</h2>
            <p className="text-[10px] text-gray-500">
              {items.type} • {new Date(items.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md border border-blue-100 font-medium">
          {items.type}
        </span>
      </div>

      {/* Expandable content */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${expended ? 'max-h-[500px] mt-2' : 'max-h-0'
          }`}
      >
        {items.type === 'Image-genrate'? (
          <img
            src={items.content}
            alt={items.prompt}
            className="w-full max-h-[500px] object-contain rounded-md"
          />
        ) : (
          <div className="text-sm text-gray-600 px-2 pt-2">
            <Markdown>{String(items.content)}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentCreation;
