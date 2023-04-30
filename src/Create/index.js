import {Box, Button, FormLabel, Grid, OutlinedInput, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import fetchApi from "../services/fetchApi";

const CreateTask = ({mode}) => {
    const navigate = useNavigate()

    const [inputObject, setInputObject] = useState(false)

    let createInput = {
        jira: [
            {
                type: "input",
                value: "",
                label: "Summary",
                name: "summary"
            },
            {
                type: "input",
                value: "",
                label: "Description",
                name: "description"
            }
        ],
        asana: [
            {
                type: "input",
                value: "",
                label: "Name",
                name: "name"
            },
            {
                type: "input",
                value: "",
                label: "Notes",
                name: "notes"
            }
        ],
        cubyts: [
            {
                type: "input",
                value: "",
                label: "Name",
                name: "name"
            },
            {
                type: "input",
                value: "",
                label: "Description",
                name: "description"
            }
        ],
    }

    useEffect(()=> {
        if(mode==="jira"){
            let inputObject = {}
            for(let i of createInput[mode]){
                inputObject[i.name]= i.value
            }
            setInputObject(inputObject)
        }

    }, [])
    const createTask = () => {
        fetchApi({
            url: `http://127.0.0.1:5000/api/create-task/${mode}`,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: inputObject
        }).then((res)=>{
            console.log("created");
            navigate(`/${mode}/${res.data.id}`)
        })

    }
    return (
        <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#fff',
            // border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        }}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom: "10px"}}>
                Create Ticket
            </Typography>
            <Grid container spacing={2}>
                {createInput[mode].map((input)=>{
                    return(
                        <Grid item xs={12}>
                            <FormLabel>{input.label}</FormLabel>
                            <br/>
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                fullWidth={true}
                                size={"medium"}
                                aria-describedby="outlined-weight-helper-text"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                                name={input.name}
                                value={inputObject[input.name]}
                                onChange={(e)=>setInputObject({
                                    ...inputObject,
                                    [input.name]: e.target.value
                                })}
                            />
                        </Grid>
                    )
                })}
                <Grid item xs={12}>
                    <Button variant={"contained"} onClick={createTask}>Create</Button>
                </Grid>
            </Grid>

        </Box>
    )
}
export default CreateTask