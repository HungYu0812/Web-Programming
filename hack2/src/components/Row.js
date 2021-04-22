import Grid from '../components/Grid'
export default function Row ({ key, row_array}) {
    return (
        <tr>
          {row_array.map((value,column_idx)=>(<Grid row_key={key} column_key={column_idx} value={value} />))}
        </tr>
    );
};

//{row_vector.map((value)=>(<Grid value={value} />))}