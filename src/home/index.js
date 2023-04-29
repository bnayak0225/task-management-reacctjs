import {Button, ButtonGroup, Container, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const location = useNavigate()
    return(
        <Container sx={{textAlign: "center"}}>
            <Typography variant={"h2"}>Welcome Please select task portal</Typography>
            <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{marginTop: "20px", left: "auto", right: "auto"}}>
                <Button onClick={()=>location("/cubyts")}>Cubyts</Button>
                <Button onClick={()=>location("/jira")}>Jira</Button>
                <Button onClick={()=>location("/asana")}>Asana</Button>
            </ButtonGroup>
        </Container>
    )
}
export default Home