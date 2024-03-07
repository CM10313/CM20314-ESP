import { Grid} from "@mui/material";
import HistoryCards from "../Components/historyCards";
import SearchableList from "../Components/SearchableList";
import HiddenStudiesCards from "../Components/hiddenStudies";
import DisputeContactCard from "../Components/disputeContact";
import Navbar from "../Components/navbar";
import { useAuth } from "../Context/AuthContext";
import  getResearcherStudies  from "../firebase/firestore";
import { useEffect, useState } from "react";
import StudyCreator from "./studyCreator";


export default function ResearherHistoryScreen() {
    const {isLoggedIn,setAuth,username,overallRating,id} = useAuth();

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
        // Fetch studies associated with the researcher
        getResearcherStudies(researcherDepartment, researcherId).then((fetchedStudies) => {
                setStudies(fetchedStudies); 
                setHiddenStudies(fetchedStudies.filter(study => study.Status == "Waiting"));
            
            })
        .catch(error => { console.error("Error fetching studies:", error); });
    }, []);

    const historyCardList = studies.map((study,index) => (
        <HistoryCards 
            key={index} 
            studyId={study.ResearcherID} 
            author={study.Name} 
            date={study.AppliedDate} />
    ))

    const hiddenStudiesList = hiddenStudies.map((hiddenStudy,index) => (
        <HiddenStudiesCards  
            key={index} 
            studyId={hiddenStudy.ResearcherID} 
            author={hiddenStudy.Name} date={hiddenStudy.AppliedDate} />
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