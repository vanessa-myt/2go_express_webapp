import moment from "moment";

/***************************
 * Common Utilities
 ***************************/

 export const getTodayDate = () => {
    return new Date();
  };

  export const formatDate = (date) => {
    //if date is null or empty string return nothin
    if (!date || date == "") {
      return "";
    }
  
    var formatDate = new Date(date);
    var stringDate = formatDate.toDateString().split(" ");
  
    return (
      stringDate[1] +
      " " +
      stringDate[2] +
      ", " +
      stringDate[3] +
      " " +
      formatDate.toLocaleTimeString().replace(/(.*)\D\d+/, "$1")
    );
  };
  
  export const formatDateNoTime = (date) => {
    //if date is null or empty string return nothin
    if (!date || date == "") {
      return "";
    } 

    var formatDate = new Date(date);
    var stringDate = formatDate.toDateString().split(" ");
  
    return stringDate[1] + " " + stringDate[2] + ", " + stringDate[3];
;}