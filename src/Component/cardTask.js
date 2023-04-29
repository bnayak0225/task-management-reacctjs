import {Button, Card, CardContent, Grid} from "@mui/material";
import CustomDropDown from "./dropDown";

const CardTask = ({header, data}) => {
    return (
        <Card sx={{marginBottom: "10px"}}>
            <CardContent>
                <Grid container spacing={2}>
                    {header.map((head, key)=> {
                        if(head.inputType === "dropdown"){
                            return <Grid item xs={head.xs}>
                                <Grid key={key} alignItems="center" container>
                                    <Grid item>{head.title}:</Grid>
                                    <Grid item>
                                        <CustomDropDown head={head} data={data}/>
                                    </Grid>

                                </Grid>
                            </Grid>
                        }
                        else if(head.inputType === "button") {
                            return (
                                <Grid item xs={head.xs}>
                                    <Button variant={"contained"} onChange={head.onChange} onClick={()=>head.onClick(data)}>{head.title}</Button>
                                </Grid>
                            )
                        }
                        return <Grid item xs={head.xs}>{head.title}: {head.key(data)} </Grid>
                    })}
                </Grid>

            </CardContent>
        </Card>
    )
}
export default CardTask