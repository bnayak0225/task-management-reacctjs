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
import {useParams} from "react-router-dom";
import CardTask from "../Component/cardTask";
import fetchApi from "../services/fetchApi";

const TaskDetail = ({mode, id}) => {
    const params = useParams()
    const [detail, setDetail] = useState(null)
    const [create, setCreate] = useState(false)

    let header = {
        jira: [
            {title: "Summary", key: (key)=>key.fields.summary, xs: 12},
            {title: "Description", key: (key)=>key.fields.description?.content[0]?.content[0]?.text, xs: 12},
            {title: "Status",
                key: (key)=> {
                    return [
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
                    ].filter(data=>data.id === key.fields.status.id)[0].name
                },
                xs: 12, },
            {title: "Creator", key: (key)=>key.fields.creator.displayName, xs: 12},
        ],
        asana: [
            {title: "Name", key: (key)=>key.name, xs: 12},
            {title: "Notes", key: (key)=>key.notes, xs: 12},
            {title: "Status",
                key: (key)=> {
                    return [
                        {
                            id: true,
                            name: "Completed",
                        },
                        {
                            "id": false,
                            "name": "Not completed",
                        },

                    ].filter(data=>data.id === key.completed)[0].name
                },
                xs: 12, },
            {title: "Assignee", key: (key)=>key.assignee.name, xs: 12},
        ],
        cubyts: [
            {title: "Name", key: (key)=>key.name, xs: 12},
            {title: "Note", key: (key)=>key.description, xs: 12},
            {title: "Status",
                key: (key)=> {
                    return [
                        {
                            id: true,
                            name: "Completed",
                        },
                        {
                            "id": false,
                            "name": "Not completed",
                        },

                    ].filter(data=>data.id === key.status)[0].name
                },
                xs: 12, },
            {title: "Assignee", key: (key)=>key.user, xs: 12},
        ]
    }


    useEffect(()=> {
        fetchApi({
            url: `http://127.0.0.1:5000/api/task/${mode}?id=${params.id}`,
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }).then((res)=>{
            setDetail(res.data)
        })
    }, [params])

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

            {detail && <CardTask header={header[mode]} data={detail}/>}

        </Container>
    )
}
export default TaskDetail