// https://www.nbrb.by/api/exrates/rates?ondate=2016-7-6&periodicity=0
let url = 'https://www.nbrb.by/api/exrates/rates/431?parammode=0&ondate='


function dateArrFoo(start, end) {
    let dateArr = []
    if (start > end) {
        alert('Начальная дата больше конечной!')
        return
    }
    let a = start
    let b = end
    let yearStart = a.slice(0, 4)
    let monthStart = a.slice(6, 7)
    let dayStart = a.slice(8, 11)
    let valueStart = `${yearStart}-${monthStart}-${dayStart}`
    let yearEnd = b.slice(0, 4)
    let monthEnd = b.slice(6, 7)
    let dayEnd = b.slice(8, 11)
    let valueEnd = `${yearEnd}-${monthEnd}-${dayEnd}`
    let date = new Date(valueStart);
    let endDate = new Date(valueEnd)

    for (let i = 1; date <= endDate; i) {
        date.setDate(date.getDate() + i)
        let newDate = JSON.stringify(date)
        dateArr.push(newDate)
    }
    return dateArr
}


let btn = document.querySelector('.button-sub')
let starData = document.querySelector('.data-start')
let endData = document.querySelector('.data-end')
let minCurse = document.querySelector('.min')
let maxCurse = document.querySelector('.max')

function getCurse() {


    let curseArr = Promise.all(
        dateArrFoo(starData.value, endData.value).map((date) => fetch(`https://www.nbrb.by/api/exrates/rates/431?parammode=0&ondate=${date.slice(1, 11)}`).then(res => res.json()))
    )
        .then(res => {

            res.sort((a, b) => a.Cur_OfficialRate - b.Cur_OfficialRate)
            console.log(res[0],res.at(-1))
            // console.log(res)
            minCurse.innerText = `Минимальный курс был ${res[0].Date.slice(0, 10)} и равен:${res[0].Cur_OfficialRate}`
            //
            maxCurse.innerText = `Max курс ${res.at(-1).Date.slice(0, 10)} и равен:${res.at(-1).Cur_OfficialRate}`

        })
}
btn.addEventListener('click', (el) => {
    getCurse()
    el.preventDefault()
})



