import moment from "moment"

/***************************
 * Common Utilities
 ***************************/

export const refreshPage = () => {
  window.location.reload()
}

export const getTodayDate = () => {
  return new Date()
}

export const formatPrice = (p) => {
  var result = parseFloat(p)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,")
  // console.log(`passed = ${p} | res = ${result} --- typeof_passed = ${typeof(p)} typeof_result = ${typeof(result)}`);
  return result
}


export const formatDateWithTime = (date) => {
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

export const formatDate = (date) => {
  //if date is null or empty string return nothin
  if (!date || date == "") {
    return ""
  }

  var formatDate = new Date(date)
  var stringDate = formatDate.toDateString().split(" ")

  return (
    stringDate[1] +
    " " +
    stringDate[2] +
    ", " +
    stringDate[3] +
    " " +
    formatDate.toLocaleTimeString().replace(/(.*)\D\d+/, "$1")
  )
}

export const formatDateNoTime = (date) => {
  //if date is null or empty string return nothin
  if (!date || date == "") {
    return ""
  }

  var formatDate = new Date(date)
  var stringDate = formatDate.toDateString().split(" ")

  return stringDate[1] + " " + stringDate[2] + ", " + stringDate[3]
}

export const formatYMD = (date) => {
  var format = "yyyy:mm:dd"
  return moment(date).format("YYYY-MM-DD")
}
