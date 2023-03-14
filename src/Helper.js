const padTo2Digits = (num) =>{
    return num.toString().padStart(2, '0');
  }
  
export const formatDate = (date) => {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

export const dateDiff = (date2) => {
    var today = formatDate(new Date())
    today = new Date(today.split('/')[2],today.split('/')[1]-1,today.split('/')[0]);
    date2 = new Date(date2.split('/')[2],date2.split('/')[1]-1,date2.split('/')[0]);
    var timeDiff = Math.abs(date2.getTime() - today.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    return diffDays
}