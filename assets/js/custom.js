(function() {   
    document.body.addEventListener('click', clickListener)
    
    function clickListener (event) {
        // Save when note is collapsed.
        if (event.target && event.target.className.indexOf('note-expand-checkbox') > -1 && !event.target.checked) {
            const saveBtn = document.querySelector('.mv-save')
            saveBtn.click()
        }
    }
})();