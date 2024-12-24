// eslint-disable-next-line
import { default as dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'
import BigNumber from 'bignumber.js'

dayjs.extend(utc)

export const formatDate = (date: number) =>
  dayjs(date).format('YYYY-MM-DD')

export const formatDateToMonth = (date: number) =>
  dayjs(date).format('MMM D YYYY')

export const formatDateSecond = (date: number) =>
  dayjs(date).format('YYYY.MM.DD HH:mm:ss')
// dayjs(date).utc().format('YYYY.MM.DD HH:mm:ss')

export const diffTime = (date: number) => Math.abs(dayjs().diff(date))

export const toDisplayAddress = (address: string | null | undefined) => {
  if (!address) return '~'
  return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`
}

/**
 * `0x345678901234567890` -> `0x34567....7890`
 * @param input
 * @param number
 * @returns
 */
export const ellipsisFormat = (input: string | number, number = 7) => {
  var arr = String(input).split('')
  arr.splice(number, arr.length - number - 4, '....')
  return arr.join('')
}

export const trim = (input: string) => {
  return input.trim()
}

export const toDisplay = (num: string | number | null, fixed: number = 2) => {
  if (Number(num) === 0) return 0
  if (!num || isNaN(Number(num))) return '~'
  num = num.toString()
  const index = num.indexOf('.')
  if (index !== -1) {
    num = num.substring(0, fixed + index + 1)
  } else {
    num = num.substring(0)
  }
  return Number(parseFloat(num).toFixed(fixed))
}

export const formatSecond = (result: number | null | undefined) => {
  if (!result || isNaN(result)) return '~'
  const days = result / 1000 / 60 / 60 / 24
  const daysRound = Math.floor(days)
  const hours = result / 1000 / 60 / 60 - 24 * daysRound
  const hoursRound = Math.floor(hours)
  const minutes = result / 1000 / 60 - 24 * 60 * daysRound - 60 * hoursRound
  const minutesRound = Math.floor(minutes)
  const seconds =
    result / 1000 -
    24 * 60 * 60 * daysRound -
    60 * 60 * hoursRound -
    60 * minutesRound
  const time =
    daysRound +
    ' d ' +
    hoursRound +
    ' h ' +
    minutesRound +
    ' m ' +
    seconds.toFixed(0) +
    ' s '
  return time
}

export const sleep = (time: number) =>
  new Promise((res, rej) => setTimeout(res, 1000 * time))

export const toUtc = (time: number, timeZone: number = 0) =>
  dayjs.utc(time).utcOffset(timeZone).format('YYYY-MM-DD HH:mm:ss')

export const getIsMobile = () =>
  /Mobi|Android|iPhone/i.test(navigator.userAgent)
// bignumber Dealing with current issues in science and technology law
export const bigNumberCalcToStr = (num: BigNumber, decimal = 18) => {
  return num.toFixed(decimal, 1)
}
export const toPercent = (point: number | string, decimal: number = 4, isRound:boolean = false) => {
  if (point === '--') {
    return point
  }
  // point = Number(Number(point) * 100).toString()
  // let index = point.indexOf('.')
  // if (index !== -1) {
  //   point = point.substring(0, decimal + index + 1)
  // } else {
  //   point = point.substring(0)
  // }
  // return `${parseFloat(point).toFixed(decimal)} %`
  // Multiplies a number by 100 with a specified number of decimal places
  const percent = isRound ? new BigNumber(point).multipliedBy(100).toFixed(decimal, 1).toString() : new BigNumber(point).multipliedBy(100).toFixed(decimal + 1, 1).toString().slice(0, -1);
  return percent + '%';

  // return `${str} %`;
  // var str = Number(Number(point) * 100).toFixed(2);
  // return `${str} %`;
}
export const handleCutZero = (num:string | number) => {
  //Make a copy and return a new string without zeros
  num = num.toString()
  let newstr = num;
  //Loop variable Fractional length
  // console.log(num.indexOf('.') - 1);
  let leng = num.length - num.indexOf('.') - 1;
  //Determine whether it is a valid number
  if (num.indexOf('.') > -1) {
    //Repeating decimal part
    for (let i = leng; i > 0; i--) {
      //If newstr ends with 0
      // @ts-ignore
      if (newstr.lastIndexOf('0') > -1 && newstr.substr(newstr.length - 1, 1) === 0) {
        let k = newstr.lastIndexOf('0');
        //If there is only one 0 after the decimal point, remove the decimal point
        if (newstr.charAt(k - 1) === '.') {
          return newstr.substring(0, k - 1);
        } else {
          //Otherwise remove a 0
          newstr = newstr.substring(0, k);
        }
      } else {
        //If there is no 0 at the end
        return newstr;
      }
    }
  }
  return num;
}
export const toDisplayVal = (numStr: string, decimal: number | string = 18, formatDecimal = 4, format?: number) => {
  if (Number(numStr) === 0) return 0
  if (Number(decimal) > 6) formatDecimal = 6
  if (!numStr || isNaN(Number(numStr))) return '~'
  const bn = new BigNumber(numStr)
  const divided = new BigNumber(`1${'0'.repeat(Number(decimal))}`)
  return bn.div(divided).toFormat(format)
}
export function keepPoint (num: string | number, point:number = 4,isRemoveZero:boolean = true, isRound:boolean = false) {
  if (num === '--' || num === '') return '--'
  let formatNum
  if (isRound) {
    formatNum = new BigNumber(num.toString()).toFixed(point, 1).toString();
  } else {
    formatNum = new BigNumber(num.toString()).toFixed(point + 1, 1).toString().slice(0, -1);
  }
  return isRemoveZero ? handleCutZero(formatNum).toString() : formatNum
}
export function isZeroAddress(address:string) {
  return (address && address === '0x0000000000000000000000000000000000000000') || !address;

}
export const toLocaleLowerCase = (val: string = '') =>
  val.toLocaleLowerCase()

 export const randomName = () => {
  const names = [
    'Ross', 'Julie', 'Gloria', 'Carol', 'Malcolm', 'Joan', 'Niki', 'Betty', 'Linda','Whitney', 'Lily', 'Fred', 'Gary', 'William', 'Charles', 'Michael', 'Karl', 'Barbara', 'Elizabeth', 'Helen', 'Katharine', 'Lee', 'Ann', 'Diana', 'Fiona', 'Bob', 'John', 'Thomas', 'Dean', 'Paul', 'Jack', 'Brooke', 'Judy', 'Doris', 'Ruby', 'Amanda', 'Shirley', 'Joan', 'Tracy', 'Kevin', 'Louis', 'John', 'George', 'Henry', 'Benjamin', 'Melody', 'Helen', 'Debbie', 'Lisa', 'Yvonne', 'Robert', 'Carl', 'Scott', 'Tom', 'Eddy', 'Kris', 'Peter', 'Shelly', 'Mary', 'Dolly', 'Nancy', 'Jane', 'Johnson', 'Bruce', 'Robert', 'Peter', 'Bill', 'Joseph', 'John', 'Shirley', 'Emily', 'Sophia', 'Vivian', 'Lillian','Joy', 'Burt', 'Charlie', 'Elliot', 'George', 'Johnson', 'Ross', 'Julie', 'Gloria', 'Carol', 'Richard', 'James', 'Charles', 'Bruce', 'David', 'Taylor', 'Wendy', 'Grace', 'Caroline', 'Samantha', 'Walt', 'Mark', 'Sam', 'Nick', 'Davis', 'Neil', 'Carl', 'Lewis', 'Billy', 'Ava', 'Christina', 'Judy', 'Susan', 'Grace', 'Alice', 'Paul', 'Francis', 'Lewis', 'Stephen', 'Andy', 'Scott', 'Joyce', 'Sally', 'Margaret', 'Rebecca', 'Teresa', 'Rita', 'Jessica', 'Albert', 'Jackson', 'Jack', 'Jimmy', 'Allen', 'Martin', 'Vincent', 'Elizabeth', 'Kelly', 'Fiona', 'Amanda'
  ]
  const index = Math.floor(Math.random() * names.length + 1)-1; 
  return names[index]
 }

 
 //Get address bar parameters, key: parameter name
export const getUrlParams = (key: any) => {
	let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
	let r = window.location.search.substring(1)
		.match(reg);
	if (r != null)
		return decodeURI(r[2]);
	return null;
}

 export const getPathKey = () => {
  const pathName = window.location.pathname
  const arrs = pathName.split('/')
  const lastStr = arrs[arrs.length - 1]
  const paramsArrs = lastStr.split('?')
  return paramsArrs[0]
 }

 export const getWebsiteUrl = () => {
  return window.location.origin || (
    window.location.protocol + '//' + window.location.host
  )
 }

 export const getLang = (key: string) => {
  if (key === 'cn') {
    return '中文'
  } else if (key === 'ko') {
    return '한국어'
  } else {
    return 'ENGLISH'
  }
 }

export const validateEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!email) {
    return true;
  } else if (regex.test(email)) {
    return true;
  }
  return false;
}
   
export const useRouteName = (Routers: any) => {
  const paths = Routers.map((item: any) => {
    return item.path
  })
  const pathName = window.location.pathname;
  if (!paths.includes(pathName)) {
    // page404
    return 'notFound'
  } else {
    return Routers.filter((item: any) => item.path === pathName)[0].name
  }
}