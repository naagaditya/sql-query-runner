import { useState } from 'react';
import './ImportTable.css';

type Props = {
  handleImport: 
    (tableNameToImport: string, tableToImport:  Record<string, any>[]) => void;
  hideModal: () => void;

};

type InputType = 'CSV' | 'JSON';

export default function ImportTable(props: Props) {
  const [tableToImport, setTableToImport] = useState('');
  const [tableNameToImport, setTableNameToImport] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [inputType, setInputType] = useState<InputType>('CSV');

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
  const getTableFromCSV = (tableToImport: string) => {
    const csvArr = tableToImport.split(/\n/);
    const headers = csvArr[0].split(',');
    const rows = csvArr.slice(1);
    return rows.map(row => {
      const values = row.split(',');
      const jsonRow: any = {};
      headers.forEach((key, i) => {
        jsonRow[key] = values[i];
      });
      return jsonRow;
    });
  }
  const handleImport = () => {
    try {
      const parsedTable = inputType === 'JSON' ? 
        JSON.parse(tableToImport) : getTableFromCSV(tableToImport);
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

  const handleChangeInputType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as InputType;
    if (e.target.checked) {
      setInputType(value);
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
        <div className="btn-container">
          <div>
            <input
              id="JSON"
              checked={inputType === 'JSON'}
              type="radio"
              name="input_type"
              value="JSON"
              onChange={handleChangeInputType}/>
            <label htmlFor="JSON">JSON</label>
          </div>
          <div>
            <input
              id="CSV"
              checked={inputType === 'CSV'}
              type="radio"
              name="input_type"
              value="CSV"
              onChange={handleChangeInputType}/>
            <label htmlFor="CSV">CSV</label>
          </div>
        </div>
        <div className="column-container">
          <label>Table({inputType === 'JSON' ? 'array of JSON' : 'CSV'}):  </label>
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