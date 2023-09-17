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

  const handleChangeImportString = 
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTableToImport(e.target.value)
  }
  const handleChangeImportTableName = 
    (e: React.ChangeEvent<HTMLInputElement>) => {
    setTableNameToImport(e.target.value)
  }
  const handleImport = () => {
    try {
      const parsedTable = JSON.parse(tableToImport)
      if (!Array.isArray(parsedTable)) {
        throw new Error('Not a valid table');
      }
      props.handleImport(tableNameToImport, parsedTable);

    }
    catch(error) {
      console.error(error)
    }
  }
  return (
    <div className="modal-overlay">
      <div className="modal">
        <input
          type="text"
          onChange={handleChangeImportTableName}
          value={tableNameToImport} />
        <textarea value={tableToImport} onChange={handleChangeImportString}/>
        <button onClick={handleImport}>Import</button>
        <button onClick={() => {props.hideModal()}}>Close</button>
      </div>
    </div>
  );
}