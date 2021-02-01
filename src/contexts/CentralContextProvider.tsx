import React, { createContext, useEffect, useState } from "react";
import Papa from 'papaparse'

export interface SingleUnit {
  Date: string,
  Interval: string,
  Coverage: string,
  AHT: string,
  NCO: string,
  aba: string,
  asa: string,
  calc_staff: string,
  demand: string,
  demand_actual: string
}
interface UserContextInterface {
  data: SingleUnit[];
  dataLoadingError: boolean;
  currentDate: string;
  changeCurrentDate: (newDate: string) => void;
  allDates: string[];
  // UserDataRefetchingInContext: () => void;
}
export const CentralContext = createContext<UserContextInterface>({
  data: [],
  dataLoadingError: false,
  currentDate: "",
  changeCurrentDate: () => { },
  allDates: []
  // UserDataRefetchingInContext: () => { }
});

const { Provider } = CentralContext;

const CentralContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SingleUnit[]>([]);
  const [dataLoadingError, setDataLoadingError] = useState(false);
  const [currentDate, setCurrentDate] = useState("")
  const [allDates, setAllDates] = useState<string[]>([])

  const removingDuplicateDates = (dataArray: any) => {
    return dataArray.reduce((acc: any, current: any) => {
      if (acc.length) {
        if (acc[acc.length - 1].Date === current.Date) {
          return acc
        }
        if (acc[acc.length - 1].Date !== current.Date) {
          return [...acc, current]
        }
      }
      else {
        return [...acc, current]
      }
    }, [])
  }

  useEffect(() => {
    Papa.parse('TEMAnalysis-Sheet2.csv', {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: (results: any) => {
        // console.log("Finished:", results.data, results.errors);
        if (results.errors.length > 0) { 
          setDataLoadingError(true)
          return 
        }
        setData(results?.data)
        const arr = removingDuplicateDates(results?.data).map((e: SingleUnit) => e.Date)
        setAllDates(arr)
        setCurrentDate(arr[0])
        if (results.errors.length > 0) { setDataLoadingError(true) }
      }
    })
  }, [])

  const changeCurrentDate = (newDate: string) => {
    setCurrentDate(newDate)
  }
  console.log('data', data, 'alldates', allDates)
  return (
    <Provider value={{
      data,
      dataLoadingError,
      currentDate,
      changeCurrentDate,
      allDates
    }}>
      {children}
    </Provider>
  );
};

export default CentralContextProvider;