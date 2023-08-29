import React from 'react';

const Sidebar = ({ executeCode, clearEditor }) => {
    return (
        <div className="sidebar w-1/3 p-4 bg-gray-200">
            <button onClick={executeCode}>Execute Code</button>
            <button onClick={clearEditor}>Clear Editor</button>
        </div>
    );
};

export default Sidebar;
