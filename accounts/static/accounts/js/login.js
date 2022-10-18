const tabs = document.querySelectorAll('.tab');

tabs.forEach(clickedTab =>{
	clickedTab.addEventListener('click', () =>{
		tabs.forEach(tab => {
			tab.classList.remove('active');
		});
		clickedTab.classList.add('active');
        var type = clickedTab.dataset.type;
        if (type=='user'){
            clickedTab.classList.add('active');
        }
	});
});

alert('s')