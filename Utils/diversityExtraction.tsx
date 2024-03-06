const fillAgeDict=(ageArray:string[]): { [key: string]: number }=>{
    const ageDict: { [key: string]: number } = {
        "18-20": 0,
        "21-25": 0,
        "26-30": 0,
        "31-40": 0,
        "41-45": 0,
        "46-50": 0,
        "50+": 0
    };
    ageArray.forEach(age => {
        const ageNum = parseInt(age);
        if (!isNaN(ageNum)) {
            switch (true) {
                case ageNum >= 18 && ageNum <= 20:
                    ageDict["18-20"]++;
                    break;
                case ageNum >= 21 && ageNum <= 25:
                    ageDict["21-25"]++;
                    break;
                case ageNum >= 26 && ageNum <= 30:
                    ageDict["26-30"]++;
                    break;
                case ageNum >= 31 && ageNum <= 40:
                    ageDict["31-40"]++;
                    break;
                case ageNum >= 41 && ageNum <= 45:
                    ageDict["41-45"]++;
                    break;
                case ageNum >= 46 && ageNum <= 50:
                    ageDict["46-50"]++;
                    break;
                case ageNum >= 50 && ageNum <= 99:
                    ageDict["50+"]++;
                    break;
                default:
                    break;
            }
        }
    });
    return ageDict;
}
export const fillIncomeDict=(incomeArray:string[]): { [key: string]: number }=>{
    const incomeDict: { [key: string]: number } = {
        "0 - 10k":0,
        "11 - 15k":0,
        "16 - 20k":0,
        "21 - 25k":0,
        "25 - 30k":0,
        "30k +":0,
    };

    incomeArray.forEach(age => {
        const incomeNum = parseInt(age);
        if (!isNaN(incomeNum)) {
            switch (true) {
                case incomeNum >= 0 && incomeNum <= 10998:
                    incomeDict["0 - 10k"]++;
                    break;
                case incomeNum >= 10999 && incomeNum <= 15998:
                    incomeDict["11 - 15k"]++;
                    break;
                case incomeNum >= 15999 && incomeNum <= 20998:
                    incomeDict["16 - 20k"]++;
                    break;
                case incomeNum  >= 20999 && incomeNum <= 25998:
                    incomeDict["21 - 25k"]++;
                    break;
                case incomeNum  >= 25999 && incomeNum <= 30998:
                    incomeDict["25 - 30k"]++;
                    break;
                case incomeNum >= 30999 && incomeNum <= 1000000:
                    incomeDict["30k +"]++;
                    break;
                
                default:
                    break;
            }
        }
    });
    return incomeDict;
}

export const fillDict =(inputArray:string[])=>{
    const dict: {[key:string]:number}={};
       inputArray.forEach(item =>{
        if (dict.hasOwnProperty(item.charAt(0).toUpperCase() + item.slice(1))){
            dict[item.charAt(0).toUpperCase() + item.slice(1)]++;
        }else{
            dict[item.charAt(0).toUpperCase() + item.slice(1)] = 1;
        }
       }) 
       return dict;
}

export default fillAgeDict;