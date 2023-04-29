import {FormControl, MenuItem, Select} from "@mui/material";

const CustomDropDown = ({head, data}) => {
  return<FormControl sx={{ m: 1}}>
      {/*<InputLabel id="dropdown">Name</InputLabel>*/}
      <Select
          // labelId="dropdown"
          // id="dropdown"
          size={"small"}
          value={head.value(data)}
          variant={"standard"}
          label="Status"
          onChange={(e)=>head.onChange(e, data)}
      >
          {head.values.map((value, key)=> {
              return(<MenuItem key={key} value={value.id}>{value.name}</MenuItem>)
          })}
      </Select>
  </FormControl>
}
export default CustomDropDown