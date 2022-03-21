import { CSVReader } from "react-csv-reader"

const MyCSVReader = ()=>{

    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header =>
          header
            .toLowerCase()
            .replace(/\W/g, '_')
      }

      const onFileLoadHandler = (dataArray)=>{
          console.log(dataArray);
      }

    return(
        <CSVReader
        cssClass="csv-reader-input"
        label="Select CSV with secret Death Star statistics"
        onFileLoaded={onFileLoadHandler}
        
        parserOptions={papaparseOptions}
        inputId="ObiWan"
        inputName="ObiWan"
        />
    )
}

export default MyCSVReader ;