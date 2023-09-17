import { useState } from 'react';
import './SQLQueryRunner.css';
import { Users } from 'dummyData/dummyTables';
import Table from 'common/components/table/Table';
import ImportTable from 'import-table/components/ImportTable';
import TableWrapper from 'common/components/TableWrapper/TableWrapper';
import QueryInput from 'query-input/components/QueryInput';

export default function SQLQueryRunner() {
  const [filteredTable, setFilteredTable] = useState<Record<string, any>[]>([]);
  const [isShowImportModal, setShowImportModal] = useState(false);
  const [allTables, setAllTables] = useState<Record<string, Record<string, any>[]>>({Users})
  

  const handleDeleteTable = (tableName: string) => {
    delete allTables[tableName];
    setAllTables({...allTables});
  };
  const handleImport = (tableNameToImport: string, tableToImport: Record<string, any>[]) => {
    setAllTables({
      ...allTables,
      [tableNameToImport]: tableToImport
    });
    setShowImportModal(false);
  };
  
  return (
    <div className="sql-query-runner">
      <QueryInput allTables={allTables} setFilteredTable={setFilteredTable}/> 
      <div className="query-output">
        <Table tableData={filteredTable}/>
      </div>
      <div className="avaiable-tables">
        <button className="import-btn" onClick={() => {setShowImportModal(true)}}>Import Table</button>
        {Object.keys(allTables).map((tableName, index) =>
          <TableWrapper
            key={`${tableName}${index}`}
            tableName={tableName}
            tableData={allTables[tableName]}
            handleDeleteTable={() => {handleDeleteTable(tableName)}}/>
          )}
      </div>
      {isShowImportModal && <ImportTable
        hideModal={() => {setShowImportModal(false)}}
        handleImport={handleImport}
      />}
    </div>
  )
}