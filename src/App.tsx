import { useState } from 'react';
import './App.css';
import { Users } from './dummyData/dummyTables';
import Table from './table/Table';
import { evaluateWhereCondition } from './utils/evaluateWhereCondition';

function App() {
  const [filteredTable, setFilteredTable] = useState<Record<string, any>[]>([]);
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isShowImportModal, setShowImportModal] = useState(false);
  const [tableToImport, setTableToImport] = useState('');
  const [tableNameToImport, setTableNameToImport] = useState('');
  const [allTables, setAllTables] = useState<Record<string, Record<string, any>[]>>({Users})
  
  const handleChangeQuery = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedQuery = e.target.value;
    setErrorMessage('');
    setQuery(updatedQuery);
  }
  const handleExecuteQuery = () => {
    let columns: string = '';
    let tableName: string = '';
    let where: string = '';
    [, columns, tableName] = query.match(/SELECT (.*) FROM (.*);/) || [];
    [, columns, tableName, where] = query.match(/SELECT (.*) FROM (.*) WHERE (.*);/) || [];
    let res;
    if (columns && tableName) {
      if (columns.trim() === '*') {
        res = allTables[tableName];
      } else {
        if(where) {
          res = allTables[tableName].filter(row => evaluateWhereCondition(row, where))
        }
        res = res?.map(row => 
          columns.split(',').reduce((acc, col) => ({...acc, [`${col.trim()}`]: row[col.trim()] }), {}))
      }
      
      setFilteredTable(res || []);
    } else {
      setErrorMessage('Wrong query'); 
    }
  };

  const handleDeleteTable = (tableName: string) => {
    delete allTables[tableName];
    setAllTables({...allTables});
  };
  const handleImport = () => {
    try {
      setAllTables({
        ...allTables,
        [tableNameToImport]: JSON.parse(tableToImport)
      });
      setShowImportModal(false);
    }
    catch(error) {

    }
    
  };
  const handleChangeImportString = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTableToImport(e.target.value)
  }
  const handleChangeImportTableName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTableNameToImport(e.target.value)
  }
  return (
    <div className="App">
      <div className="query-input">
        <textarea onChange={handleChangeQuery}/>
        <div className="run">
          <span className='error'>{errorMessage}</span>
          <button onClick={handleExecuteQuery}>Run</button>
        </div>
        
      </div>
      <div className="query-output">
        <Table tableData={filteredTable}/>
      </div>
      <div className="avaiable-tables">
        <button onClick={() => {setShowImportModal(true)}}>Import Table</button>
        {Object.keys(allTables).map((tableName, index) =>
          <div key={`${tableName}${index}`} className="table">
            <div className="table-name">
              <b>{tableName}</b>
              <button onClick={() => {handleDeleteTable(tableName)}}>Remove</button>
            </div>
            <Table tableData={allTables[tableName]}/>
          </div>)}
      </div>
      {isShowImportModal && <div className="modal-overlay">
        <div className="modal">
          <input type="text" onChange={handleChangeImportTableName} value={tableNameToImport} />
          <textarea value={tableToImport} onChange={handleChangeImportString}/>
          <button onClick={handleImport}>Import</button>
          <button onClick={() => {setShowImportModal(false)}}>Close</button>
        </div>
      </div>}
    </div>
  );
}

export default App;
