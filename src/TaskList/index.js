import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    FormControl, FormLabel,
    Grid,
    MenuItem, Modal, OutlinedInput,
    Select,
    Typography
} from "@mui/material";
import {useEffect, useState, useTransition} from "react";
import CustomDropDown from "../Component/dropDown";
import CreateTask from "../Create";
import CardTask from "../Component/cardTask";
import {useNavigate} from "react-router-dom";
import fetchApi from "../services/fetchApi";

const TaskList = ({mode}) => {
    const navigate = useNavigate()
    const [list, setList] = useState([])
    const [create, setCreate] = useState(false)
    let header = {
        jira: [
            {title: "Task Name", key: (key)=>key.fields.summary, xs: 12},
            {title: "status", type: "input", inputType: "dropdown",
                xs: 12,
                onChange: (e, key)=>updateStatus(e.target.value, key.id),
                value: (key)=>key.fields.status.id,
                values:[
                    {
                        id: "10000",
                        name: "To Do",
                    },
                    {
                        "id": "10001",
                        "name": "In Progress",
                    },
                    {
                        "id": "10002",
                        "name": "Done",
                    }
                ]

            },
            {title: "Delete", inputType: "button", xs: "auto", onClick: (key)=>deleteTask(key.id)},
            {title: "View", inputType: "button", xs: "auto", onClick: (key)=>navigate(`/jira/${key.id}`)}

        ],
        asana: [
            {title: "Task Name", key: (key)=>key.name, xs: 12},
            {title: "status", type: "input", inputType: "dropdown",
                onChange: (e, key)=>updateStatus(e.target.value, key.gid),
                xs: 12,
                value: (key)=>key.completed,
                values:[
                    {
                        id: true,
                        name: "Completed",
                    },
                    {
                        "id": false,
                        "name": "Not completed",
                    },
                ]
            },
            {title: "Delete", inputType: "button", xs: "auto", onClick: (key)=>deleteTask(key.gid)},
            {title: "View", inputType: "button", xs: "auto", onClick: (key)=>navigate(`/asana/${key.gid}`)}

        ],
        cubyts: [
            {title: "Task Name", key: (key)=>key.name, xs: 12},
            {title: "status", type: "input", inputType: "dropdown",
                xs: 12,
                value: (key)=>key.status,
                onChange: (e, key)=>updateStatus(e.target.value, key._id),
                values:[
                    {
                        id: true,
                        name: "Completed",
                    },
                    {
                        "id": false,
                        "name": "Not completed",
                    },
                ]
            },
            {title: "Delete", inputType: "button", xs: "auto", onClick: (key)=>deleteTask(key._id)},
            {title: "View", inputType: "button", xs: "auto", onClick: (key)=>navigate(`/cubyts/${key._id}`)}

        ],
    }

    const updateStatus = (status, id) => {
        let newList = [...list]
        let reqBody = {
            status: status,
            id: id
        }
        if(mode==="jira") {
            let index = list.findIndex(a => a.id === id)
            newList[index].fields.status.id = status
        }
        else if(mode==="asana") {
            let index = list.findIndex(a => a.gid === id)
            newList[index].completed = status

        }
        else if(mode==="cubyts") {
            let index = list.findIndex(a => a._id === id)
            newList[index].status = status
        }
        setList(newList)

        fetchApi({
            url: `http://127.0.0.1:5000/api/update-task/${mode}`,
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: reqBody
        }).then((res)=>{
            console.log("changed")
        }).catch(err => {
            console.log(err);
        });
    }

    const deleteTask = (id) => {
        console.log(list, id);
        let newList = [...list]
        if(mode==="jira"){
            let index = list.findIndex(a=>a.id === id)
            newList.splice(index, 1)


        }
        else if(mode === "asana"){
            let index = list.findIndex(a=>a.gid === id)
            newList.splice(index, 1)


        }
        else if(mode === "cubyts"){
            let index = list.findIndex(a=>a._id === id)
            newList.splice(index, 1)
        }
        setList(newList)
        fetchApi({
            url: `http://127.0.0.1:5000/api/delete-task/${mode}?id=${id}`,
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res)=>{
            console.log("changed")
        })
    }

    useEffect(()=> {
        fetchApi({
            url: `http://127.0.0.1:5000/api/task/${mode}`,
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res)=>{
            setList(res.data)
        })

    }, [])

  return (
      <Container sx={{paddingTop: "30px"}}>
          <Box component={"h2"}>{mode.toUpperCase()} TASK</Box>
        <Button variant={"contained"} color={"primary"} sx={{marginBottom: "20px"}} onClick={()=>setCreate(true)}>Create Task</Button>
          <Modal
              open={create}

              onClose={()=>setCreate(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >
              <CreateTask mode={mode}/>
          </Modal>
          <Grid container spacing={2}>
          { list.map((data, key)=> {
              return <Grid item key={key} xs={6}>
                      <CardTask header={header[mode]} data={data}/>
                  </Grid>

          })}
          </Grid>
      </Container>
  )
}
export default TaskList