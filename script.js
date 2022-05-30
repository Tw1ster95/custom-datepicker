const datepickers = document.querySelectorAll('datepicker');
const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const weekdays = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun'
];

if(datepickers.length) {
    datepickers.forEach(datepicker => {
        const pickerContainer = document.createElement('pickercontainer');
        const yearPicker = document.createElement('yearpicker');
        const monthPicker = document.createElement('monthpicker');
        const dayPicker = document.createElement('daypicker');

        const yearPrev = document.createElement('div');
        yearPrev.setAttribute('data-prev', '');
        yearPrev.innerHTML = '<';
        const yearCurrent = document.createElement('div');
        yearCurrent.setAttribute('data-current', '');
        yearCurrent.innerHTML = '2022';
        const yearNext = document.createElement('div');
        yearNext.setAttribute('data-next', '');
        yearNext.innerHTML = '>';
        yearPicker.append(yearPrev);
        yearPicker.append(yearCurrent);
        yearPicker.append(yearNext);

        const monthPrev = document.createElement('div');
        monthPrev.setAttribute('data-prev', '');
        monthPrev.innerHTML = '<';
        const monthCurrent = document.createElement('div');
        monthCurrent.setAttribute('data-current', '');
        monthCurrent.innerHTML = months[0];
        const monthNext = document.createElement('div');
        monthNext.setAttribute('data-next', '');
        monthNext.innerHTML = '>';
        monthPicker.append(monthPrev);
        monthPicker.append(monthCurrent);
        monthPicker.append(monthNext);
        
        for(let i = 0; i < 7; i++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('grid-header');
            dayCell.innerHTML = weekdays[i];
            dayPicker.append(dayCell);
        }

        for(let i = 7; i < 49; i++) {
            const dayCell = document.createElement('div');
            dayCell.setAttribute('data-day', '');
            dayPicker.append(dayCell);
        }

        pickerContainer.append(yearPicker);
        pickerContainer.append(monthPicker);
        pickerContainer.append(dayPicker);
        datepicker.append(pickerContainer);

        const openDatepicker = (e) => {
            if(e.target == datepicker)
                datepicker.classList.toggle('open');
        }
    
        const switchPrevYear = () => {
            const year = parseInt(yearCurrent.innerHTML) - 1;
            if(year < 1901) year = 1901;
            yearCurrent.innerHTML = year;
            updateDaysTable();
        }
        const switchNextYear = () => {
            yearCurrent.innerHTML = parseInt(yearCurrent.innerHTML) + 1;
            updateDaysTable();
        }
    
        const switchPrevMonth = () => {
            let month = months.findIndex(m => m == monthCurrent.innerHTML) - 1;
            if(month < 0) {
                month = months.length - 1;
                switchPrevYear();
            }
            monthCurrent.innerHTML = months[month];
            updateDaysTable();
        }
        const switchNextMonth = () => {
            let month = months.findIndex(m => m == monthCurrent.innerHTML) + 1;
            if(month >= months.length) {
                month = 0;
                switchNextYear();
            }
            monthCurrent.innerHTML = months[month];
            updateDaysTable();
        }

        const getFirstDayOfMonth = (year, month) => {
            const date = new Date(year, month, 1);
            return date.getDay();
        }
        const getDaysInMonth = (year, month) => {
            const date = new Date(year, month, 0);
            return date.getDate();
        }

        const updateDaysTable = () => {
            const yearNum = parseInt(yearCurrent.innerHTML);
            const monthNum = parseInt(months.findIndex(m => m == monthCurrent.innerHTML));
            const firstDay = getFirstDayOfMonth(yearNum, monthNum);
            const maxDays = getDaysInMonth(yearNum, monthNum);
            let day_num = 1;
            for(let i = 7; i < dayPicker.childElementCount; i++) {
                if((i < 14 && i < firstDay+6) || day_num > maxDays) {
                    dayPicker.childNodes[i].innerHTML = '';
                    continue;
                }
                dayPicker.childNodes[i].innerHTML = day_num;
                day_num++
            }
        }

        const pickDay = (e) => {
            if(!e.target.hasAttribute('data-day'))  return;
            if(e.target.innerHTML == '')  return;
            let format = datepicker.getAttribute('format');
            const yearNum = parseInt(yearCurrent.innerHTML);
            const monthNum = parseInt(months.findIndex(m => m == monthCurrent.innerHTML));
            format = format.replace('yyyy', yearNum);
            format = format.replace('mm', monthNum+1);
            format = format.replace('dd', e.target.innerHTML);
            
            const hiddenInput = datepicker.querySelector('input[type="text"]');
            console.log(format);
            hiddenInput.value = format;
        }
        
        updateDaysTable();
        yearPrev.addEventListener('click', switchPrevYear);
        yearNext.addEventListener('click', switchNextYear);
        monthPrev.addEventListener('click', switchPrevMonth);
        monthNext.addEventListener('click', switchNextMonth);
        dayPicker.addEventListener('click', pickDay);
        datepicker.addEventListener('click', openDatepicker);
    });
}