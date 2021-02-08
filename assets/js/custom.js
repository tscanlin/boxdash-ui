(function() {   
    document.body.addEventListener('click', clickListener)
    
    // console.log(saveBtn)
    function clickListener (event) {
        console.log(event.target)
        if (event.target && event.target.className.indexOf('note-expand-checkbox') > -1 && !event.target.checked) {
            console.log('this!')
            const saveBtn = document.querySelector('.mv-save')
            saveBtn.click()
        }
    }
})()