import { Grid} from "@mui/material";
import HistoryCards, { HistoryCardProps } from "../Components/historyCards";
import SearchableList from "../Components/SearchableList";
import HiddenStudiesCards from "../Components/hiddenStudies";
import DisputeContactCard from "../Components/disputeContact";
import Navbar from "../Components/navbar";
import { useAuth } from "../Context/AuthContext";
import { fetchAllStudiesByDepartment } from "../firebase/firestore";
import { useEffect, useState } from "react";


const ResearcherHistoryScreen: React.FC<{ testBypass1?: HistoryCardProps[], testBypass2?:HistoryCardProps[]}> = ({ testBypass1 = [], testBypass2 = []}) => {
    const {isLoggedIn,setAuth,username,overallRating,id,accountType} = useAuth();

    const [studies, setStudies] = useState<HistoryCardProps[]>(testBypass1); // State to store fetched studies
    const [hiddenStudies, setHiddenStudies] =useState<HistoryCardProps[]>(testBypass2);

    const researcherId = "9XCri3v9uFTN5RgDQVszan3iKp23" // id
    const researcherDepartment = "Computer Science"

    useEffect(() => {
        const getHistoryInfo = async () => {
            try {
                const allDepartmentStudies: any = await fetchAllStudiesByDepartment(researcherDepartment);
                if (allDepartmentStudies) {
                    const tempLive: HistoryCardProps[] = [];
                    const tempHidden: HistoryCardProps[] = [];
                    const extractedLive: HistoryCardProps[] = [];
                    const extractedHidden: HistoryCardProps[] = [];
                    
                    allDepartmentStudies.forEach((study: any) => {
                        if (study.studyData.publisherId === id) {
                            if (study.studyData.studyObj.EthicsApprovalObject.status !== "Waiting") {
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
                            } else {
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
                            }
                        }
                    });
                    setStudies(extractedLive);
                    setHiddenStudies(extractedHidden);
                }
            } catch (error) {
                console.error("Error fetching history info:", error);
            }
        };
    
        getHistoryInfo();
    }, []);
    

    const historyCardList = studies.map((study,index) => (
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

    const hiddenStudiesList = hiddenStudies.map((study,index) => (
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
export default ResearcherHistoryScreen