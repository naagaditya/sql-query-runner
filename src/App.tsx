import { useState } from 'react';
import './App.css';
import { Users } from './dummyData/dummyTables';
import Table from './table/Table';

function App() {
  const [filteredTable, setFilteredTable] = useState<Record<string, any>[]>([]);
  const [query, setQuery] = useState('');

  const AllTable: Record<string, Record<string, any>[]>  = {
    Users 
  };
  
  const handleChangeQuery = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedQuery = e.target.value;
    setQuery(updatedQuery);
  }
  const handleExecuteQuery = () => {
    let columns: string = '';
    let tableName: string = '';
    [, columns, tableName] = query.match(/SELECT (.*) FROM (.*);/) || [];
    let res;
    if (columns && tableName) {
      if (columns.trim() === '*') {
        res = AllTable[tableName]
      } else {
        res = AllTable[tableName].map(row => 
          columns.split(',').reduce((acc, col) => ({...acc, [`${col.trim()}`]: row[col.trim()] }), {}))
      }
      setFilteredTable(res);
    } else {
      console.error('Wrong query'); 
    }
    
  };
  return (
    <div className="App">
      <div className="query-input">
        <textarea className="query-input" onChange={handleChangeQuery}></textarea>
        <button onClick={handleExecuteQuery}>Run</button>
      </div>
      <div className="query-output">
        <Table tableData={filteredTable}/>
      </div>
      <div className="avaiable-tables">
        <Table tableData={Users}/>
      </div>
    </div>
  );
}

export default App;
