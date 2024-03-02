import React, { useState } from 'react';
import { TableHeader, TableNavigate } from './components';
import DrawHistoryTable from '../DrawHistoryTable';

const DrawTable = () => {
  const [searchProjectName, setSearchProjectName] = useState('');
  return (
    <div className="w-full bg-graylittle pl-2 rounded-lg pt-2 flex space-x-2">
      <TableNavigate />
      <div className="w-full space-y-3">
        <TableHeader setSearchProjectName={setSearchProjectName} />
        <DrawHistoryTable searchProjectName={searchProjectName} />
      </div>
    </div>
  );
};

export default DrawTable;
