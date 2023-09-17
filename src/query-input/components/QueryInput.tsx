import { useState } from 'react';
import './QueryInput.css';
import { evaluateWhereCondition } from 'query-input/utils/evaluateWhereCondition';

type Props = {
  allTables: Record<string, Record<string, any>[]>;
  setFilteredTable: (filteredTable: Record<string, any>[]) => void;
};
export default function QueryInput(props: Props) {
  const { allTables, setFilteredTable } = props;
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleChangeQuery = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedQuery = e.target.value;
    setErrorMessage('');
    setQuery(updatedQuery);
  }
  const handleExecuteQuery = () => {
    let columns: string = '';
    let tableName: string = '';
    let where: string = '';
    if (query.includes('WHERE')) {
      [, columns, tableName, where] = query.match(/SELECT (.*) FROM (.*) WHERE (.*);/) || [];
    } else {
      [, columns, tableName] = query.match(/SELECT (.*) FROM (.*);/) || [];
    }
    let res;
    if (!tableName || !allTables[tableName]) {
      setErrorMessage('Table not found')
    }
    if (columns && tableName) {
      if(where) {
        res = allTables[tableName].filter(
          row => evaluateWhereCondition(row, where));
      } else {
        res = allTables[tableName];
      }
      if (columns.trim() !== '*') {
        res = res?.map(row => 
          columns.split(',').reduce((acc, col) => 
          ({...acc, [`${col.trim()}`]: row[col.trim()] }), {}));
      }
      setFilteredTable(res || []);
    } else {
      setErrorMessage('Wrong query'); 
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      handleExecuteQuery();
    }
  }
  return (
    <div className="query-input">
      <textarea
        value={query}
        onChange={handleChangeQuery}
        onKeyDown={handleKeyPress}
      />
      <div className="run">
        <span className='error'>{errorMessage}</span>
        <button onClick={handleExecuteQuery}>Run</button>
      </div>
    </div>
  );
}