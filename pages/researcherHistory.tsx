import { Grid} from "@mui/material";
import HistoryCards from "../Components/historyCards";
import SearchableList from "../Components/SearchableList";
import HiddenStudiesCards from "../Components/hiddenStudies";
import DisputeContactCard from "../Components/disputeContact";
import Navbar from "../Components/navbar";
import { useAuth } from "../Context/AuthContext";
import { fetchAllStudiesByDepartment } from "../firebase/firestore";
import { useEffect, useState } from "react";


export default function ResearherHistoryScreen() {
    const {isLoggedIn,setAuth,username,overallRating,id} = useAuth();

    const [studies, setStudies] = useState([]); // State to store fetched studies
    const [hiddenStudies, setHiddenStudies] = useState([]);

    const researcherId = "9XCri3v9uFTN5RgDQVszan3iKp23" // id
    const researcherDepartment = "Computer Science"

    useEffect(() => {
        // Fetch studies associated with the researcher
        fetchAllStudiesByDepartment(researcherDepartment).then((fetchedStudies) => {
                
            setStudies(
                fetchedStudies.filter(study => study.studyData.publisherId === researcherId && 
                    study.studyData.studyObj.EthicsApprovalObject.status != "Waiting")   
            ); 
            
            setHiddenStudies(
                fetchedStudies.filter(study => study.studyData.studyObj.EthicsApprovalObject.status == "Waiting")
            );
            })
        .catch(error => { console.error("Error fetching studies:", error); });
    }, []);

    const historyCardList = studies.map((study,index) => (
        <HistoryCards 
            key={index} 
            studyId={study.studyId}
            title={study.studyData.title} 
            date={study.studyData.dateOfPublish}
            department={researcherDepartment} 
            />
    ))

    const hiddenStudiesList = hiddenStudies.map((hiddenStudy,index) => (
        <HiddenStudiesCards  
            key={index} 
            studyId={hiddenStudy.studyId} 
            title={hiddenStudy.studyData.title} 
            date={hiddenStudy.studyData.dateOfPublish} />
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