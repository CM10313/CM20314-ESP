import { Grid} from "@mui/material";
import HistoryCards from "../Components/historyCards";
import SearchableList from "../Components/SearchableList";
import HiddenStudiesCards from "../Components/hiddenStudies";
import DisputeContactCard from "../Components/disputeContact";
import Navbar from "../Components/navbar";
import { useAuth } from "../Context/AuthContext";
import { fetchDocuments }  from "../firebase/firestore";
import { useEffect, useState } from "react";
import StudyCreator from "./studyCreator";
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';


export default function ResearherHistoryScreen() {
    //const {isLoggedIn,setAuth,username,overallRating,department,id} = useAuth();
    const [department, setDepartment] = useState('');
    const [username, setUsername] = useState('');
    const [overallRating, setOverallRating] = useState();
    const [id, setId] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const hiddenIdList = [
        "123456",
        "7890123",
        "23433423",
        "34324423", 
        "432423423"
    ]

    const [studies, setStudies] = useState([]); // State to store fetched studies
    const [hiddenStudies, setHiddenStudies] = useState([]);

    const researcherId = "swQ90URzscZLubKOh6t8hSAXr1V2" // id
    const researcherDepartment = "Computer Science"

    useEffect(() => {
        const storedAuth = localStorage.getItem('auth');
        if (storedAuth) {
            const authObj = JSON.parse(storedAuth);
            const {isLoggedIn, username, overallRating, department, account_type, id} = authObj;
            setUsername(username);
            setOverallRating(overallRating);
            setDepartment(department);
            setId(id);
            fetchStudies(department, id);
            setIsLoading(false);
      
        }   
    }, []);

    const fetchStudies = async (dept, id_) => {
        try{
          const studies_arr = await fetchDocuments(`departments/${dept}/Researchers/${id_}/studies`)///swQ90URzscZLubKOh6t8hSAXr1V2/studies
          console.log(studies_arr);
          setStudies(studies_arr);
          setHiddenStudies(studies_arr.filter(study => study.Status == "Waiting"));
        }catch (error){
          console.error(error)
        }
      }

    if (isLoading) {
        return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
        </Box>
        );
    }

    const historyCardList = studies.map((study,index) => (
        <HistoryCards 
            key={index} 
            studyId={study.id} 
            author={study.publisherName} 
            date={study.dateOfPublish} />
    ))

    const hiddenStudiesList = hiddenStudies.map((hiddenStudy,index) => (
        <HiddenStudiesCards  
            key={index} 
            studyId={hiddenStudy.id} 
            author={hiddenStudy.publisherName} date={hiddenStudy.dateOfPublish} />
    ))



    return (
        <Grid container>
            <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0}/>
            <Grid item sm={12} md={8}>
                <SearchableList 
                    rowSpacing={0}
                    cardInputList={historyCardList}
                    numberOfItemsPerRow={1}
                    width={"100%"}
                    title={"History"}
                    titleSize={45}
                    marginTop={5} searchBarEnabled={true} progressBarEnabled={false} >  
                </SearchableList>
            </Grid>

            <Grid item sm={12} md={4}>
                <SearchableList
                    rowSpacing={0}
                    cardInputList={hiddenStudiesList}
                    numberOfItemsPerRow={1}
                    width={"100%"}
                    title={"Hidden"}
                    titleSize={45}
                    marginTop={5} searchBarEnabled={true} progressBarEnabled={false}  >
                </SearchableList>
            </Grid>

            <Grid item 
                sm={12} md={12} 
                display = {"flex"}
                justifyContent={"center"}
                alignItems={"center"} > 
                <DisputeContactCard /> 
            </Grid>
        </Grid>
    );

}