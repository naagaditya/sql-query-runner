import Table from '../table/Table';
import './TableWrapper.css';

type Props = {
  tableData: Record<string, any>[];
  tableName: string;
  handleDeleteTable: (tableName: string) => void;
};

export default function TableWrapper(props: Props) {
  const {tableData, tableName, handleDeleteTable} = props;
  return (
    <div className="table-wrapper">
      <div className="table-name">
        <b>{tableName}</b>
        <button onClick={() => {handleDeleteTable(tableName)}}>Remove</button>
      </div>
      <Table tableData={tableData}/>
    </div>
  );
}