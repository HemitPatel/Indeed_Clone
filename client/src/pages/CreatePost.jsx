import { useState } from "react";

import Header from "../components/Header";
import { Box, Typography, styled, TextField, Button } from "@mui/material";
import Dropdown from "../components/Dropdown";
import { savePost } from "../services/api";
import { useNavigate } from "react-router-dom";
import { routePath } from "../routes/route";


const Component = styled(Box)({
    padding: '80px 200px',
    background: '#F5F5F5'
})

const Container = styled(Box)({
    display: 'flex',
    background: "#FFFFFF",
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 70px',
    '& > p':{
        fontSize: 35,
        fontWeight: 700,
        opacity: '.7'
    }
})

const FormWrapper = styled(Box) ({
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    padding: 20,
    background: "#FFFFFF",
    borderRadius: 20,
    '& > *':{
        marginTop: '20px !important'
    }
})

const defaultObj= {
    profile:"",
    type:"",
    description:"",
    experience:"",
    technology:[],
    salary:"",
}

const options = {
    type:["Online","Offline"],
    experience:["0-2 Years","3-5 Years","5-8 Years","8 and more years"],
    technology:["Java","JavaScript","Angular","React","Node.js","Docker","AWS","HTML","CSS","C","C++","Python","C#","Ruby","R"],
    salary:["$ 0-30000", "$ 30000-60000", "$ 60000-90000","$ 90000-120000","$ 120000+ and more"]
}

const CreatePost = () => {

    const [data,setData] = useState(defaultObj);

    const navigate = useNavigate();

    const image = "data:image/jpeg;base64,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";

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value  });
    }

    const saveJob = async() => {
        await savePost(data);
        navigate (routePath.posts);
    }

    return(
    <>
        <Header />
            <Component>
                <Container>
                    <Typography>
                        Create a job post
                    </Typography>
                    <img src = {image} alt= "create" />
                </Container>
                <FormWrapper>
                    <TextField
                        placeholder="Job Title"
                        name="profile"
                        onChange={handleChange}                    
                    />
                    <Dropdown 
                        label="Job Type"
                        id="job-type-label"
                        value={data.type}
                        handleChange={handleChange}
                        name="type"
                        options={options.type}
                    />
                    <TextField
                        placeholder="Job Description" 
                        name="description"   
                        onChange={handleChange}                
                    />
                    <Dropdown 

                        label="Experience"
                        id="job-experience-label"
                        value={data.experience}
                        handleChange={handleChange}
                        options={options.experience}
                        name="experience"
                    />
                    <Dropdown 

                        label="Technology"
                        id="job-technology-label"
                        value={data.technology}
                        handleChange={handleChange}
                        options={options.technology}
                        name="technology"
                        multiple
                    />
                    <Dropdown 
                    
                        label="Salary"
                        id="job-salary-label"
                        value={data.salary}
                        handleChange={handleChange}
                        options={options.salary}
                        name="salary"
                    />
                    <Button onClick = {  () => saveJob()} variant="contained">Save Job</Button>
                </FormWrapper>
            </Component>
        
    </>
    )
}

export default CreatePost;