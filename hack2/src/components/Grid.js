export default function Grid ({row_key,column_key,value}) {
    
    let grid_id = `grid-${row_key}-${column_key}`;
    let value_id = `value-${row_key}-${column_key}`;
    let temp_class_name = 'grid';

    // #########################
    // # 1 #2 Modify everything here (including the above one) yourself
    let class_level = ` level-${value}`
    if (value==0){
        value='';
        class_level='';
    }
    temp_class_name += class_level;
    const mapping = {'':"", 2:"NCTU", 4:"NYMU", 8:"NTU", 16:"UCSD", 32:"UBC", 64:"CUHK", 128:"UCLA", 256:"NYU",512:"UCB",1024:"HKUST", 2048:"UTokyo", 4096:"Columbia", 8192:"Yale", 16384:"Cambridge", 32768:"Stanford", 65536:"MIT"}
    // #########################

    return (
        <td>
            <div className={temp_class_name} id={grid_id}>
                <div className="school-name" id={value_id}>{value}</div>
            </div>
        </td>
    );
}