import './Table.css';

type Props = {
  tableData: Record<string, any>[];
}

export default function Table({tableData}: Props) {
  if (!tableData.length) return null;
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(tableData[0]).map((data, i) => (
            <HeaderCell key={`${data}${i}`} text={data}/>))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, i) => <TableRow key={i} row={row} index={i}/>)}
      </tbody>
    </table>
  )
};

const TableRow = ({row, index}: {row: any; index: number}) => (<tr>
  {Object.values(row).map((data: any, i: number) => (
    <TableCell key={`${index}${i}`} data={data}/>
  ))}
</tr>);
const HeaderCell = ({text}: {text: string}) => <th>{text}</th>;
const TableCell = ({data}: {data: any}) => 
  (<td>
    {typeof data === 'object' ? JSON.stringify(data) : data.toString()}
  </td>);
