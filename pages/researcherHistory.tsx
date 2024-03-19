import { Box, Grid, Typography} from "@mui/material";
import HistoryCards, { HistoryCardProps } from "../Components/historyCards";
import SearchableList from "../Components/SearchableList";
import HiddenStudiesCards from "../Components/hiddenStudies";
import DisputeContactCard from "../Components/disputeContact";
import Navbar from "../Components/navbar";
import { useAuth } from "../Context/AuthContext";
import { fetchAllEventsByDepartment } from "../firebase/firestore";
import { useEffect, useState } from "react";
import HistoryCardsStudy from "../Components/historyCardsStudy";


const ResearcherHistoryScreen: React.FC<{ testBypass1?: HistoryCardProps[], testBypass2?:HistoryCardProps[], testBypass3?:HistoryCardProps[]}> = ({ testBypass1 = [], testBypass2 = [],testBypass3 = []}) => {
    const {isLoggedIn,setAuth,username,overallRating,id,accountType} = useAuth();

    const [studies, setStudies] = useState<HistoryCardProps[]>(testBypass1); // State to store fetched studies
    const [hiddenStudies, setHiddenStudies] =useState<HistoryCardProps[]>(testBypass2);
    const [waitingStudies, setWaitingStudies] =useState<HistoryCardProps[]>(testBypass3);
    const [webinars, setWebinars] = useState<HistoryCardProps[]>(testBypass1); // State to store fetched studies
    const [hiddenWebinars, setHiddenWebinars] =useState<HistoryCardProps[]>(testBypass2);
    const [waitingWebinars, setWaitingWebinars] =useState<HistoryCardProps[]>(testBypass3);
    const researcherId = "9XCri3v9uFTN5RgDQVszan3iKp23" // id
    const researcherDepartment = "Computer Science"

    useEffect(() => {
        const getHistoryInfo = async () => {
            try {
                const allDepartmentStudies: any = await fetchAllEventsByDepartment(researcherDepartment,'studies');
                console.log(allDepartmentStudies)
                const allDepartmentWebinars: any = await fetchAllEventsByDepartment(researcherDepartment,'webinars');
                if (allDepartmentStudies) {
                    const extractedLive: HistoryCardProps[] = [];
                    const extractedHidden: HistoryCardProps[] = [];
                    const extractedWaiting: HistoryCardProps[] = [];
                    
                    allDepartmentStudies.forEach((study: any) => {
                        if (study.studyData.publisherId === id) {
                            if (study.studyData.studyObj.EthicsApprovalObject.status === "Accept") {
                                const liveStudy: HistoryCardProps = {
                                    author: study.studyData.publisherName,
                                    title: study.studyData.title,
                                    date:study.studyData.preliminaryDate,
                                    location:study.studyData.location,
                                    department: study.studyData.department,
                                    studyId: study.studyId,
                                    publisherId: study.userId,
                                };
                                extractedLive.push(liveStudy);
                            } else if (study.studyData.studyObj.EthicsApprovalObject.status === "Dispute") {
                                const hiddenStudy: HistoryCardProps = {
                                    author: study.studyData.publisherName,
                                    title: study.studyData.title,
                                    date:study.studyData.preliminaryDate,
                                    location:study.studyData.location,
                                    department: study.studyData.department,
                                    studyId: study.studyId,
                                    publisherId: study.userId,
                                };
                                extractedHidden.push(hiddenStudy);
                            } else if (study.studyData.studyObj.EthicsApprovalObject.status === "Waiting"|| study.studyData.studyObj.EthicsApprovalObject.status==="In review") {
                                const waitingStudy: HistoryCardProps = {
                                    author: study.studyData.publisherName,
                                    title: study.studyData.title,
                                    date:study.studyData.preliminaryDate,
                                    location:study.studyData.location,
                                    department: study.studyData.department,
                                    studyId: study.studyId,
                                    publisherId: study.userId,
                                };
                                extractedWaiting.push(waitingStudy);
                            }
                        }
                        
                    });
                    setStudies(extractedLive);
                    setHiddenStudies(extractedHidden);
                    setWaitingStudies(extractedWaiting);
                }
                if (allDepartmentWebinars) {
                    const extractedLive: HistoryCardProps[] = [];
                    const extractedHidden: HistoryCardProps[] = [];
                    const extractedWaiting: HistoryCardProps[] = [];
                    
                    allDepartmentWebinars.forEach((study: any) => {
                        if (study.studyData.publisherId === id) {
                            if (study.studyData.EthicsApprovalObject.status === "Accept") {
                                const liveStudy: HistoryCardProps = {
                                    author: study.studyData.publisherName,
                                    title: study.studyData.title,
                                    date:study.studyData.preliminaryDate,
                                    location:study.studyData.location,
                                    department: study.studyData.department,
                                    studyId: study.studyId,
                                    publisherId: study.userId,
                                };
                                extractedLive.push(liveStudy);
                            } else if (study.studyData.EthicsApprovalObject.status === "Dispute") {
                                const hiddenStudy: HistoryCardProps = {
                                    author: study.studyData.publisherName,
                                    title: study.studyData.title,
                                    date:study.studyData.preliminaryDate,
                                    location:study.studyData.location,
                                    department: study.studyData.department,
                                    studyId: study.studyId,
                                    publisherId: study.userId,
                                };
                                extractedHidden.push(hiddenStudy);
                            } else if (study.studyData.EthicsApprovalObject.status === "Waiting"||study.studyData.EthicsApprovalObject.status === "In review") {
                                const waitingStudy: HistoryCardProps = {
                                    author: study.studyData.publisherName,
                                    title: study.studyData.title,
                                    date:study.studyData.preliminaryDate,
                                    location:study.studyData.location,
                                    department: study.studyData.department,
                                    studyId: study.studyId,
                                    publisherId: study.userId,
                                };
                                extractedWaiting.push(waitingStudy);
                            }
                        }
                        
                    });
                    setWebinars(extractedLive);
                    setHiddenWebinars(extractedHidden);
                    setWaitingWebinars(extractedWaiting);
                }
            } catch (error) {
                console.error("Error fetching history info:", error);
            }
        };
    
        getHistoryInfo();
    }, []);
    
    
    const historyCardStudy = studies.map((study,index) => (
        <HistoryCards 
            key={index}
            studyId={study.studyId}
            title={study.title}
            date={study.date}
            department={study.department}
            author={study.author}
            location={study.location} 
            publisherId={study.publisherId}            />
            
    ))
    const historyCardWebinar = webinars.map((study,index) => (
        <Grid key={index}container display="flex" flexDirection="row" justifyContent="space-evenly">

        <Grid item xs={6}><HistoryCardsStudy 
            
            studyId={study.studyId} 
            author={study.author} 
            date={study.date} 
            title={study.title} 
            location={study.location} /></Grid>
        <Grid item xs={6}><Box><Typography>No further info is available for webinars/other events</Typography></Box></Grid>
      </Grid>
        
    ))
    const historyCardList = [...historyCardStudy,...historyCardWebinar];
    const hiddenStudiesList = [...hiddenStudies,...hiddenWebinars].map((study,index) => (
        <HiddenStudiesCards  
        key={index}
        studyId={study.studyId}
        title={study.title}
        date={study.date}
        department={study.department}
        author={study.author}
        location={study.location} 
        publisherId={study.publisherId}  />
    ))
    const waitingStudiesList = [...waitingStudies,...waitingWebinars].map((study,index) => (
        <HiddenStudiesCards  
        key={index}
        studyId={study.studyId}
        title={study.title}
        date={study.date}
        department={study.department}
        author={study.author}
        location={study.location} 
        publisherId={study.publisherId}  />
    ))


    return (
        <Grid container>
            <Navbar name={ username ?username : 'Guest'} rating={overallRating? overallRating: 0}  accountType={accountType?accountType:"Guest Type"}/>
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
                <Grid container>
                    <Grid item sm={12} >
                        <SearchableList
                            rowSpacing={0}
                            cardInputList={waitingStudiesList}
                            numberOfItemsPerRow={1}
                            width={"100%"}
                            title={"Awaiting Approval"}
                            titleSize={45}
                            marginTop={5} searchBarEnabled={true} progressBarEnabled={false}  >
                        </SearchableList>
                    </Grid>
                    <Grid item sm={12} >
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
                </Grid>
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
export default ResearcherHistoryScreen