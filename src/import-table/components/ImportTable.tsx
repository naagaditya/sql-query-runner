import { useState } from 'react';
import './ImportTable.css';

type Props = {
  handleImport: 
    (tableNameToImport: string, tableToImport:  Record<string, any>[]) => void;
  hideModal: () => void;

};
export default function ImportTable(props: Props) {
  const [tableToImport, setTableToImport] = useState('');
  const [tableNameToImport, setTableNameToImport] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeImportString = 
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setErrorMessage('');
    setTableToImport(e.target.value);
  }
  const handleChangeImportTableName = 
    (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    setTableNameToImport(e.target.value);
  }
  const handleImport = () => {
    try {
      const parsedTable = JSON.parse(tableToImport)
      if (!Array.isArray(parsedTable)) {
        throw Error('Not a valid table');
      }
      if (!tableNameToImport) {
        throw Error('table name is required');
      }
      props.handleImport(tableNameToImport, parsedTable);
    }
    catch(error: any) {
      setErrorMessage(error.message);
    }
  }
  return (
    <div className="modal-overlay">
      <div className="modal">
        <b>Import New Table</b>
        <div className="column-container">
          <label>Table Name: </label>
          <input
            type="text"
            onChange={handleChangeImportTableName}
            value={tableNameToImport} />
        </div>
        <div className="column-container">
          <label>Table(array of JSON):  </label>
          <textarea value={tableToImport} onChange={handleChangeImportString}/>
          <span className="error-container">{errorMessage}</span>
        </div>
        <div className="btn-container">
          <button onClick={handleImport}>Import</button>
          <button onClick={() => {props.hideModal()}}>Close</button>
        </div>
        
      </div>
    </div>
  );
}