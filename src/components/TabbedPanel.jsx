import React from "react";

export default function TabbedPanel({ tabs, activeTab, setActiveTab }) {
  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {tabs.map((tab) => (
        <li key={tab} className="me-2 cursor-pointer">
          <div
            onClick={() => setActiveTab(tab)}
            aria-current="page"
            className={`
                inline-block p-4 rounded-t-lg
                 ${
                   activeTab === tab
                     ? "text-blue-600 bg-gray-100 active dark:bg-gray-800 dark:text-blue-500"
                     : "hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                 }
                 `}
          >
            {tab}
          </div>
        </li>
      ))}
    </ul>
  );
}
