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
        if(mode==="jira") {
            let index = list.findIndex(a => a.id === id)
            newList[index].fields.status.id = status
            setList(newList)
            let reqBody = {
                statusId: status,
                taskId: id
            }
            fetch(`http://127.0.0.1:5000/api/update_jira_ticket`, {
                method: "PUT", body: JSON.stringify(reqBody),
                headers: {
                    "Content-Type": "application/json"
                },
            }).then((res)=>res.json()).then((res)=>{
                console.log("changed")
            })
        }
        else if(mode==="asana") {
            let index = list.findIndex(a => a.gid === id)
            newList[index].completed = status
            setList(newList)
            let reqBody = {
                status: status,
                gid: id
            }
            fetch(`http://127.0.0.1:5000/api/update_asana_task`,
                {method: "PUT", body: JSON.stringify(reqBody),
                    headers: {
                        "Content-Type": "application/json"
                    },
                }
            ).then((res)=>res.json()).then((res)=>{
                console.log("changed")
            })
        }
        else if(mode==="cubyts") {
            let index = list.findIndex(a => a._id === id)
            newList[index].status = status
            setList(newList)
            let reqBody = {
                status: status,
                id: id
            }
            fetch(`http://127.0.0.1:5000/api/update_cubyts_task`,
                {
                    method: "PUT", body: JSON.stringify(reqBody),
                    headers: {
                        "Content-Type": "application/json"
                    },
                }).then((res)=>res.json()).then((res)=>{
                console.log("changed")
            })
        }

    }

    const deleteTask = (id) => {
        console.log(list, id);
        let newList = [...list]
        if(mode==="jira"){
            let index = list.findIndex(a=>a.id === id)
            newList.splice(index, 1)
            setList(newList)
            fetch(`http://127.0.0.1:5000/api/delete_jira_ticket?taskId=${id}`, {method: "DELETE"}).then((res)=>res.json()).then((res)=>{
                console.log("deleted")
            })

        }
        else if(mode === "asana"){
            let index = list.findIndex(a=>a.gid === id)
            newList.splice(index, 1)
            console.log(index);
            setList(newList)
            fetch(`http://127.0.0.1:5000/api/delete_asana_task?gid=${id}`, {method: "DELETE"}).then((res)=>res.json()).then((res)=>{
                console.log("deleted")

            })

        }
        else if(mode === "cubyts"){
            let index = list.findIndex(a=>a._id === id)
            newList.splice(index, 1)
            setList(newList)
            fetch(`http://127.0.0.1:5000/api/delete_cubyts_task?id=${id}`, {method: "DELETE"}).then((res)=>res.json()).then((res)=>{
                console.log("deleted")
            })

        }
    }

    useEffect(()=> {
        if(mode==="jira"){
            fetch("http://127.0.0.1:5000/api/get_all_jira_ticket").then((res)=>res.json()).then((res)=>{
                setList(res.data)
            })

        }
        else if(mode === "asana"){
            fetch("http://127.0.0.1:5000/api/get_all_asana_task").then((res)=>res.json()).then((res)=>{
                setList(res.data)
            })

        }
        else if(mode === "cubyts"){
            fetch("http://127.0.0.1:5000/api/get_all_cubyts_task").then((res)=>res.json()).then((res)=>{
                setList(res.data)
            })

        }

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